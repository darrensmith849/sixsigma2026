/**
 * Person JSON-LD for instructors / authors / team members.
 *
 * The single highest-leverage entity-graph win once it's populated. LLMs
 * routinely ground "who teaches X in <country>" answers in Person entities
 * tied to Organization entities — without a Person, AI engines fall back to
 * generic "Six Sigma South Africa employs certified trainers" boilerplate.
 *
 * Always include:
 *   - `worksFor` linking back to the Organization (binds them as your team)
 *   - `sameAs` with LinkedIn at minimum (binds them to the broader graph)
 *   - `knowsAbout` with subject-matter keywords (this is what LLMs match against
 *     when picking who to cite for a topic)
 */
import type { JsonLdObject } from "../types";

export interface PersonSchemaInput {
  /** Stable URL identifier for this person — used by other schemas as @id. */
  url: string;
  name: string;
  jobTitle?: string;
  /** Short bio; 1-3 sentences. LLMs may quote directly. */
  description?: string;
  /** Absolute or root-relative image URL. */
  image?: string;
  /** Email address — optional, exposes contact reachability. */
  email?: string;
  /** Organization the person works for. Pass an `@id` ref or full sub-graph. */
  worksFor?: JsonLdObject;
  /** Universities, prior employers, certifying bodies as sub-graphs. */
  alumniOf?: JsonLdObject[];
  /** Subject-matter keywords. e.g. ["DMAIC", "Statistical Process Control"]. */
  knowsAbout?: string[];
  /** Public credentials / awards / certifications. */
  hasCredential?: Array<{
    name: string;
    credentialCategory?: string;
    recognizedBy?: { name: string; url?: string };
  }>;
  /** External profiles. LinkedIn URL at minimum. */
  sameAs?: string[];
}

export function buildPersonSchema(input: PersonSchemaInput): JsonLdObject {
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": input.url,
    url: input.url,
    name: input.name,
  };
  if (input.jobTitle) schema.jobTitle = input.jobTitle;
  if (input.description) schema.description = input.description;
  if (input.image) schema.image = input.image;
  if (input.email) schema.email = input.email;
  if (input.worksFor) schema.worksFor = input.worksFor;
  if (input.alumniOf && input.alumniOf.length > 0)
    schema.alumniOf = input.alumniOf;
  if (input.knowsAbout && input.knowsAbout.length > 0)
    schema.knowsAbout = input.knowsAbout;
  if (input.hasCredential && input.hasCredential.length > 0) {
    schema.hasCredential = input.hasCredential.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      credentialCategory: c.credentialCategory,
      recognizedBy: c.recognizedBy
        ? {
            "@type": "Organization",
            name: c.recognizedBy.name,
            url: c.recognizedBy.url,
          }
        : undefined,
    }));
  }
  if (input.sameAs && input.sameAs.length > 0) schema.sameAs = input.sameAs;
  return schema;
}
