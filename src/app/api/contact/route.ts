import { NextRequest, NextResponse } from "next/server";
import {
  buildConfirmationEmail,
  buildNotificationEmail,
} from "@/lib/email-templates";
import { classifyAsJobApplication } from "@/lib/job-filter";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Contact form sink.
 *
 * Accepts a POST from the ContactForm component, validates the payload,
 * and fans it out to:
 *   1. Cloudflare Email → internal notification to contact@2ko.co.za
 *   2. Cloudflare Email → confirmation back to the enquirer
 *   3. D1 `contacts` → upsert the person's record
 *   4. The estate enquiries database, via the ingest endpoint on 2ko.co.za
 *
 * Each outbound call runs in parallel via Promise.allSettled so a single
 * failure doesn't block the others. The user only sees an error if the
 * internal notification (the most important one) fails.
 */

export const runtime = "nodejs";


interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  courseTopic?: string;
  courseMode?: string;
  delegates?: string;
  preferredCity?: string;
  industry?: string;
  sourcePage?: string;
  utm?: Record<string, string>;
  userAgent?: string;
  /** Honeypot — if non-empty, the submission is treated as spam. */
  website?: string;
}

function validate(body: unknown): ContactPayload | { error: string } {
  if (!body || typeof body !== "object") return { error: "Invalid payload" };
  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  const company = typeof b.company === "string" ? b.company.trim() : "";
  const subject = typeof b.subject === "string" ? b.subject.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const sourcePage = typeof b.sourcePage === "string" ? b.sourcePage : undefined;
  const courseTopic = typeof b.courseTopic === "string" ? b.courseTopic.trim() : undefined;
  const courseMode = typeof b.courseMode === "string" ? b.courseMode.trim() : undefined;
  const delegates = typeof b.delegates === "string" ? b.delegates.trim() : undefined;
  const preferredCity = typeof b.preferredCity === "string" ? b.preferredCity.trim() : undefined;
  const industry = typeof b.industry === "string" ? b.industry.trim() : undefined;
  const utm =
    b.utm && typeof b.utm === "object"
      ? (b.utm as Record<string, string>)
      : undefined;
  const userAgent =
    typeof b.userAgent === "string" ? b.userAgent : undefined;
  const website = typeof b.website === "string" ? b.website : undefined;

  if (!name) return { error: "Name is required" };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { error: "Valid email is required" };
  if (!subject) return { error: "Subject is required" };
  if (!message) return { error: "Message is required" };

  return { name, email, phone, company, subject, message, courseTopic, courseMode, delegates, preferredCity, industry, sourcePage, utm, userAgent, website };
}

/**
 * Cloudflare Email Service, replacing Brevo.
 *
 * The binding is the credential — there is no API key to go missing, which is
 * the failure that took sixsigmauk.com's form down for fourteen weeks. It only
 * exists at request time on the Worker, so it is fetched per call rather than
 * held in module scope, which is shared across requests.
 *
 * `from` must be on a domain onboarded for Email Sending;
 * sixsigmasouthafrica.co.za was onboarded 2026-09-19.
 */
/** Only the part of D1 this route uses; the project has no generated Worker types. */
type D1Binding = {
  prepare: (sql: string) => {
    bind: (...values: unknown[]) => { run: () => Promise<unknown> };
  };
};

type EmailBinding = {
  send: (m: {
    to: string | string[];
    from: { email: string; name?: string };
    replyTo?: string;
    subject: string;
    html: string;
    text: string;
  }) => Promise<unknown>;
};

function emailBinding(): EmailBinding {
  const env = getCloudflareContext().env as unknown as { EMAIL?: EmailBinding };
  if (!env.EMAIL) throw new Error("EMAIL binding is not configured on this Worker");
  return env.EMAIL;
}

const SENDER_EMAIL = "sales@sixsigmasouthafrica.co.za";
const SENDER_NAME = "Six Sigma South Africa";
const NOTIFY_TO = "contact@2ko.co.za";

/** A plain-text fallback, because HTML-only mail scores worse and some clients show nothing else. */
function textFromHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}


