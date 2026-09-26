import { courseLabel, deliveryLabel, enquiryTypeLabel } from "@/lib/email-templates";

/**
 * The Sigmafy portal's email agent, fed from this site's contact form.
 *
 * Each enquiry is posted to the portal's inbound webhook, where the agent
 * drafts a reply for a person to check. It goes as "web:sssa", which tells the
 * portal three things: file it under Six Sigma South Africa, sign any reply as
 * this brand, and send no acknowledgement of its own — this site already
 * confirmed the enquiry, and a second "we have your enquiry" a minute later
 * reads as two systems that do not know about each other.
 *
 * Shadow first. The team still answers enquiries from contact@2ko.co.za, and
 * the portal will not send a reply to a form enquiry until somebody switches
 * that on there. So nothing an enquirer sees changes: the team gets a drafted
 * head start, and the agent gets real enquiries to be judged on.
 */

const DEFAULT_ENDPOINT = "https://portal.sigmafy.co/api/v1/inbound-email";
const SOURCE = "web:sssa";
const SITE_HOST = "sixsigmasouthafrica.co.za";
/** The brand address the enquiry is filed as sent to, and any reply comes from. */
const TO_ADDRESS = "sales@sixsigmasouthafrica.co.za";

export interface AgentEnquiry {
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
}

/** "corporate training enquiry" → "Corporate training enquiry". */
function sentenceCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** One message, in the shape the portal's webhook takes. */
export function buildAgentPayload(
  p: AgentEnquiry,
  opts: { enquiryId?: string; receivedAt?: Date } = {},
) {
  const belt = p.courseTopic ? courseLabel(p.courseTopic) : undefined;

  // What they picked on the form, as the lines a person would write. These go
  // in the body as well as under `form`, because the body is what the reviewer
  // reads and what the drafter answers — and the drafter is told to treat
  // anything picked on the form as already given, so it never asks for the
  // delegate count somebody typed in.
  const rows: Array<[string, string | undefined]> = [
    ["Course", belt],
    ["Delivery", p.courseMode ? deliveryLabel(p.courseMode) : undefined],
    ["Delegates", p.delegates],
    ["City", p.preferredCity],
    ["Company", p.company],
    ["Phone", p.phone],
    ["Industry", p.industry],
  ];
  const details = rows.flatMap(([label, value]) =>
    value?.trim() ? [`${label}: ${value.trim()}`] : [],
  );

  return {
    source: SOURCE,
    // The ledger's id when there is one, so the draft and the enquiry record
    // can be matched later. The portal takes any one message id once.
    message_id: `<enquiry-${opts.enquiryId ?? crypto.randomUUID()}@${SITE_HOST}>`,
    from: { address: p.email, name: p.name },
    to: { address: TO_ADDRESS },
    // The form's subject is a slug; a reply to "course-enquiry" would look it.
    subject: sentenceCase(enquiryTypeLabel(p.subject)) + (belt ? `: ${belt}` : ""),
    text: details.length
      ? `${p.message}\n\nFrom the website form\n${details.join("\n")}`
      : p.message,
    received_at: (opts.receivedAt ?? new Date()).toISOString(),
    form: {
      kind: p.courseTopic ? "course" : "contact",
      subject: p.subject,
      courseTopic: p.courseTopic,
      courseMode: p.courseMode,
      delegates: p.delegates,
      preferredCity: p.preferredCity,
      company: p.company,
      phone: p.phone,
      industry: p.industry,
      sourcePage: p.sourcePage,
      enquiryId: opts.enquiryId,
    },
  };
}

/**
 * Post one enquiry to the agent.
 *
 * Never throws. By the time this runs the enquiry is recorded and the team has
 * been emailed, so a portal that is down costs a draft, not a lead — and it
 * must not come back to the form as an error the enquirer retries.
 *
 * Unconfigured means skipped with a warning, unlike the enquiry record, which
 * throws: losing the record loses the lead, and losing this loses a draft.
 */
export async function sendToEmailAgent(p: AgentEnquiry, enquiryId?: string): Promise<void> {
  const token = process.env.PORTAL_INBOUND_TOKEN;
  if (!token) {
    console.warn("[contact] email agent feed skipped: PORTAL_INBOUND_TOKEN is not set");
    return;
  }

  try {
    const res = await fetch(process.env.PORTAL_INBOUND_URL || DEFAULT_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(buildAgentPayload(p, { enquiryId })),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[contact] email agent feed failed ${res.status}: ${text.slice(0, 200)}`);
    }
  } catch (error) {
    console.error("[contact] email agent feed failed:", error);
  }
}
