import type { Metadata } from "next";
import { resolve } from "node:path";
import { readLastmodCache } from "@/seo-kit/lastmod";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sixsigmasouthafrica.co.za";

export const SITE_NAME = "Six Sigma South Africa";

export const DEFAULT_OG_IMAGE = "/og-image.jpg";

/**
 * Canonical publisher/author reference for Article-style schemas. Must match
 * the Organization JSON-LD emitted from src/app/layout.tsx — same name, same
 * URL, same logo — so AI engines bind these as the same entity.
 */
export const PUBLISHER_ORG = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/sssa-logo-full.jpg`,
  },
};

/**
 * Cached at module load — populated by scripts/build-lastmod.ts (prebuild)
 * with git-derived ISO timestamps per route. Pages import LASTMOD_CACHE and
 * look up their own route to populate Article datePublished/dateModified.
 */
export const LASTMOD_CACHE = readLastmodCache(
  resolve(process.cwd(), "data/lastmod.json"),
);

/**
 * Fallback published date when a page has no git history yet (e.g. a brand-new
 * route on its first commit). Pick a date earlier than the site's relaunch
 * so it's never in the future. Updates here when a new evergreen page lands.
 */
export const SITE_LAUNCH_DATE = "2026-04-01T00:00:00Z";

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
