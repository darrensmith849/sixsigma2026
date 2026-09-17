/**
 * BreadcrumbList JSON-LD server component.
 *
 * One per page. The server component emits a single `<script type="application/ld+json">`
 * tag — no client JavaScript, no React hydration cost. Pass an absolute or
 * site-relative URL in each crumb; relative paths are prefixed with `siteUrl`.
 *
 * Usage:
 *   <BreadcrumbsJsonLd
 *     siteUrl={SITE_URL}
 *     crumbs={[
 *       { name: "Home", url: "/" },
 *       { name: "Courses", url: "/courses" },
 *       { name: "DMAIC Green Belt — Classroom", url: "/courses/dmaic-green-belt-classroom" },
 *     ]}
 *   />
 */
import type { Crumb, JsonLdObject } from "../types";

interface BreadcrumbsJsonLdProps {
  siteUrl: string;
  crumbs: Crumb[];
}

export function buildBreadcrumbsSchema(
  siteUrl: string,
  crumbs: Crumb[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url.startsWith("http") ? c.url : `${siteUrl}${c.url}`,
    })),
  };
}

export default function BreadcrumbsJsonLd({
  siteUrl,
  crumbs,
}: BreadcrumbsJsonLdProps) {
  const schema = buildBreadcrumbsSchema(siteUrl, crumbs);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
