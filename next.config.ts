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

// The legacy WordPress site also published URLs that used the bare topic name
// (e.g. "green-belt", "black-belt") without the core/dmaic/lean prefix that
// the new course catalogue uses. Map each generic name to the canonical
// variant most users expect.
const plainBeltAliases: { topic: string; canonical: string }[] = [
  { topic: "green-belt", canonical: "core-green-belt" },
  { topic: "black-belt", canonical: "dmaic-black-belt" },
];

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

// Same patterns as buildCourseRedirects, but for the bare-topic aliases that
// resolve to a canonical course (e.g. /six-sigma-classroom-green-belt-course-in-umlazi
// → /courses/core-green-belt-classroom).
function buildPlainBeltRedirects() {
  const redirects: {
    source: string;
    destination: string;
    permanent: boolean;
  }[] = [];
  for (const { topic, canonical } of plainBeltAliases) {
    for (const mode of legacyModes) {
      const dest = `/courses/${canonical}-${mode}`;
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
      ...buildPlainBeltRedirects(),

      // Generic "Six Sigma courses in {city}" pages → courses listing
      {
        source: "/six-sigma-courses-in-:city",
        destination: "/courses",
        permanent: true,
      },

      // Legacy WooCommerce product pages — map each to the matching new
      // course (classroom is treated as the canonical "full course" variant).
      {
        source: "/product/5s",
        destination: "/courses/5s-classroom",
        permanent: true,
      },
      {
        source: "/product/six-sigma-white-belt-full-course",
        destination: "/courses/white-belt-classroom",
        permanent: true,
      },
      {
        source: "/product/yellow-belt-full-course",
        destination: "/courses/yellow-belt-classroom",
        permanent: true,
      },
      {
        source: "/product/green-belt-full-course",
        destination: "/courses/core-green-belt-classroom",
        permanent: true,
      },
      {
        source: "/product/black-belt-full-course",
        destination: "/courses/dmaic-black-belt-classroom",
        permanent: true,
      },
      {
        source: "/product/six-sigma-statistics",
        destination: "/courses",
        permanent: true,
      },
      // Catch-all for any other legacy /product/* or /product-category/* URL
      {
        source: "/product/:path*",
        destination: "/courses",
        permanent: true,
      },
      {
        source: "/product-category/:path*",
        destination: "/courses",
        permanent: true,
      },

      // Bare belt landing pages (no city, no mode)
      {
        source: "/yellow-belt",
        destination: "/courses/yellow-belt-classroom",
        permanent: true,
      },
      {
        source: "/black-belt",
        destination: "/courses/dmaic-black-belt-classroom",
        permanent: true,
      },
      {
        source: "/lean-black-belt",
        destination: "/courses/lean-black-belt-classroom",
        permanent: true,
      },
      // WordPress duplicate-page suffix (-2 / -3) variants
      {
        source: "/white-belt-2",
        destination: "/courses/white-belt-classroom",
        permanent: true,
      },

      // Belt + city WordPress pages — preserve the city signal by sending
      // them to the per-city listing rather than the generic course page.
      {
        source: "/green-belt-cape-town",
        destination: "/courses/in/cape-town",
        permanent: true,
      },
      {
        source: "/green-belt-pretoria",
        destination: "/courses/in/pretoria",
        permanent: true,
      },
      {
        source: "/green-belt-durban",
        destination: "/courses/in/durban",
        permanent: true,
      },
      {
        source: "/green-belt-port-elizabeth",
        destination: "/courses/in/port-elizabeth",
        permanent: true,
      },
      {
        source: "/black-belt-johannesburg",
        destination: "/courses/in/johannesburg",
        permanent: true,
      },
      {
        source: "/black-belt-durban",
        destination: "/courses/in/durban",
        permanent: true,
      },
      {
        source: "/black-belt-port-elizabeth",
        destination: "/courses/in/port-elizabeth",
        permanent: true,
      },
      {
        source: "/six-sigma-port-elizabeth",
        destination: "/courses/in/port-elizabeth",
        permanent: true,
      },

      // Legacy WordPress "why choose us" duplicate landing pages
      {
        source: "/why-choose-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/why-choose-us-2",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/why-choose-us-2-2",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/why-choose-us-3",
        destination: "/about",
        permanent: true,
      },

      // Legacy assessment / quote tools
      {
        source: "/quick-quote",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/detailed-assessment-tool",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/assessment_tool.html",
        destination: "/contact",
        permanent: true,
      },

      // Misc legacy WordPress assets and capitalised paths
      {
        source: "/Accreditation",
        destination: "/accreditation",
        permanent: true,
      },
      {
        source: "/2KO_Course_Guide_2023.pdf",
        destination: "/brochure",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      // Legacy pre-WordPress static .html pages still hit by old Google Ads
      // and external backlinks. /six-sigma-courses.html is the destination
      // of an active Google Ads campaign.
      {
        source: "/six-sigma-courses.html",
        destination: "/courses",
        permanent: true,
      },
      {
        source: "/booking.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/Accredited_Nqoba_Manana.html",
        destination: "/about",
        permanent: true,
      },

      // Catch-all WordPress feed and category URLs
      {
        source: "/:path*/feed",
        destination: "/",
        permanent: true,
      },
      {
        source: "/category/:path*",
        destination: "/",
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
      // /news-feed had indexed content — redirect to a content page rather
      // than "/" to avoid soft-404 signals.
      { source: "/news-feed", destination: "/about", permanent: true },
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
