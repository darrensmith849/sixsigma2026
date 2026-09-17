import { ImageResponse } from "next/og";
import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/seo-kit/og-template";
import { instructors, getInstructor } from "@/data/instructors";

export const runtime = "nodejs";
export const alt = "Six Sigma South Africa — Instructor profile";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateImageMetadata() {
  return instructors.map((p) => ({
    id: p.slug,
    alt: `${p.name} — Six Sigma South Africa`,
  }));
}

export default async function InstructorOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getInstructor(slug);
  if (!p) {
    return new ImageResponse(
      <OgCard title="Six Sigma South Africa" badge="CSSC · USA" />,
      OG_SIZE,
    );
  }
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Our team"
        title={p.name}
        subtitle={`${p.jobTitle} · ${p.yearsExperience}+ years experience`}
        badge="CSSC Accredited"
      />
    ),
    OG_SIZE,
  );
}
