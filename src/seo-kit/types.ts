/**
 * Public types for the seo-kit module.
 *
 * Treat this file as part of the public API surface. Adding fields is fine;
 * removing or renaming is a breaking change — bump VERSION and note in CHANGELOG.
 */

/** A schema.org JSON-LD object. Loose type to keep authoring ergonomic. */
export type JsonLdObject = Record<string, unknown>;

/** Minimal site identity used by most builders. */
export interface SiteIdentity {
  /** Canonical site URL, no trailing slash. e.g. https://sixsigmasouthafrica.co.za */
  siteUrl: string;
  /** Brand name. e.g. "Six Sigma South Africa" */
  siteName: string;
  /** Logo URL (absolute or root-relative). */
  logoUrl?: string;
}

/** One breadcrumb step. */
export interface Crumb {
  name: string;
  url: string;
}

/** A section in the llms.txt curated index. */
export interface LlmsSection {
  title: string;
  entries: LlmsEntry[];
}

export interface LlmsEntry {
  title: string;
  url: string;
  description?: string;
}

/** Config for the llms.txt generator. */
export interface LlmsTxtConfig {
  siteName: string;
  siteUrl: string;
  /** One-line tagline shown as the blockquote under the H1. */
  summary: string;
  /** Optional long-form description shown as a paragraph after the summary. */
  intro?: string;
  sections: LlmsSection[];
}
