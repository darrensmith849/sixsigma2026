/**
 * Lightweight JSON-LD validator.
 *
 * Catches the common schema authoring bugs that silently degrade AI-search
 * visibility: missing required fields, typo'd @type, plain strings where
 * Organization sub-graphs are expected.
 *
 * Deliberately NOT a full schema.org validator — we maintain a hand-curated
 * required-field map for the types we actually emit. Adding new schema types
 * to the site means adding a row here.
 */
import type { JsonLdObject } from "../types";

export interface ValidationIssue {
  /** Originating @type, or "unknown" if missing. */
  type: string;
  /** Field path within the schema (e.g. "provider.name"). */
  path: string;
  message: string;
}

/**
 * Required top-level fields per schema.org @type. Add new entries when the
 * site starts emitting a new type. Missing types are flagged as a separate
 * "unknown type" warning rather than passing silently.
 */
const REQUIRED_FIELDS: Record<string, string[]> = {
  Organization: ["@context", "name", "url"],
  EducationalOrganization: ["@context", "name", "url"],
  WebSite: ["@context", "name", "url"],
  BreadcrumbList: ["@context", "itemListElement"],
  ItemList: ["@context", "itemListElement"],
  Course: ["@context", "name", "description", "provider", "url"],
  CourseInstance: ["@type", "courseMode"],
  EducationEvent: ["@context", "name", "startDate"],
  FAQPage: ["@context", "mainEntity"],
  Question: ["@type", "name", "acceptedAnswer"],
  Answer: ["@type", "text"],
  Article: [
    "@context",
    "headline",
    "datePublished",
    "author",
    "publisher",
    "url",
  ],
  BlogPosting: [
    "@context",
    "headline",
    "datePublished",
    "author",
    "publisher",
    "url",
  ],
  ContactPage: ["@context", "url", "mainEntity"],
  Person: ["@context", "name"],
  Event: ["@context", "name", "startDate"],
  // Common nested sub-types we emit. Each only requires @type to be present.
  ContactPoint: ["@type"],
  EducationalOccupationalCredential: ["@type", "name"],
  SearchAction: ["@type", "target"],
  EntryPoint: ["@type"],
  ListItem: ["@type", "position"],
  City: ["@type", "name"],
  AdministrativeArea: ["@type", "name"],
  Place: ["@type", "name"],
  PostalAddress: ["@type"],
  VirtualLocation: ["@type"],
  ImageObject: ["@type"],
  WebPage: ["@type"],
  CreativeWork: ["@type"],
  Thing: ["@type"],
  EducationalAudience: ["@type"],
};

/**
 * Validate a single JSON-LD object. Returns the list of issues found; an empty
 * list means valid by our hand-curated rules.
 *
 * Nested sub-graphs (provider, author, mainEntity, etc.) are validated against
 * the same per-type required fields EXCEPT `@context`, which is only required
 * at the root per the schema.org / JSON-LD specs.
 */
export function validateJsonLd(
  data: JsonLdObject,
  rootPath = "$",
  isRoot = true,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const type =
    typeof data["@type"] === "string" ? (data["@type"] as string) : "unknown";

  if (type === "unknown") {
    issues.push({
      type,
      path: rootPath,
      message: "Missing or non-string @type",
    });
    return issues;
  }

  const required = REQUIRED_FIELDS[type];
  if (!required) {
    issues.push({
      type,
      path: rootPath,
      message: `No validation rules registered for @type "${type}"`,
    });
    return issues;
  }

  for (const field of required) {
    // @context is only required at the root of a JSON-LD document; nested
    // objects inherit it. Skip the check on non-root.
    if (field === "@context" && !isRoot) continue;
    // `url` on nested entity references is optional — a name + @type is enough
    // for engines to resolve the reference (especially when @id is present).
    if (field === "url" && !isRoot) continue;
    const v = data[field];
    if (v === undefined || v === null || v === "") {
      issues.push({
        type,
        path: `${rootPath}.${field}`,
        message: `Missing required field "${field}" on ${type}`,
      });
    }
  }

  // Recurse into nested @type'd objects so we catch issues in provider /
  // author / mainEntity / itemListElement.
  for (const [key, value] of Object.entries(data)) {
    if (key.startsWith("@")) continue;
    if (Array.isArray(value)) {
      value.forEach((item, idx) => {
        if (item && typeof item === "object" && "@type" in item) {
          issues.push(
            ...validateJsonLd(
              item as JsonLdObject,
              `${rootPath}.${key}[${idx}]`,
              false,
            ),
          );
        }
      });
    } else if (value && typeof value === "object" && "@type" in value) {
      issues.push(
        ...validateJsonLd(
          value as JsonLdObject,
          `${rootPath}.${key}`,
          false,
        ),
      );
    }
  }

  return issues;
}

/**
 * Extract all <script type="application/ld+json"> blocks from a raw HTML
 * string and return the parsed objects.
 */
export function extractJsonLdFromHtml(html: string): JsonLdObject[] {
  const out: JsonLdObject[] = [];
  // Non-greedy match between the script tags.
  const re =
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const raw = m[1].trim();
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        out.push(...(parsed as JsonLdObject[]));
      } else {
        out.push(parsed as JsonLdObject);
      }
    } catch {
      // Surface parse errors via the validator instead of throwing here.
      out.push({ "@type": "JsonLdParseError", raw } as JsonLdObject);
    }
  }
  return out;
}

/**
 * Convenience: extract from HTML + validate every block, returning a flat
 * issue list with the source URL attached.
 */
export function validateHtmlSchemas(
  url: string,
  html: string,
): Array<ValidationIssue & { url: string }> {
  const blocks = extractJsonLdFromHtml(html);
  return blocks.flatMap((block) =>
    validateJsonLd(block).map((issue) => ({ ...issue, url })),
  );
}
