import type { MetadataRoute } from "next";
import {
  ASSISTANT_RETRIEVAL_BOTS,
  BLOCKED_BOTS,
  SEARCH_ENGINE_BOTS,
} from "@/seo-kit/bots";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sixsigmasouthafrica.co.za";

// Legacy WordPress/WooCommerce paths that Google still tries to crawl from old
// backlinks. Returning 404 for these wastes crawl budget; disallowing them
// lets crawlers drop them faster.
const LEGACY_WP_DISALLOW = [
  "/wp-login.php",
  "/wp-admin/",
  "/wp-content/",
  "/wp-includes/",
  "/wp-json/",
  "/*?add-to-cart=",
  "/*?currency=",
  "/*/feed",
  "/*/feed/",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default policy: allow root, block legacy WP paths.
      {
        userAgent: "*",
        allow: "/",
        disallow: LEGACY_WP_DISALLOW,
      },

      // Explicit allow for AI assistant retrievers (ChatGPT, Claude, Perplexity,
      // Gemini, Apple Intelligence). These are the bots that drive answer-engine
      // citations back to the site.
      ...ASSISTANT_RETRIEVAL_BOTS.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: LEGACY_WP_DISALLOW,
      })),

      // Explicit allow for major search-engine bots. Bingbot in particular
      // powers ChatGPT search + Copilot retrieval.
      ...SEARCH_ENGINE_BOTS.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: LEGACY_WP_DISALLOW,
      })),

      // Block Common Crawl. See src/seo-kit/bots.ts for rationale.
      ...BLOCKED_BOTS.map((bot) => ({
        userAgent: bot,
        disallow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
