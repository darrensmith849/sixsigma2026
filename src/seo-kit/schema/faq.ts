/**
 * FAQPage JSON-LD.
 *
 * The right type for a page whose value is a set of direct answers — course
 * comparison, pricing, prerequisites. Google rarely shows FAQ rich results for
 * commercial pages any more, but assistants lean on this heavily when deciding
 * what a page actually answers, and it is the cheapest way to state a question
 * in the exact words someone searched.
 *
 * One FAQPage per page. Every answer must appear in the visible copy too —
 * schema that contradicts the page is a manual-action risk, not a shortcut.
 */
import type { JsonLdObject } from "../types";

export interface FaqEntry {
  question: string;
  /** Plain text or simple inline HTML. Must match what the page shows. */
  answer: string;
}

export function buildFaqSchema(entries: FaqEntry[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.question,
      acceptedAnswer: { "@type": "Answer", text: e.answer },
    })),
  };
}
