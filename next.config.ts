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


/* ------------------------------------------------------------------ *
 * Legacy geography redirects
 *
 * The WordPress site published a course page for every belt in every city it
 * served, and again for every African country it sold into. 595 of those
 * addresses were still returning 404 on 14 September 2026 — 259 of them in
 * this belt-plus-place shape — recovered from the Wayback Machine crawl and
 * probed against production one by one.
 *
 * Rules rather than 595 literals, because the archive is a sample of what was
 * indexed: an address that was never captured still resolves if it followed
 * the same shape.
 * ------------------------------------------------------------------ */

/** Cities with their own landing page on the new site. */
const cityLandingPages = [
  "cape-town",
  "johannesburg",
  "durban",
  "pretoria",
  "port-elizabeth",
];

/** Legacy belt slug → the canonical course slug it became. */
const beltAliases: { legacy: string; canonical: string }[] = [
  { legacy: "white-belt", canonical: "white-belt" },
  { legacy: "yellow-belt", canonical: "yellow-belt" },
  { legacy: "green-belt", canonical: "core-green-belt" },
  { legacy: "black-belt", canonical: "dmaic-black-belt" },
  { legacy: "dmaic-green-belt", canonical: "dmaic-green-belt" },
  { legacy: "dmaic-black-belt", canonical: "dmaic-black-belt" },
  { legacy: "lean-green-belt", canonical: "lean-green-belt" },
  { legacy: "lean-black-belt", canonical: "lean-black-belt" },
];

/**
 * Legacy prefixes and the delivery mode each implied. Minitab and SigmaXL were
 * software variants of the same qualification; the current catalogue does not
 * split them, so both fold into the online course.
 */
const legacyModePrefixes: { prefix: string; mode: string }[] = [
  { prefix: "virtual-", mode: "virtual" },
  { prefix: "online-six-sigma-minitab-", mode: "online" },
  { prefix: "online-six-sigma-sigma-xl-", mode: "online" },
  { prefix: "online-six-sigma-", mode: "online" },
  { prefix: "six-sigma-", mode: "classroom" },
  { prefix: "", mode: "classroom" },
];

/**
 * Belt-plus-place pages.
 *
 * A classroom course in a city we have a page for keeps the city, because
 * someone searching for a course in Durban is asking where they can physically
 * attend. Everything else keeps the belt, because for an online or virtual
 * course the location was never the point — and for the African countries
 * there is no page to keep.
 */
function buildBeltPlaceRedirects() {
  const redirects: {
    source: string;
    destination: string;
    permanent: boolean;
  }[] = [];

  for (const { prefix, mode } of legacyModePrefixes) {
    for (const { legacy, canonical } of beltAliases) {
      const course = `/courses/${canonical}-${mode}`;

      // "...-courses-in-durban" and "...-course-in-durban" variants first:
      // they are more specific than the bare "-:place" catch-all below.
      redirects.push(
        {
          source: `/${prefix}${legacy}-courses-in-:city`,
          destination: course,
          permanent: true,
        },
        {
          source: `/${prefix}${legacy}-course-in-:city`,
          destination: course,
          permanent: true,
        },
      );

      // A classroom course in a city that has its own page keeps the city.
      if (mode === "classroom") {
        for (const city of cityLandingPages) {
          redirects.push({
            source: `/${prefix}${legacy}-${city}`,
            destination: `/courses/in/${city}`,
            permanent: true,
          });
        }
      }

      // Everything else — other SA towns, provinces, and every African
      // country the legacy site sold into — keeps the belt.
      redirects.push({
        source: `/${prefix}${legacy}-:place`,
        destination: course,
        permanent: true,
      });
    }
  }

  return redirects;
}

/** Countries the legacy site published a course catalogue for. */
const legacyCountries = [
  "angola",
  "botswana",
  "cameroon",
  "ethiopia",
  "ghana",
  "kenya",
  "malawi",
  "mauritius",
  "mozambique",
  "namibia",
  "nigeria",
  "rwanda",
  "senegal",
  "tanzania",
  "uganda",
  "zambia",
  "zimbabwe",
];

/** South African towns that had a /locations/ subtree. */
const legacyLocations = [
  "ballito",
  "benoni",
  "bloemfontein",
  "durban",
  "east_london",
  "george",
  "port_elizabeth",
  "pretoria",
  "soweto",
  "vereeniging",
];

