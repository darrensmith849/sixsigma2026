import { ImageResponse } from "next/og";
import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/seo-kit/og-template";
import { cities, getCity } from "./cityData";

export const runtime = "nodejs";
export const alt = "Six Sigma training city landing — Six Sigma South Africa";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateImageMetadata() {
  return cities.map((c) => ({
    id: c.slug,
    alt: `Six Sigma training in ${c.name}`,
  }));
}

export default async function CityOgImage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const found = getCity(city);
  if (!found) {
    return new ImageResponse(
      <OgCard title="Six Sigma South Africa" badge="CSSC · USA" />,
      OG_SIZE,
    );
  }
  return new ImageResponse(
    (
      <OgCard
        eyebrow={`${found.province} · CSSC accredited`}
        title={`Six Sigma training in ${found.name}`}
        subtitle="Classroom, virtual and on-site Six Sigma training with internationally accredited certificates."
        badge="CSSC · USA"
      />
    ),
    OG_SIZE,
  );
}
