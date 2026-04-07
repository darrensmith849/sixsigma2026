import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sixsigmasouthafrica.co.za";

export const SITE_NAME = "Six Sigma South Africa";

export const DEFAULT_OG_IMAGE = "/images/hero-presentation.jpg";

interface BuildMetadataArgs {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: BuildMetadataArgs): Metadata {
  const url = `${SITE_URL}${path}`;
  const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_ZA",
      images: [{ url: absoluteImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
  };
}
