/**
 * Job-application filter for the /api/contact route.
 *
 * Three-tier pipeline:
 *
 *   1. STRONG keyword match (e.g. "CV attached", "apply for a position",
 *      "seeking employment") → block immediately, no AI call. These
 *      phrases are unambiguous job-seeker language; spending an OpenAI
 *      round-trip on them is pure waste.
 *   2. WEAK keyword match (e.g. "CV" standalone, "years of experience
 *      in X", "looking for opportunities") → escalate to OpenAI
 *      gpt-4o-mini for JOB vs ENQUIRY adjudication, because the same
 *      words can appear in legitimate training/consultancy enquiries
 *      ("we want Six Sigma for our graduate programme").
 *   3. No keyword match → pass through as legitimate.
 *
 * Failure behaviour:
 *   - STRONG match + AI errors → BLOCK (fail closed). The keyword alone
 *     is already high-confidence.
 *   - WEAK match + AI errors → PASS (fail open). Better to let a rare
 *     job application through than drop a real lead over an infra hiccup.
 *
 * A block returns `{ isJob: true, reason }` and the caller silently
 * drops the submission (200 OK to the user, no email, no CRM upsert).
 */

const STRONG_JOB_KEYWORDS: RegExp[] = [
  // Direct application language
  /\bapply(ing)?\s+for\s+(a\s+)?(job|position|role|vacancy|post)\b/i,
  /\b(job|employment|work|position)\s+application\b/i,
  /\bi\s+(am|'m)\s+(writing|applying|interested)\s+(to|in)\s+apply\b/i,
  /\bi\s+would\s+like\s+to\s+apply\b/i,
  /\bplease\s+(find|see)\s+(attached|my)\s+(cv|resume)\b/i,
  /\bkindly\s+consider\s+my\b/i,

  // CV attachment / send language (explicit signal they're sending a CV)
  /\b(attached|attaching|enclosed|enclosing)\s+(is\s+)?(my\s+)?(cv|resume|application)\b/i,
  /\bsend(ing)?\s+(you\s+)?my\s+(cv|resume)\b/i,
  /\bmy\s+(cv|resume|curriculum\s+vitae)\s+(is\s+)?(attached|enclosed)\b/i,
  /\bherewith\s+my\s+(cv|resume)\b/i,

  // Seeking employment — explicit
  /\bseeking\s+(employment|a\s+job|a\s+position|new\s+opportunities)\b/i,
  /\bsearching\s+for\s+(a\s+)?(job|employment|position)\b/i,
  /\bavailable\s+for\s+(employment|hire|a\s+position)\b/i,
  /\blooking\s+for\s+(a\s+)?(job|jobs|employment|permanent\s+(work|employment|position)|full[-\s]?time\s+(work|employment|position)|part[-\s]?time\s+(work|employment|position))\b/i,
  /\bin\s+need\s+of\s+(a\s+)?(job|employment|work)\b/i,
  /\b(i\s+am|i'm|am)\s+(currently\s+)?unemployed\b/i,
  /\bunemployed\s+(graduate|youth|and)\b/i,
  /\byouth\s+looking\s+for\s+(a\s+)?(job|work|employment|opportunity|opportunities)\b/i,

  // Vacancy / hiring inquiries
  /\bare\s+you\s+hiring\b/i,
  /\bhiring\s+(now|currently)\b/i,
  /\bany\s+(jobs|positions|vacancies|openings)\s+available\b/i,
  /\bjob\s+opening(s)?\b/i,
  /\bvacanc(y|ies)\s+(at|available|open)\b/i,

  // Internship / graduate / learner programs — directed at us
  /\b(internship|learnership|bursary)\s+(at|with|opportunity)\b/i,
  /\b(apply|applying)\s+for\s+(an?\s+)?(internship|learnership|bursary)\b/i,
  /\blooking\s+for\s+(an?\s+)?(internship|learnership|bursary)\b/i,
];

const WEAK_JOB_KEYWORDS: RegExp[] = [
  // CV / resume references (could be in an enquiry about CV-writing services, etc.)
  /\bcv\b/i,
  /\bresume\b/i,
  /\bcurriculum\s+vitae\b/i,

  // Could be seeking work OR seeking a training opportunity
  /\blooking\s+for\s+(a\s+)?(work|opportunity|opportunities)\b/i,
  /\binterested\s+in\s+(a\s+)?(job|position|role|vacancy)\b/i,
  /\bopen\s+to\s+(new\s+)?(opportunities|roles|positions)\b/i,

  // Bare mentions
  /\binternship\b/i,
  /\blearnership\b/i,
  /\bbursar(y|ies)\b/i,
  /\bgraduate\s+program(me)?\b/i,
  /\bentry\s+level\b/i,

  // Years of experience pitch (very common in cold applications, but
  // also in legit B2B "we have 20 years of experience in manufacturing"
  // style enquiries).
  /\b\d+\s*(\+)?\s*years?\s+(of\s+)?experience\s+(in|as|with)\b/i,
];

export interface JobFilterResult {
  isJob: boolean;
  /** Which stage made the decision — useful for logs / audit. */
  stage: "strong-keyword" | "weak-keyword+ai" | "weak-keyword+ai-error" | "no-match";
  /** Short human-readable explanation for the log line. */
  reason: string;
}

function matchKeyword(text: string, list: RegExp[]): string | null {
  for (const rx of list) {
    const m = text.match(rx);
    if (m) return m[0];
  }
  return null;
}

async function classifyWithOpenAI(
  subject: string,
  message: string,
  company: string | undefined
): Promise<"JOB" | "ENQUIRY" | "UNKNOWN"> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return "UNKNOWN";

  const userContent =
    `Subject: ${subject}\n` +
    `Company: ${company ?? "(none provided)"}\n` +
    `Message:\n${message}`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0,
        max_tokens: 4,
        messages: [
          {
            role: "system",
            content:
              "You are a classifier for a Six Sigma training company's contact form. " +
              "Decide whether the message below is a JOB APPLICATION (the sender is " +
              "seeking employment, submitting a CV/resume, asking about vacancies, " +
              "looking for internships/learnerships/bursaries at the company, or " +
              "pitching themselves for work) or a legitimate business ENQUIRY about " +
              "Six Sigma courses, corporate training, consultancy, partnerships, or " +
              "general information. " +
              "Reply with exactly one word: JOB or ENQUIRY. No punctuation. No explanation.",
          },
          { role: "user", content: userContent },
        ],
      }),
      // Timeout guard — don't let a slow model call hold up a real enquiry.
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return "UNKNOWN";
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const raw = data.choices?.[0]?.message?.content?.trim().toUpperCase() ?? "";
    if (raw.startsWith("JOB")) return "JOB";
    if (raw.startsWith("ENQUIRY")) return "ENQUIRY";
    return "UNKNOWN";
  } catch {
    return "UNKNOWN";
  }
}

