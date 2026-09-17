import type { MetadataRoute } from "next";
import { resolve } from "node:path";
import { readLastmodCache } from "@/seo-kit/lastmod";
import { listContentPosts } from "@/seo-kit/content";
import { courses } from "./courses/[slug]/courseData";
import { cities } from "./courses/in/[city]/cityData";
import { instructors } from "@/data/instructors";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sixsigmasouthafrica.co.za";

// Resolved at build time. Populated by scripts/build-lastmod.ts (prebuild).
// Falls back to {} if the cache file is missing, which means every route
// reports deploy time — graceful degrade, no build failure.
const LASTMOD_CACHE = readLastmodCache(resolve(process.cwd(), "data/lastmod.json"));

export default function sitemap(): MetadataRoute.Sitemap {
  const deployTime = new Date();

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.8 },
    { path: "/courses", priority: 0.9 },
    { path: "/contact", priority: 0.7 },
    { path: "/faqs", priority: 0.6 },
    { path: "/accreditation", priority: 0.6 },
    { path: "/training-benefits", priority: 0.6 },
    { path: "/brochure", priority: 0.5 },
    { path: "/schedule", priority: 0.6 },
  ];

  const courseRoutes = courses.map((c) => ({
    path: `/courses/${c.slug}`,
    priority: 0.7,
  }));

  const cityRoutes = cities.map((c) => ({
    path: `/courses/in/${c.slug}`,
    priority: 0.85,
  }));

  // Instructor routes only appear when the data file is populated. Empty array
  // → no instructor URLs in the sitemap (avoids advertising stub pages).
  const instructorRoutes: { path: string; priority: number }[] = [];
  if (instructors.length > 0) {
    instructorRoutes.push({ path: "/about/instructors", priority: 0.7 });
    for (const p of instructors) {
      instructorRoutes.push({
        path: `/about/instructors/${p.slug}`,
        priority: 0.6,
      });
    }
  }

  // Insights posts — only included when content/insights/ has non-draft .md
  // files. Empty folder → no insights URLs in sitemap.
  const insightsPosts = listContentPosts("insights");
  const insightsRoutes: { path: string; priority: number }[] = [];
  if (insightsPosts.length > 0) {
    insightsRoutes.push({ path: "/insights", priority: 0.7 });
    for (const p of insightsPosts) {
      insightsRoutes.push({
        path: `/insights/${p.slug}`,
        priority: 0.6,
      });
    }
  }

  return [
    ...staticRoutes,
    ...courseRoutes,
    ...cityRoutes,
    ...instructorRoutes,
    ...insightsRoutes,
  ].map((r) => {
    // Cache uses route paths exactly as written above ("/" for root, the rest
    // with leading slash). Falls back to deploy time when missing.
    const cached = LASTMOD_CACHE[r.path];
    const lastModified = cached ? new Date(cached) : deployTime;
    return {
      url: r.path === "/" ? SITE_URL : `${SITE_URL}${r.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    };
  });
}