/** The four page names that existed under every country and location. */
const legacyRegionPages: { file: string; destination: string }[] = [
  { file: "Black_Belt.html", destination: "/courses/dmaic-black-belt-classroom" },
  { file: "Green_Belt.html", destination: "/courses/core-green-belt-classroom" },
  { file: "Yellow_Belt.html", destination: "/courses/yellow-belt-classroom" },
  { file: "six-sigma-courses.html", destination: "/courses" },
];

/**
 * The pre-WordPress static site organised the same catalogue by region, as
 * /kenya/Black_Belt.html and /locations/durban/Green_Belt.html. Countries are
 * listed explicitly rather than matched with a parameter, so that a future
 * /courses/Black_Belt.html cannot be swallowed by the same rule.
 */
function buildRegionPageRedirects() {
  const redirects: {
    source: string;
    destination: string;
    permanent: boolean;
  }[] = [];

  for (const country of legacyCountries) {
    for (const { file, destination } of legacyRegionPages) {
      redirects.push({
        source: `/${country}/${file}`,
        destination,
        permanent: true,
      });
    }
    // Some countries were also linked without a page, e.g. /malawi.
    redirects.push({
      source: `/${country}`,
      destination: "/courses",
      permanent: true,
    });
  }

  for (const place of legacyLocations) {
    for (const { file, destination } of legacyRegionPages) {
      const city = place.replace(/_/g, "-");
      redirects.push({
        source: `/locations/${place}/${file}`,
        destination: cityLandingPages.includes(city)
          ? `/courses/in/${city}`
          : destination,
        permanent: true,
      });
    }
  }

  return redirects;
}

/**
 * Course-schedule, informational and business-skills pages from the
 * pre-WordPress static site, plus the WordPress leftovers that still have an
 * honest destination.
 *
 * Business-skills courses are not a Six Sigma offer and never were — they were
 * 2KO Africa's, and 2KO still sells training. Those cross the domain rather
 * than land on a course catalogue that cannot serve them.
 */
const TRAINING = "https://www.2ko.co.za/training";

