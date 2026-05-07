import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sixsigmasouthafrica.co.za";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block legacy WordPress/WooCommerce paths that Google still tries to
        // crawl from old backlinks. Returning 404 for these wastes crawl
        // budget; disallowing them lets Google drop them faster.
        disallow: [
          "/wp-login.php",
          "/wp-admin/",
          "/wp-content/",
          "/wp-includes/",
          "/wp-json/",
          "/*?add-to-cart=",
          "/*?currency=",
          "/*/feed",
          "/*/feed/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
