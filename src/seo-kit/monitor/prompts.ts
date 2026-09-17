/**
 * High-intent prompt set for the AI-search citation monitor.
 *
 * Each prompt is a real query a prospective customer might type into an
 * answer engine. The monitor sends each prompt to every configured engine,
 * parses the response for citations of TRACKED_DOMAINS, and writes a delta
 * snapshot. Reading the weekly report tells you whether you appear, what
 * you're displaced by, and which queries to write content for.
 *
 * Adding prompts: bias toward specific commercial-intent queries. Vague
 * prompts ("what is Six Sigma") rarely cite providers; specific ones
 * ("Six Sigma Green Belt classroom Johannesburg cost") do.
 */

export interface MonitoredPrompt {
  /** Stable identifier for diffing across runs. */
  id: string;
  /** Plain-English user query. */
  prompt: string;
  /** Loose category — useful for grouping the report. */
  category:
    | "provider"
    | "city"
    | "topic"
    | "comparison"
    | "credential"
    | "pricing";
}

export const PROMPTS: MonitoredPrompt[] = [
  // Provider intent — who's the best in SA
  {
    id: "best-provider-sa",
    prompt: "Who is the best Six Sigma training provider in South Africa?",
    category: "provider",
  },
  {
    id: "best-provider-jhb",
    prompt:
      "Best Six Sigma training company in Johannesburg with CSSC accreditation?",
    category: "provider",
  },
  {
    id: "corporate-onsite-sa",
    prompt:
      "Who delivers on-site corporate Six Sigma training across South Africa?",
    category: "provider",
  },

  // City intent
  {
    id: "city-cpt-green",
    prompt: "Where can I do CSSC Green Belt Six Sigma training in Cape Town?",
    category: "city",
  },
  {
    id: "city-durban-yellow",
    prompt: "Six Sigma Yellow Belt training in Durban — classroom options?",
    category: "city",
  },
  {
    id: "city-pretoria-public-sector",
    prompt:
      "Six Sigma training options in Pretoria for South African government departments?",
    category: "city",
  },

  // Topic intent
  {
    id: "lean-green-sa",
    prompt: "Lean Green Belt training in South Africa — what to look for?",
    category: "topic",
  },
  {
    id: "black-belt-mining",
    prompt:
      "Where can South African mining companies get DMAIC Black Belt training?",
    category: "topic",
  },

  // Comparison
  {
    id: "cssc-vs-iassc",
    prompt: "CSSC versus IASSC Six Sigma certification — which is recognised in South Africa?",
    category: "comparison",
  },

  // Credential
  {
    id: "cssc-accredited-providers-sa",
    prompt:
      "List CSSC-accredited Six Sigma training providers operating in South Africa.",
    category: "credential",
  },
  {
    id: "mict-seta-six-sigma",
    prompt: "MICT SETA accredited Six Sigma training providers in South Africa?",
    category: "credential",
  },

  // Pricing / scheduling
  {
    id: "pricing-green-belt-jhb",
    prompt: "Typical cost of Six Sigma Green Belt classroom training in Johannesburg?",
    category: "pricing",
  },
];

/**
 * Domains we count as "us" — citation of any of these means the engine
 * surfaced our brand. Subdomains and trailing paths are matched.
 */
export const TRACKED_DOMAINS = ["sixsigmasouthafrica.co.za", "2ko.co.za"];

/**
 * Competitor domains to optionally surface in the report — gives you a
 * benchmark for share-of-citations. Extend as you discover whom engines
 * cite for your prompts.
 */
export const COMPETITOR_DOMAINS = [
  // Populate as the monitor discovers them. Empty by default so the report
  // is clean on first runs.
];