/**
 * Classify a contact-form submission. Returns `isJob: true` if the message
 * is a job / employment application. Callers should silently drop those
 * submissions from the fan-out pipeline.
 *
 *   - Strong keyword hit → block immediately (AI is bypassed; on AI
 *     errors the strong keyword alone is enough to stay blocked).
 *   - Weak keyword hit → defer to OpenAI; if OpenAI errors we fail open
 *     to protect genuine leads from being dropped on infra issues.
 */
export async function classifyAsJobApplication(input: {
  subject: string;
  message: string;
  company?: string;
}): Promise<JobFilterResult> {
  const haystack = [input.subject, input.message, input.company ?? ""]
    .join(" \n ")
    .toLowerCase();

  const strongHit = matchKeyword(haystack, STRONG_JOB_KEYWORDS);
  if (strongHit) {
    return {
      isJob: true,
      stage: "strong-keyword",
      reason: `strong-keyword="${strongHit}"`,
    };
  }

  const weakHit = matchKeyword(haystack, WEAK_JOB_KEYWORDS);
  if (!weakHit) {
    return { isJob: false, stage: "no-match", reason: "no keyword match" };
  }

  const verdict = await classifyWithOpenAI(
    input.subject,
    input.message,
    input.company
  );

  if (verdict === "JOB") {
    return {
      isJob: true,
      stage: "weak-keyword+ai",
      reason: `weak-keyword="${weakHit}", ai=JOB`,
    };
  }

  if (verdict === "ENQUIRY") {
    return {
      isJob: false,
      stage: "weak-keyword+ai",
      reason: `weak-keyword="${weakHit}", ai=ENQUIRY (override)`,
    };
  }

  // OpenAI errored or no API key — fail open on weak-keyword only.
  return {
    isJob: false,
    stage: "weak-keyword+ai-error",
    reason: `weak-keyword="${weakHit}", ai=UNKNOWN (failed open)`,
  };
}
