/**
 * WebSite JSON-LD with SearchAction.
 *
 * Tells search and AI engines (a) what to call the site as a brand entity and
 * (b) how to construct in-site search URLs. Google in particular surfaces a
 * sitelinks search box when this is present; LLMs use the canonical name from
 * `name` when summarising the brand.
 *
 * Caller must ensure the site actually responds to the search-URL pattern.
 * Don't ship a SearchAction that points nowhere.
 */
import type { JsonLdObject } from "../types";

export interface WebsiteSchemaConfig {
  /** Canonical site name. */
  name: string;
  /** Canonical site URL, no trailing slash. */
  url: string;
  /**
   * Search URL template with the literal `{search_term_string}` placeholder.
   * Example: `https://example.com/search?q={search_term_string}`
   */
  searchUrlPattern: string;
  /** Optional alternate brand names. */
  alternateName?: string;
}

export function buildWebsiteSchema(config: WebsiteSchemaConfig): JsonLdObject {
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.name,
    url: config.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: config.searchUrlPattern,
      },
      "query-input": "required name=search_term_string",
    },
  };
  if (config.alternateName) {
    schema.alternateName = config.alternateName;
  }
  return schema;
}
