/**
 * Article JSON-LD for evergreen content pages and blog posts.
 *
 * Article is the right type for any page that's primarily editorial — about,
 * accreditation, training-benefits, insights posts. For homepage-style pages
 * use WebSite; for content like FAQs use FAQPage. The combination of
 * `datePublished` + `dateModified` is what gives Bing the "Last reviewed"
 * badge in chat results, and LLMs use it to decide freshness when picking
 * between citation candidates.
 *
 * The publisher Organization sub-graph must match the canonical Organization
 * schema emitted from the root layout — keep `name`, `url`, `logo` consistent
 * to reinforce the entity binding.
 */
import type { JsonLdObject } from "../types";

export interface ArticleSchemaInput {
  /** Visible page headline. Used by LLMs as the canonical title. */
  headline: string;
  /** One-paragraph summary. Often the same as the meta description. */
  description: string;
  /** Canonical URL of this article. */
  url: string;
  /** Absolute or root-relative image URL. */
  image?: string;
  /** ISO 8601 date when the article was first published. */
  datePublished: string;
  /** ISO 8601 date when last meaningfully updated. */
  dateModified?: string;
  /** Author Organization or Person. Must include @type. */
  author: JsonLdObject;
  /** Publisher Organization. Must match the root Organization schema. */
  publisher: JsonLdObject;
  /** Optional explicit Article subtype (e.g. NewsArticle, BlogPosting). */
  articleType?: "Article" | "BlogPosting" | "NewsArticle" | "Report";
  /** Optional inLanguage; defaults to en. */
  inLanguage?: string;
}

export function buildArticleSchema(input: ArticleSchemaInput): JsonLdObject {
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": input.articleType ?? "Article",
    headline: input.headline,
    description: input.description,
    url: input.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: input.author,
    publisher: input.publisher,
    inLanguage: input.inLanguage ?? "en",
  };
  if (input.image) schema.image = input.image;
  return schema;
}
