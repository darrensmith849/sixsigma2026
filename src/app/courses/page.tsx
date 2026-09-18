import type { Metadata } from "next";
import CoursesClient from "@/components/CoursesClient";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import BreadcrumbsJsonLd from "@/seo-kit/schema/breadcrumbs";
import { buildFaqSchema } from "@/seo-kit/schema/faq";
import BeltComparison, { COMPARISON_FAQS } from "@/components/courses/BeltComparison";
import { courses } from "./[slug]/courseData";

/**
 * Titled for the decision, not the category. "Six Sigma Courses in South
 * Africa" put this page in a fight with the homepage, which ranks 2.1 for
 * "six sigma" and 1.5 for "six sigma certification" against this page's 8.8
 * and 2.5 — and the duplicate converted the overlap at 0.5%. Comparison
 * queries are this page's to win and nothing else on the site targets them.
 */
export const metadata: Metadata = buildMetadata({
  title: `Compare Six Sigma Belts — Which Course Should You Do? | ${SITE_NAME}`,
  description:
    "White Belt to Black Belt compared side by side: level, duration, prerequisites and what each belt qualifies you to do. CSSC-accredited, online, virtual or classroom in South Africa.",
  path: "/courses",
});

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: courses.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/courses/${c.slug}`,
    name: c.title,
  })),
};

// Reading `searchParams` opts this page into dynamic rendering when ?q= is
// present, but Next.js still statically prerenders the param-less version. So
// crawlers hitting /courses get the full course list in the HTML, and users
// arriving via the WebSite SearchAction (/courses?q=green) get filtered
// results — also fully SSR-rendered, so AI crawlers see the filter too.
export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <BreadcrumbsJsonLd
        siteUrl={SITE_URL}
        crumbs={[
          { name: "Home", url: "/" },
          { name: "Courses", url: "/courses" },
        ]}
      />
      <JsonLd data={buildFaqSchema(COMPARISON_FAQS)} />
      <CoursesClient initialQuery={q ?? ""} comparison={<BeltComparison />} />
    </>
  );
}
