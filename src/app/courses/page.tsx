import type { Metadata } from "next";
import CoursesClient from "@/components/CoursesClient";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
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

export default function CoursesPage() {
  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <CoursesClient />
    </>
  );
}
