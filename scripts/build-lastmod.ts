#!/usr/bin/env tsx
/**
 * Prebuild step: derive per-route lastModified timestamps from git history
 * and write them to data/lastmod.json for sitemap.ts to consume.
 *
 * Maps each route to the source file(s) whose change should bump the
 * lastModified for that route. For data-driven routes (course detail, city
 * detail) we point at the upstream data file so when courseData.ts or
 * cityData.ts is edited every dependent route gets a fresh timestamp.
 *
 * Run via:  tsx scripts/build-lastmod.ts
 * Hooked from package.json prebuild.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { buildLastmodMap } from "../src/seo-kit/lastmod";

const ROOT = resolve(__dirname, "..");
const OUT_PATH = resolve(ROOT, "data/lastmod.json");

// Route → source-file mappings. Paths are relative to the repo root.
const STATIC_ROUTES = [
  { route: "/", source: "src/app/page.tsx" },
  { route: "/about", source: "src/app/about/page.tsx" },
  { route: "/services", source: "src/app/services/page.tsx" },
  { route: "/courses", source: "src/app/courses/page.tsx" },
  { route: "/contact", source: "src/app/contact/page.tsx" },
  { route: "/faqs", source: "src/app/faqs/page.tsx" },
  { route: "/accreditation", source: "src/app/accreditation/page.tsx" },
  { route: "/training-benefits", source: "src/app/training-benefits/page.tsx" },
  { route: "/brochure", source: "src/app/brochure/page.tsx" },
  { route: "/schedule", source: "src/app/schedule/page.tsx" },
];

// All course detail pages share courseData.ts as their source of truth.
const COURSE_DATA_SOURCE = "src/app/courses/[slug]/courseData.ts";
// All city pages share cityData.ts.
const CITY_DATA_SOURCE = "src/app/courses/in/[city]/cityData.ts";

async function main() {
  // 1) Static route timestamps.
  const staticMap = buildLastmodMap(
    STATIC_ROUTES.map((r) => ({ route: r.route, source: r.source })),
  );

  // 2) Course detail timestamps — all 30 share the same data source, so we
  //    resolve once and copy. Falls back gracefully if courseData isn't in git
  //    yet (e.g. first commit).
  const { courses } = await import("../src/app/courses/[slug]/courseData");
  const courseRoutes = courses.map((c: { slug: string }) => ({
    route: `/courses/${c.slug}`,
    source: COURSE_DATA_SOURCE,
  }));
  const courseMap = buildLastmodMap(courseRoutes);

  // 3) City landing timestamps — same idea.
  const { cities } = await import("../src/app/courses/in/[city]/cityData");
  const cityRoutes = cities.map((c: { slug: string }) => ({
    route: `/courses/in/${c.slug}`,
    source: CITY_DATA_SOURCE,
  }));
  const cityMap = buildLastmodMap(cityRoutes);

  // 4) Instructor routes — only if the data file has entries. Source is the
  //    data file itself, so any roster change bumps every instructor page.
  const { instructors } = await import("../src/data/instructors");
  const instructorRoutes: { route: string; source: string }[] = [];
  if (instructors.length > 0) {
    instructorRoutes.push({
      route: "/about/instructors",
      source: "src/data/instructors.ts",
    });
    for (const p of instructors as Array<{ slug: string }>) {
      instructorRoutes.push({
        route: `/about/instructors/${p.slug}`,
        source: "src/data/instructors.ts",
      });
    }
  }
  const instructorMap = buildLastmodMap(instructorRoutes);

  const combined: Record<string, string> = {
    ...staticMap,
    ...courseMap,
    ...cityMap,
    ...instructorMap,
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(combined, null, 2) + "\n", "utf8");

  const totalRoutes =
    STATIC_ROUTES.length +
    courseRoutes.length +
    cityRoutes.length +
    instructorRoutes.length;
  const resolved = Object.keys(combined).length;
  console.log(
    `[lastmod] wrote ${OUT_PATH} — ${resolved}/${totalRoutes} routes resolved`,
  );
  if (resolved < totalRoutes) {
    console.log(
      `[lastmod] ${
        totalRoutes - resolved
      } route(s) had no git history; sitemap will fall back to deploy time`,
    );
  }
}

main().catch((err) => {
  // Never fail the build — sitemap falls back to deploy time if the cache is
  // missing. Log loudly so we notice in CI.
  console.error("[lastmod] failed:", err);
  process.exit(0);
});
