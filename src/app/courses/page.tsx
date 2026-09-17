import type { Metadata } from "next";
import CoursesClient from "@/components/CoursesClient";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import BreadcrumbsJsonLd from "@/seo-kit/schema/breadcrumbs";
import { courses } from "./[slug]/courseData";

export const metadata: Metadata = buildMetadata({
  title: `Six Sigma Courses in South Africa | ${SITE_NAME}`,
  description:
    "Internationally accredited Six Sigma courses in South Africa. White Belt, Yellow Belt, Green Belt, Black Belt certification training available online, virtually, and in the classroom.",
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
      <CoursesClient initialQuery={q ?? ""} />
    </>
  );
}