const legacyPageRedirects: Record<string, string> = {
  // Schedules — the new site has one canonical page for all of them.
  "/Six_Sigma_Course_Schedule.html": "/schedule",
  "/Six_Sigma_Course_Schedule_2020.html": "/schedule",
  "/Six_Sigma_Course_Schedule_2020_OL.html": "/schedule",
  "/Six_Sigma_Course_Schedule_2020_VT.html": "/schedule",
  "/Six_Sigma_Course_Schedule_OL.html": "/schedule",
  "/Six_Sigma_Course_Schedule_VT.html": "/schedule",
  "/schedule 2017.html": "/schedule",
  "/schedule 2018.html": "/schedule",
  "/schedule_2019.html": "/schedule",
  "/schedule_online_July_Sep_2019.html": "/schedule",
  "/events": "/schedule",
  "/google-calendar": "/schedule",

  // Accreditation, and the delegate wall of fame that sat beside it.
  "/accreditations": "/accreditation",
  "/accreditations.html": "/accreditation",
  "/Application_for_Accreditation.html": "/accreditation",
  "/DmaicCertification.html": "/accreditation",
  "/LeanCertification.html": "/accreditation",
  "/master-black-belt-registration.html": "/accreditation",
  "/six-sigma-southafrica-wall-of-fame.html": "/accreditation",

  // Courses, by their pre-WordPress filenames.
  "/Black_Belt.html": "/courses/dmaic-black-belt-classroom",
  "/Black_Belt_DMAIC.html": "/courses/dmaic-black-belt-classroom",
  "/Six Sigma White Belt.html": "/courses/white-belt-classroom",
  "/onlinewhiteBeltTraining.html": "/courses/white-belt-online",
  "/onlineyellowBeltTraining.html": "/courses/yellow-belt-online",
  "/onlineblackBelt MinitabTraining.html": "/courses/dmaic-black-belt-online",
  "/onlinegreenBelt MinitabTraining.html": "/courses/dmaic-green-belt-online",
  "/Minitab_Certified_Training.html": "/courses/dmaic-black-belt-online",
  "/minitab-companion.html": "/courses",
  "/Lean_Level_1.html": "/courses/lean-green-belt-classroom",
  "/Lean_Fundamentals_Level_2.html": "/courses/lean-green-belt-classroom",
  "/Lean_Methodology_Tools.html": "/courses/lean-green-belt-classroom",
  "/Lean_IT_Online.html": "/courses/lean-green-belt-online",
  "/lean_six_sigma_it_training.html": "/courses",
  "/lean-six-sigma-it-training": "/courses",
  "/lean_office_and_service_course.html": "/courses",
  "/lean-office-service": "/courses",
  "/lean_product_development.html": "/courses",
  "/lean-product-development": "/courses",
  "/Design-Six_Sigma_Online.html": "/courses",
  "/designforsixsigma.html": "/courses",
  "/deisgnforsixsigma.html": "/courses",
  "/design-for-six-sigma": "/courses",
  "/six_sigma_champion_course.html": "/courses",
  "/six-sigma-champion": "/courses",
  "/Six_Sigma_Green_Process_Management_Online.html": "/courses",
  "/six_sigma_green_process_management.html": "/courses",
  "/green-process-management": "/courses",
  "/sixSigmaTraining.html": "/courses",
  "/specialcombo.html": "/courses",
  "/toyota-kata": "/courses/kaizen-classroom",
  "/statistics": "/courses",
  "/statistics-courses": "/courses",
  "/online-courses/2ko-six-sigma-white-belt-online-course": "/courses/white-belt-online",
  "/opex": "/services",
  "/pricing": "/courses",
  "/which-course-3": "/courses",
  "/courses-4": "/courses",
  "/virtual_training.html": "/courses",
  "/locations.html": "/courses",
  "/south-african-cities": "/courses",
  "/countries": "/courses",
  "/search.html": "/courses",

  // Informational pages. None of these sell anything; they explained why the
  // method works, which is what /training-benefits does now.
  "/what-is-six-sigma": "/training-benefits",
  "/six-sigma-principles": "/training-benefits",
  "/six-sigma-principles.html": "/training-benefits",
  "/six-sigma-vs-lean-six-sigma-whats-the-difference": "/training-benefits",
  "/difference-between-DMAIC-six-sigma-and-lean.html": "/training-benefits",
  "/difference-between-minitab-and-sigmaxl.html": "/training-benefits",
  "/analyze_data.html": "/training-benefits",
  "/business_process_improvement.html": "/training-benefits",
  "/business_profitability.html": "/training-benefits",
  "/continuous_improvement.html": "/training-benefits",
  "/customer_value.html": "/training-benefits",
  "/eliminating_waste.html": "/training-benefits",
  "/value_stream_mapping.html": "/training-benefits",
  "/lean-six-sigma": "/training-benefits",

  // Corporate.
  "/about.html": "/about",
  "/staff.html": "/about",
  "/clients.html": "/about",
  "/news.html": "/about",
  "/contact-us": "/contact",
  "/need-help": "/contact",
  "/forum": "/contact",
  "/discussion-board": "/contact",
  "/detailed-assessment-tool-2": "/contact",
  "/faq.html": "/faqs",
  "/privacy.html": "/contact",
  "/booking_online_sixsigma.html": "/contact",
  "/online-black-belt-payment.html": "/contact",
  "/online-black-belt-minitab-payment.html": "/contact",

  // 2KO Africa business-skills courses. Not a Six Sigma offer; 2KO still runs
  // training, so these cross to the umbrella site rather than dead-end here.
  "/Advanced-Skills-for-Executive-Secretaries-and-Personal-Assistants.html": TRAINING,
  "/Budgeting-and-financial-management-public-sector.html": TRAINING,
  "/Internal-auditing-for-governments.html": TRAINING,
  "/Introduction to Public Relations, Communication and Media Studies.html": TRAINING,
  "/LogisticsSupplyChainManagement.html": TRAINING,
  "/Performance-management-and-development.html": TRAINING,
  "/Procurement-logistics-and-materials-management.html": TRAINING,
  "/Procurement-management-of-goods-and-services.html": TRAINING,
  "/budgeting-financial-management": TRAINING,
  "/change-management": TRAINING,
  "/education-management-information-systememis": TRAINING,
  "/excel-courses": TRAINING,
  "/financial-management": TRAINING,
  "/principles-of-management": TRAINING,
  "/procurement-logistics": TRAINING,
  "/project-management": TRAINING,
  "/web-design": "https://www.2ko.co.za/websites",
  "/seo": "https://www.2ko.co.za/websites",

  // Bare belt slugs. Four of these already resolved and four did not, which
  // looked like an oversight rather than a decision: all eight were real pages.
  "/white-belt": "/courses/white-belt-classroom",
  "/green-belt": "/courses/core-green-belt-classroom",
  "/dmaic-green-belt": "/courses/dmaic-green-belt-classroom",
  "/dmaic-black-belt": "/courses/dmaic-black-belt-classroom",
  "/lean-green-belt": "/courses/lean-green-belt-classroom",

  // The old site spun one page per subject across every city into a single
  // title. Only the subject carries intent.
  "/lean-six-sigma-it-training-in-cape-town-johannesburg-and-other-parts-of-south-africa": "/courses",
  "/toyota-kata-in-cape-town-johannesburg-and-other-parts-of-south-africa": "/courses/kaizen-classroom",

  "/What Your Company Can Expect.html": "/training-benefits",
  "/Why Choose 2KO As Your Training Provider.html": "/training-benefits",
  "/locations/six-sigma-courses-SA.html": "/courses",
  "/2ko-offices-1": "/contact",
};

