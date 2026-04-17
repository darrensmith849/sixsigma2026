/**
 * Job-application filter for the /api/contact route.
 *
 * We don't want job applications landing in the sales inbox. The pipeline is:
 *
 *   1. Cheap regex pre-filter across subject + message + company. If no
 *      suspicious keywords match, we treat the enquiry as legitimate and
 *      skip straight through — no cost, no latency.
 *   2. If the pre-filter hits, we ask OpenAI (gpt-4o-mini) for a yes/no
 *      classification with the full context of the message. The model's
 *      decision is what we actually act on, so keyword mentions like
 *      "I need Six Sigma for my job" don't cause false positives.
 *   3. If OpenAI is unreachable or returns an unparseable response, we
 *      FAIL OPEN — the submission is treated as legitimate. We would
 *      rather let a rare job application through than drop a real lead.
 *
 * A match returns `{ isJob: true, reason }` and the caller is expected to
 * silently drop the submission (return 200 OK to the user, skip the email
 * fan-out, log the reason for audit).
 */

const JOB_KEYWORDS: RegExp[] = [
  // CV / resume references
  /\bcv\b/i,
  /\bresume\b/i,
  /\bcurriculum\s+vitae\b/i,
  /\bportfolio\b/i,

  // Direct application language
  /\bapply(ing)?\s+for\s+(a\s+)?(job|position|role|vacancy|post)\b/i,
  /\b(job|employment|work|position)\s+application\b/i,
  /\bi\s+(am|'m)\s+(writing|applying|interested)\s+(to|in)\s+apply\b/i,
  /\bi\s+would\s+like\s+to\s+apply\b/i,
  /\bplease\s+(find|see)\s+(attached|my)\s+(cv|resume)\b/i,
  /\bkindly\s+consider\s+my\b/i,

  // Seeking work
  /\blooking\s+for\s+(a\s+)?(job|work|employment|position|opportunity|opportunities)\b/i,
  /\bseeking\s+(employment|work|a\s+job|a\s+position|opportunities|new\s+opportunities)\b/i,
  /\bsearching\s+for\s+(a\s+)?(job|work|employment|position)\b/i,
  /\binterested\s+in\s+(a\s+)?(job|position|role|vacancy)\b/i,
  /\bavailable\s+for\s+(employment|work|hire|a\s+position)\b/i,
  /\bopen\s+to\s+(new\s+)?(opportunities|roles|positions)\b/i,

  // Vacancy / hiring inquiries
  /\bvacanc(y|ies)\b/i,
  /\bare\s+you\s+hiring\b/i,
  /\bhiring\s+(now|any|currently)\b/i,
  /\bany\s+(jobs|positions|vacancies|openings|roles)\s+available\b/i,
  /\bjob\s+opening(s)?\b/i,

  // Internship / graduate / learner programs
  /\binternship\b/i,
  /\blearnership\b/i,
  /\bbursar(y|ies)\b/i,
  /\bgraduate\s+program(me)?\b/i,
  /\bentry\s+level\b/i,
  /\binternee\b/i,
  /\bintern\s+at\b/i,

  // CV attachment / send language
  /\b(attached|attaching|enclosed|enclosing)\s+(is\s+)?(my\s+)?(cv|resume|application)\b/i,
  /\bsend(ing)?\s+(you\s+)?my\s+(cv|resume)\b/i,

  // Years of experience pitch (very common in cold applications)
  /\b\d+\s*(\+)?\s*years?\s+(of\s+)?experience\s+(in|as|with)\b/i,
];

export interface JobFilterResult {
  isJob: boolean;
  /** Which stage made the decision — useful for logs / audit. */
  stage: "keyword+ai" | "keyword-only" | "ai-error" | "no-match";
  /** Short human-readable explanation for the log line. */
  reason: string;
}

function matchesKeyword(text: string): string | null {
  for (const rx of JOB_KEYWORDS) {
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
 * is (almost certainly) a job / employment application. Callers should
 * silently drop those submissions from the fan-out pipeline.
 *
 * Fails open: any error path (missing API key, network failure, parse error)
 * returns `isJob: false` so real enquiries are never dropped because of an
 * infrastructure hiccup.
 */
export async function classifyAsJobApplication(input: {
  subject: string;
  message: string;
  company?: string;
}): Promise<JobFilterResult> {
  const haystack = [input.subject, input.message, input.company ?? ""]
    .join(" \n ")
    .toLowerCase();

  const hit = matchesKeyword(haystack);
  if (!hit) {
    return { isJob: false, stage: "no-match", reason: "no keyword match" };
  }

  // Keyword hit — ask the model to adjudicate.
  const verdict = await classifyWithOpenAI(
    input.subject,
    input.message,
    input.company
  );

  if (verdict === "JOB") {
    return {
      isJob: true,
      stage: "keyword+ai",
      reason: `keyword="${hit}", ai=JOB`,
    };
  }

  if (verdict === "ENQUIRY") {
    return {
      isJob: false,
      stage: "keyword+ai",
      reason: `keyword="${hit}", ai=ENQUIRY (override)`,
    };
  }

  // verdict === "UNKNOWN" → OpenAI errored or no API key configured.
  // Fail open: let the enquiry through so we never drop a real lead.
  return {
    isJob: false,
    stage: "ai-error",
    reason: `keyword="${hit}", ai=UNKNOWN (failed open)`,
  };
}
