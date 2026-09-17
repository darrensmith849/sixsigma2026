/**
 * Course + CourseInstance JSON-LD builder.
 *
 * Schema.org Course is the strongest signal an LLM has for "what is this
 * training and what does it earn the learner". Beyond the basics, AI engines
 * read `educationalCredentialAwarded`, `teaches`, `coursePrerequisites` and
 * `educationalLevel` verbatim when summarising "best Yellow Belt course in
 * <city>" style queries.
 *
 * `offers` is intentionally omitted — fake / placeholder prices get pages
 * demoted by Google's manual reviewers. Add `offers` only when public prices
 * actually ship.
 */
import type { JsonLdObject } from "../types";

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
export type CourseModeKeyword = "Onsite" | "Online" | "Blended";

export interface CourseInstanceInput {
  /** Schema.org-recognised mode keyword (Onsite, Online, Blended). */
  courseMode: CourseModeKeyword;
  /** Human-readable duration, e.g. "5 days" or "Self-paced (approx 40 hours)". */
  courseWorkload: string;
  /** Optional — ISO date / datetime. Set on dated public sessions. */
  startDate?: string;
  endDate?: string;
  /** Optional — physical city or "Online". */
  location?: {
    name: string;
    addressLocality?: string;
    addressRegion?: string;
    addressCountry?: string;
  };
  /** Optional — references a Person entity by URL. */
  instructorUrl?: string;
  inLanguage?: string;
}

export interface CourseSchemaInput {
  /** Canonical course title. */
  name: string;
  /** One-paragraph description; LLMs may extract verbatim. */
  description: string;
  /** Full canonical URL of this course page. */
  url: string;
  /** Absolute or root-relative image URL. */
  image?: string;
  /** Full Organization sub-graph for `provider`. */
  provider: JsonLdObject;
  /** Credential awarded on successful completion. */
  educationalCredentialAwarded?: string;
  /** Array of topics or outcomes taught. */
  teaches?: string[];
  /** Free-text prerequisites string. */
  coursePrerequisites?: string;
  /** ISO 639-1 language code (e.g. "en"). */
  inLanguage?: string;
  educationalLevel?: CourseLevel;
  /** Optional — targeted learner audience. */
  audienceRole?: string;
  /** One or more CourseInstance entries. Pass undated generic instance for
   *  always-on offerings; pass dated instances for specific public sessions. */
  instances: CourseInstanceInput[];
}

export function buildCourseSchema(input: CourseSchemaInput): JsonLdObject {
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: input.name,
    description: input.description,
    url: input.url,
    provider: input.provider,
  };

  if (input.image) schema.image = input.image;
  if (input.educationalCredentialAwarded)
    schema.educationalCredentialAwarded = input.educationalCredentialAwarded;
  if (input.teaches && input.teaches.length > 0)
    schema.teaches = input.teaches;
  if (input.coursePrerequisites)
    schema.coursePrerequisites = input.coursePrerequisites;
  if (input.inLanguage) schema.inLanguage = input.inLanguage;
  if (input.educationalLevel) schema.educationalLevel = input.educationalLevel;
  if (input.audienceRole) {
    schema.audience = {
      "@type": "EducationalAudience",
      educationalRole: input.audienceRole,
    };
  }

  const instances = input.instances.map(buildCourseInstance);
  schema.hasCourseInstance = instances.length === 1 ? instances[0] : instances;

  return schema;
}

export function buildCourseInstance(i: CourseInstanceInput): JsonLdObject {
  const inst: JsonLdObject = {
    "@type": "CourseInstance",
    courseMode: i.courseMode,
    courseWorkload: i.courseWorkload,
  };
  if (i.startDate) inst.startDate = i.startDate;
  if (i.endDate) inst.endDate = i.endDate;
  if (i.inLanguage) inst.inLanguage = i.inLanguage;
  if (i.location) {
    inst.location = {
      "@type": "Place",
      name: i.location.name,
      address: i.location.addressLocality
        ? {
            "@type": "PostalAddress",
            addressLocality: i.location.addressLocality,
            addressRegion: i.location.addressRegion,
            addressCountry: i.location.addressCountry ?? "ZA",
          }
        : undefined,
    };
  }
  if (i.instructorUrl) {
    inst.instructor = {
      "@type": "Person",
      "@id": i.instructorUrl,
    };
  }
  return inst;
}

/**
 * Map our internal "Classroom | Virtual | Online" delivery mode to the
 * schema.org-recognised CourseInstance.courseMode keyword.
 */
export function toCourseModeKeyword(
  mode: "Classroom" | "Virtual" | "Online",
): CourseModeKeyword {
  if (mode === "Classroom") return "Onsite";
  if (mode === "Online") return "Online";
  return "Blended"; // Virtual instructor-led = blended (live online)
}
