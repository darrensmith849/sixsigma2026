import { ImageResponse } from "next/og";
import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/seo-kit/og-template";

export const runtime = "nodejs";
export const alt = "Six Sigma South Africa — CSSC-accredited training";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Internationally accredited"
        title="Six Sigma South Africa"
        subtitle="White, Yellow, Green and Black Belt training — classroom, virtual, online — across Johannesburg, Cape Town, Durban, Pretoria and Port Elizabeth."
        badge="CSSC · USA"
      />
    ),
    OG_SIZE,
  );
}
