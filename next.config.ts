import type { NextConfig } from "next";

// Topics from the legacy site that we want to redirect to the new canonical
// course pages. Each maps the legacy topic slug to the new courseData slug.
const legacyTopics = [
  "5s",
  "kaizen",
  "white-belt",
  "yellow-belt",
  "core-green-belt",
  "dmaic-green-belt",
  "lean-green-belt",
  "dmaic-black-belt",
  "lean-black-belt",
  "root-cause-analysis",
];

const legacyModes = ["classroom", "virtual", "online"];

// Build pattern redirects for every legacy course URL variant. Covers both
// singular "course-in-:city" and plural "courses-in-:city" shapes. The :city
// param is captured but ignored in the destination — the new canonical course
// pages are location-agnostic.
function buildCourseRedirects() {
  const redirects: {
    source: string;
    destination: string;
    permanent: boolean;
  }[] = [];
  for (const topic of legacyTopics) {
    for (const mode of legacyModes) {
      const dest = `/courses/${topic}-${mode}`;
      redirects.push(
        {
          source: `/six-sigma-${mode}-${topic}-course-in-:city`,
          destination: dest,
          permanent: true,
        },
        {
          source: `/six-sigma-${mode}-${topic}-courses-in-:city`,
          destination: dest,
          permanent: true,
        },
        // Long tail with "-elearning-training" suffix spotted in old sitemap
        {
          source: `/six-sigma-${mode}-${topic}-courses-in-:city-elearning-training`,
          destination: dest,
          permanent: true,
        }
      );
    }
  }
  return redirects;
}

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...buildCourseRedirects(),

      // Generic "Six Sigma courses in {city}" pages → courses listing
      {
        source: "/six-sigma-courses-in-:city",
        destination: "/courses",
        permanent: true,
      },

      // Legacy flat pages from the old WordPress site
      { source: "/about-us", destination: "/about", permanent: true },
      {
        source: "/darren-smith-director",
        destination: "/about",
        permanent: true,
      },
      { source: "/success-stories", destination: "/about", permanent: true },
      {
        source: "/request-quote",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/green-belt-booking-form",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/booking-form",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/booking-form-new",
        destination: "/contact",
        permanent: true,
      },
      { source: "/book-a-course", destination: "/contact", permanent: true },
      { source: "/which-course", destination: "/courses", permanent: true },
      { source: "/calendar", destination: "/schedule", permanent: true },
      { source: "/news-feed", destination: "/", permanent: true },
      { source: "/home-page-2", destination: "/", permanent: true },
      { source: "/sample-page", destination: "/", permanent: true },
      { source: "/test-page", destination: "/", permanent: true },
      { source: "/members", destination: "/contact", permanent: true },
      {
        source: "/terms-of-service",
        destination: "/contact",
        permanent: true,
      },
      // Legacy WooCommerce store pages — the new site does not sell online
      { source: "/shop", destination: "/courses", permanent: true },
      { source: "/cart", destination: "/courses", permanent: true },
      { source: "/checkout", destination: "/contact", permanent: true },
      { source: "/my-account", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
