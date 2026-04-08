# Sigmafy Leads Ingestion — Spec for sixsigmasouthafrica.co.za

This is the contract between the Six Sigma South Africa marketing site's
`/api/contact` route and Sigmafy's leads ingestion endpoint. Build the
endpoint on the Sigmafy side to match this spec and the moment you drop the
base URL + API key into Vercel env vars, leads will start flowing
automatically — no marketing-site redeploy required.

The marketing site already has a stub call wired up (`sendToSigmafy` in
`src/app/api/contact/route.ts`). It's gated on two environment variables:

```
SIGMAFY_API_URL=https://app.sigmafy.com/api/v1/leads
SIGMAFY_API_KEY=<long-lived bearer token>
```

If either is blank, the call is silently skipped. If both are set and the
endpoint returns anything other than a 2xx, the error is logged but the
user still sees the success state (Brevo is the critical path).

---

## Endpoint

```
POST https://app.sigmafy.com/api/v1/leads
```

(Replace with whatever base URL you pick. Version the path so you can
evolve the schema later without breaking the marketing site.)

## Auth

```
Authorization: Bearer <SIGMAFY_API_KEY>
Content-Type: application/json
```

Long-lived bearer token, stored in Vercel env vars. Rotate by issuing a
new token in Sigmafy and updating the env var — no code deploy needed.

## Request body

```json
{
  "source": "sixsigmasouthafrica.co.za",
  "sourcePage": "/courses/in/johannesburg",
  "name": "Darren Smith",
  "email": "darren@example.com",
  "phone": "021 426 5300",
  "company": "Example Corp",
  "subject": "course-enquiry",
  "message": "I'd like to book 3 delegates on Green Belt in Joburg.",
  "utm": {
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "green-belt-za"
  },
  "userAgent": "Mozilla/5.0 ...",
  "receivedAt": "2026-04-08T14:23:00.000Z"
}
```

### Field reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `source` | string | yes | Always `"sixsigmasouthafrica.co.za"` for this integration. Use this as the Sigmafy `lead_source` so you can segment later if you add more public sites. |
| `sourcePage` | string | no | Path + query of the page where the form was submitted, e.g. `/courses/dmaic-black-belt-classroom?utm_source=google`. Use this to attribute which page drove the lead. |
| `name` | string | yes | Full name as typed. Not split on the marketing side. |
| `email` | string | yes | Already validated to match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` server-side. Deduplicate on this. |
| `phone` | string | no | Free-form as typed. Not normalised. |
| `company` | string | no | Free-form. |
| `subject` | enum | yes | One of: `course-enquiry`, `corporate-training`, `consultancy`, `partnership`, `general`. |
| `message` | string | yes | Multiline free text. Preserve newlines. |
| `utm` | object | no | Only present when the user landed with `utm_*` query params. Keys: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`. |
| `userAgent` | string | no | Browser UA string. Useful for spam filtering. |
| `receivedAt` | ISO 8601 | yes | Generated server-side on the marketing site. |

## Dedupe rule

**Upsert on email.** If a contact with the same email already exists:

1. Update the existing row with the new `sourcePage`, `subject`, `message`, `utm` and `receivedAt`.
2. Append the new message + timestamp to a `history` log on the lead (if Sigmafy has one).
3. Bump `updated_at`.

Never create a duplicate contact for the same email. The marketing site
will happily submit the same email multiple times and rely on Sigmafy to
merge.

## Response

### 200 / 201

```json
{
  "id": "lead_abc123",
  "created": false,
  "contactId": "contact_xyz789"
}
```

`created: true` → new contact was created.
`created: false` → existing contact was updated.

### 400 — validation failure

```json
{ "error": "Invalid email" }
```

The marketing site logs 400s but does not surface them to the end user
(the request already passed marketing-site validation — a 400 from
Sigmafy is a schema drift and should never happen in practice).

### 401 — bad bearer token

```json
{ "error": "Unauthorized" }
```

### 429 — rate limited

If you rate-limit, return `429` with a `Retry-After` header. The marketing
site will log and skip — no retries. Expected volume is low (< 100/day).

### 500 — server error

```json
{ "error": "Internal server error" }
```

Logged, skipped. User still sees success (Brevo handles notification).

## Suggested database schema (Postgres)

```sql
CREATE TABLE leads (
  id              bigserial PRIMARY KEY,
  source          text NOT NULL,
  source_page     text,
  name            text NOT NULL,
  email           citext NOT NULL UNIQUE,
  phone           text,
  company         text,
  subject         text NOT NULL,
  message         text NOT NULL,
  utm             jsonb,
  user_agent      text,
  received_at     timestamptz NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX leads_source_idx    ON leads (source);
CREATE INDEX leads_received_idx  ON leads (received_at DESC);
CREATE INDEX leads_utm_source_idx ON leads ((utm->>'utm_source'));
```

Use `citext` for the email to make the dedupe case-insensitive.

## Once you ship it

1. Drop the base URL and API key into the marketing site's Vercel env
   vars:
   ```
   SIGMAFY_API_URL=https://app.sigmafy.com/api/v1/leads
   SIGMAFY_API_KEY=<token>
   ```
2. Redeploy (or just bump an env var — Vercel redeploys automatically).
3. Submit a test enquiry through the contact form.
4. Check Sigmafy → Leads. The contact should be there with
   `source = "sixsigmasouthafrica.co.za"`.
5. Submit again with the same email. Verify the row was **updated**, not
   duplicated.

That's it. No code changes needed on the marketing site side.