async function sendNotificationEmail(payload: ContactPayload) {
  const { subject, html } = buildNotificationEmail(payload);
  return emailBinding().send({
    to: NOTIFY_TO,
    from: { email: SENDER_EMAIL, name: SENDER_NAME },
    // Replying to the notification reaches the enquirer directly, which is how
    // the team has always used it.
    replyTo: payload.email,
    subject,
    html,
    text: textFromHtml(html),
  });
}

async function sendConfirmationEmail(payload: ContactPayload) {
  const { subject, html } = buildConfirmationEmail({
    name: payload.name,
    subject: payload.subject,
  });
  return emailBinding().send({
    to: payload.email,
    from: { email: SENDER_EMAIL, name: SENDER_NAME },
    subject,
    html,
    text: textFromHtml(html),
  });
}

/**
 * Upsert the person into the estate's own contacts table.
 *
 * Replaces the Brevo contact upsert. Cloudflare Email Sending has no contact
 * store, so this either disappeared or moved somewhere we control; it moved.
 * One row per person per site — the same address enquiring on two brands is
 * two relationships, not one.
 *
 * Worth recording: BREVO_LIST_ID was empty in production, so every contact
 * Brevo held from this form was created outside any list. Nothing was
 * segmenting them; nothing is lost by the move.
 */
async function upsertContact(payload: ContactPayload) {
  const env = getCloudflareContext().env as unknown as { DB?: D1Binding };
  const db = env.DB;
  if (!db) throw new Error("D1 binding DB is not configured on this Worker");

  const now = new Date().toISOString();
  const parts = payload.name.trim().split(/\s+/);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ");

  // INSERT ... ON CONFLICT keeps first_seen from the original row and bumps the
  // counter, so a returning enquirer reads as one person who asked twice
  // rather than two people.
  await db
    .prepare(
      `INSERT INTO contacts (
         id, email, site, first_name, last_name, phone, company, industry,
         last_subject, last_source_page, last_course_topic, last_course_mode,
         last_delegates, last_preferred_city, enquiry_count, first_seen, last_seen
       ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,?,?)
       ON CONFLICT(email, site) DO UPDATE SET
         first_name          = COALESCE(NULLIF(excluded.first_name, ''), contacts.first_name),
         last_name           = COALESCE(NULLIF(excluded.last_name, ''), contacts.last_name),
         phone               = COALESCE(excluded.phone, contacts.phone),
         company             = COALESCE(excluded.company, contacts.company),
         industry            = COALESCE(excluded.industry, contacts.industry),
         last_subject        = excluded.last_subject,
         last_source_page    = excluded.last_source_page,
         last_course_topic   = COALESCE(excluded.last_course_topic, contacts.last_course_topic),
         last_course_mode    = COALESCE(excluded.last_course_mode, contacts.last_course_mode),
         last_delegates      = COALESCE(excluded.last_delegates, contacts.last_delegates),
         last_preferred_city = COALESCE(excluded.last_preferred_city, contacts.last_preferred_city),
         enquiry_count       = contacts.enquiry_count + 1,
         last_seen           = excluded.last_seen`,
    )
    .bind(
      crypto.randomUUID(),
      payload.email,
      "sixsigmasouthafrica.co.za",
      firstName,
      lastName,
      payload.phone ?? null,
      payload.company ?? null,
      payload.industry ?? null,
      payload.subject,
      payload.sourcePage ?? null,
      payload.courseTopic ?? null,
      payload.courseMode ?? null,
      payload.delegates ?? null,
      payload.preferredCity ?? null,
      now,
      now,
    )
    .run();

  return { ok: true };
}

/**
 * Record the enquiry in the estate's own database, via the ingest endpoint on
 * 2ko.co.za.
 *
 * This replaces a call to a Sigmafy endpoint that never ran here. It read
 * SIGMAFY_API_URL and SIGMAFY_API_KEY; this Worker has neither, so it took the
 * `if (!url || !key) return { skipped: true }` branch on every submission,
 * resolved successfully, and the route answered `delivered: { sigmafy: true }`.
 * Every enquiry this site has taken since then exists only as email.
 *
 * So this one throws when it is not configured. A missing secret is a broken
 * deployment and should look like one.
 */
