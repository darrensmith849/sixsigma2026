/**
 * /llms.txt — curated index for LLM agents.
 *
 * Served at the site root so answer-engine crawlers can discover the highest-
 * value pages without scraping the whole sitemap. Grouped by topic (not 30
 * course SKUs) for readability.
 */
import { generateLlmsTxt } from "@/seo-kit/llms";
import type { LlmsSection } from "@/seo-kit/llms";
import { courses } from "../courses/[slug]/courseData";
import { cities } from "../courses/in/[city]/cityData";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sixsigmasouthafrica.co.za";

// Content is derived from in-repo data — render once at build time and cache
// at the edge. Same posture as /robots.txt and /sitemap.xml.
export const dynamic = "force-static";

const SUMMARY =
  "Internationally accredited Six Sigma training and certification across South Africa — classroom in Johannesburg, Cape Town, Durban, Pretoria and Port Elizabeth; virtual and self-paced online; on-site at client premises nationwide. Certifications issued through the Council for Six Sigma Certification (CSSC, USA).";

const INTRO =
  "Six Sigma South Africa (operated by 2KO Africa CC, established 2005) is the largest provider of CSSC-accredited Six Sigma training on the African continent. The site catalogues every belt level (White, Yellow, Green, Black) plus Lean and short courses (5S, Kaizen, Root Cause Analysis), in three delivery modes, with full curricula, durations and CSSC accreditation details.";

export async function GET(): Promise<Response> {
  const sections: LlmsSection[] = [
    {
      title: "Core pages",
      entries: [
        {
          title: "Home",
          url: "/",
          description:
            "Overview of Six Sigma South Africa, accreditations, cities served.",
        },
        {
          title: "About",
          url: "/about",
          description:
            "History (established 2005), mission, accreditation, results.",
        },
        {
          title: "Accreditation",
          url: "/accreditation",
          description:
            "Full details of CSSC USA and MICT SETA accreditation (Unit Standard 243816, accreditation #2007/01/215).",
        },
        {
          title: "Services",
          url: "/services",
          description:
            "Consultancy, process improvement, quality management, project management, eLearning, corporate training.",
        },
        {
          title: "Training benefits",
          url: "/training-benefits",
          description: "Business outcomes from Six Sigma training.",
        },
        {
          title: "Schedule",
          url: "/schedule",
          description: "Where and when courses run; on-site availability.",
        },
        {
          title: "FAQs",
          url: "/faqs",
          description: "Common questions about belts, duration, delivery and software.",
        },
        {
          title: "Contact",
          url: "/contact",
          description: "Enquiry form, phone and email.",
        },
        {
          title: "Brochure",
          url: "/brochure",
          description: "Request the printable course brochure.",
        },
      ],
    },
    {
      title: "Courses — by topic",
      entries: buildTopicEntries(),
    },
    {
      title: "Locations",
      entries: cities.map((c) => ({
        title: `${c.name} — Six Sigma training`,
        url: `/courses/in/${c.slug}`,
        description: c.shortIntro,
      })),
    },
    {
      title: "Reference",
      entries: [
        {
          title: "Full course index",
          url: "/courses",
          description: "Every course (10 topics × 3 modes = 30 SKUs).",
        },
        {
          title: "XML sitemap",
          url: "/sitemap.xml",
          description: "Machine-readable index of every page.",
        },
      ],
    },
  ];

  const body = generateLlmsTxt({
    siteName: "Six Sigma South Africa",
    siteUrl: SITE_URL,
    summary: SUMMARY,
    intro: INTRO,
    sections,
  });

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Cache for an hour at the edge; content only changes on deploy.
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

/**
 * Group the flat courses[] array by topic, emitting one entry per topic with
 * a short list of available modes appended to the description. Keeps llms.txt
 * scannable instead of dumping 30 SKU links.
 */
function buildTopicEntries() {
  const byTopic = new Map<
    string,
    { topic: string; topicSlug: string; modes: string[]; summary: string }
  >();
  for (const c of courses) {
    if (!byTopic.has(c.topicSlug)) {
      byTopic.set(c.topicSlug, {
        topic: c.topic,
        topicSlug: c.topicSlug,
        modes: [],
        summary: c.summary,
      });
    }
    byTopic.get(c.topicSlug)!.modes.push(c.mode);
  }
  return Array.from(byTopic.values()).map((t) => ({
    title: `${t.topic}`,
    // Link to the most common / canonical mode (classroom) as the topic landing.
    // Other modes are listed at /courses.
    url: `/courses/${t.topicSlug}-classroom`,
    description: `${t.summary} Available in: ${t.modes.join(", ")}.`,
  }));
}
