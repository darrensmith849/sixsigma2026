import type { NextConfig } from "next";

const legacyCourseMap: Record<string, string> = {
  "/six-sigma-classroom-5s-course-in-south-africa": "/courses/5s-classroom",
  "/six-sigma-virtual-5s-course-in-south-africa": "/courses/5s-virtual",
  "/six-sigma-online-5s-course-in-south-africa": "/courses/5s-online",
  "/six-sigma-classroom-kaizen-course-in-south-africa":
    "/courses/kaizen-classroom",
  "/six-sigma-virtual-kaizen-course-in-south-africa": "/courses/kaizen-virtual",
  "/six-sigma-online-kaizen-course-in-south-africa": "/courses/kaizen-online",
};

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy course slugs → new canonical pages (301, preserves SEO equity)
      ...Object.entries(legacyCourseMap).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      // Legacy support pages → closest live equivalent
      { source: "/book-a-course", destination: "/contact", permanent: true },
      { source: "/which-course", destination: "/courses", permanent: true },
      { source: "/calendar", destination: "/schedule", permanent: true },
    ];
  },
};

export default nextConfig;