async function recordEnquiry(payload: ContactPayload) {
  const url = process.env.ENQUIRY_INGEST_URL;
  const token = process.env.ENQUIRY_INGEST_TOKEN;
  if (!url || !token) {
    throw new Error(
      "Enquiry ingest is not configured (ENQUIRY_INGEST_URL / ENQUIRY_INGEST_TOKEN missing)",
    );
  }

  // The form collects UTMs under their full query-string names; the ingest
  // schema wants them bare.
  const utm = Object.fromEntries(
    Object.entries(payload.utm ?? {}).map(([k, v]) => [k.replace(/^utm_/, ""), v]),
  );

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      site: "sixsigmasouthafrica.co.za",
      // A course enquiry is the thing this site mostly takes, and it is worth
      // separating from a general one in the dashboard.
      kind: payload.courseTopic ? "course" : "contact",
      sourcePage: payload.sourcePage,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      company: payload.company,
      subject: payload.subject,
      message: payload.message,
      courseTopic: payload.courseTopic,
      courseMode: payload.courseMode,
      delegates: payload.delegates,
      preferredCity: payload.preferredCity,
      industry: payload.industry,
      utm: Object.keys(utm).length ? utm : undefined,
      userAgent: payload.userAgent,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Enquiry ingest failed ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json().catch(() => ({}));
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validated = validate(body);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  // Attach the User-Agent header automatically (useful for spam filtering).
  validated.userAgent = req.headers.get("user-agent") ?? undefined;

  // ─── Honeypot gate ──────────────────────────────────────────────────
  // The ContactForm renders a visually-hidden <input name="website"> that
  // humans leave empty. Bots that auto-fill every field will populate it;
  // when they do, we silently return 200 OK without sending anything.
  if (validated.website && validated.website.trim().length > 0) {
    console.warn(
      `[contact] honeypot triggered — silent drop (email=${validated.email}, value="${validated.website}")`
    );
    return NextResponse.json({ ok: true, delivered: {} });
  }

  // ─── Job-application gate ───────────────────────────────────────────
  // Hybrid filter: regex pre-screen → OpenAI adjudication. If the filter
  // flags the submission we silently drop it (the user sees the normal
  // "Thank you" screen; no email, no CRM upsert, no Sigmafy push). The
  // filter fails open on any error so real enquiries are never lost.
  const jobCheck = await classifyAsJobApplication({
    subject: validated.subject,
    message: validated.message,
    company: validated.company,
    name: validated.name,
    email: validated.email,
  });
  if (jobCheck.isJob) {
    const snippet = validated.message.replace(/\s+/g, " ").slice(0, 80);
    console.warn(
      `[contact] job application filtered — silent drop (email=${validated.email}, stage=${jobCheck.stage}, reason=${jobCheck.reason}, message="${snippet}")`
    );
    return NextResponse.json({ ok: true, delivered: {} });
  }

  // Fan out. Notification is the critical path — if it throws we return 500.
  // Confirmation, contact upsert and the enquiry record are best-effort, and
  // every one of them is logged when it fails. The record throws rather than
  // skipping when unconfigured, so a missing secret shows up here instead of
  // reporting success and losing the lead.
  const results = await Promise.allSettled([
    sendNotificationEmail(validated), // 0 — critical
    sendConfirmationEmail(validated), // 1
    upsertContact(validated),         // 2
    recordEnquiry(validated),         // 3
  ]);

  const labels = ["notification", "confirmation", "contact-upsert", "enquiry-record"];
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      // eslint-disable-next-line no-console
      console.error(`[contact] ${labels[i]} failed:`, r.reason);
    }
  });

  if (results[0].status === "rejected") {
    return NextResponse.json(
      { error: "Failed to deliver enquiry. Please try again or email info@2ko.co.za directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    delivered: {
      notification: results[0].status === "fulfilled",
      confirmation: results[1].status === "fulfilled",
      contact: results[2].status === "fulfilled",
      recorded: results[3].status === "fulfilled",
    },
  });
}
