import type { NextConfig } from "next";

const legacyCourseRedirects = [
  "/six-sigma-classroom-5s-course-in-south-africa",
  "/six-sigma-online-5s-course-in-south-africa",
  "/six-sigma-virtual-5s-course-in-south-africa",
  "/six-sigma-classroom-kaizen-course-in-south-africa",
  "/six-sigma-virtual-kaizen-course-in-south-africa",
  "/six-sigma-online-kaizen-course-in-south-africa",
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy course slugs → courses listing (until individual pages exist)
      ...legacyCourseRedirects.map((source) => ({
        source,
        destination: "/courses",
        permanent: true,
      })),
      // Legacy support pages
      { source: "/schedule", destination: "/courses", permanent: true },
      { source: "/book-a-course", destination: "/contact", permanent: true },
      { source: "/which-course", destination: "/courses", permanent: true },
      { source: "/calendar", destination: "/courses", permanent: true },
      { source: "/training-benefits", destination: "/about", permanent: true },
      { source: "/brochure", destination: "/contact", permanent: true },
      { source: "/accreditation", destination: "/about", permanent: true },
      { source: "/faqs", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
