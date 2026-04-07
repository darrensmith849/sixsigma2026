import type { MetadataRoute } from "next";
import { courses } from "./courses/[slug]/courseData";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sixsigmasouthafrica.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
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

  return [...staticRoutes, ...courseRoutes].map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