/**
 * WordPress tag archives. Each named a belt, so each still carries the intent
 * even though the archive itself is gone.
 */
const legacyTagRedirects: Record<string, string> = {
  "black-belt": "/courses/dmaic-black-belt-classroom",
  "black-belt-dmaic": "/courses/dmaic-black-belt-classroom",
  "dmaic-green-belt": "/courses/dmaic-green-belt-classroom",
  "green-belt": "/courses/core-green-belt-classroom",
  "green-belt-dmaic": "/courses/dmaic-green-belt-classroom",
  "lean-black-belt": "/courses/lean-black-belt-classroom",
  "lean-green-belt": "/courses/lean-green-belt-classroom",
  "lean_green_belt": "/courses/lean-green-belt-classroom",
  "yellow-belt": "/courses/yellow-belt-classroom",
  "white-belt": "/courses/white-belt-classroom",
  angola: "/courses",
  "microsoft-courses": TRAINING,
};

function buildLegacyPageRedirects() {
  const redirects: {
    source: string;
    destination: string;
    permanent: boolean;
  }[] = [];

  for (const [source, destination] of Object.entries(legacyPageRedirects)) {
    redirects.push({ source, destination, permanent: true });
  }
  for (const [tag, destination] of Object.entries(legacyTagRedirects)) {
    redirects.push({ source: `/tag/${tag}`, destination, permanent: true });
  }

  // Delegate certificate pages — one per accredited person, all now covered by
  // the accreditation page. A parameter avoids listing sixteen names here.
  redirects.push(
    { source: "/Accredited_:name.html", destination: "/accreditation", permanent: true },
    // Dated instructor-led sessions from the events calendar.
    { source: "/event/:slug", destination: "/schedule", permanent: true },
    { source: "/event/:slug/:rest*", destination: "/schedule", permanent: true },
  );

  // "/six-sigma-{place}" landing pages. The specific non-place pages that share
  // this prefix are in legacyPageRedirects above and are emitted first, so the
  // catch-all cannot swallow them.
  for (const city of cityLandingPages) {
    redirects.push({
      source: `/six-sigma-${city}`,
      destination: `/courses/in/${city}`,
      permanent: true,
    });
  }
  // WordPress numbered every duplicate it made of the same page.
  redirects.push({ source: "/need-help-:n", destination: "/contact", permanent: true });

  redirects.push({ source: "/six-sigma-:place", destination: "/courses", permanent: true });

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

      // Misc legacy WordPress assets
      // (No /Accreditation case-fix redirect: Vercel matches sources
      // case-insensitively, so /Accreditation → /accreditation would
      // also match /accreditation and create an infinite redirect loop.)
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

      /* ---------------------------------------------------------------- *
       * Geography and legacy-page redirects.
       *
       * Deliberately last. Every rule above is an explicit decision made
       * earlier, and these end in catch-alls broad enough to swallow them:
       * "/green-belt-:place" matches "/green-belt-booking-form", which belongs
       * at /contact rather than on a course page. Rules are first-match, so
       * putting these at the end means a specific decision always wins.
       *
       * Within this block order still matters — the belt-plus-place rules
       * precede "/six-sigma-:place", or "/six-sigma-white-belt-durban" would
       * match the catch-all with place="white-belt-durban" and lose the belt.
       * ---------------------------------------------------------------- */
      ...buildBeltPlaceRedirects(),
      ...buildRegionPageRedirects(),
      ...buildLegacyPageRedirects(),
    ];
  },
};

export default nextConfig;
