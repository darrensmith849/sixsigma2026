import { ImageResponse } from "next/og";
import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/seo-kit/og-template";
import { courses, getCourse } from "./courseData";

export const runtime = "nodejs";
export const alt = "Six Sigma course at Six Sigma South Africa";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Generate one image per course at build time. Same params as the page itself.
export function generateImageMetadata() {
  return courses.map((c) => ({
    id: c.slug,
    alt: `${c.title} — Six Sigma South Africa`,
  }));
}

export default async function CourseOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) {
    // Fallback to the default card if someone hits an unknown slug.
    return new ImageResponse(
      <OgCard title="Six Sigma South Africa" badge="CSSC · USA" />,
      OG_SIZE,
    );
  }
  return new ImageResponse(
    (
      <OgCard
        eyebrow={`${course.topic} · ${course.mode}`}
        title={course.topic}
        subtitle={`${course.duration} · ${course.level} · ${course.mode} delivery`}
        badge="CSSC Accredited"
      />
    ),
    OG_SIZE,
  );
}
