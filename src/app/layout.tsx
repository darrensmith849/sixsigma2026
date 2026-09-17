import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, buildMetadata } from "@/lib/seo";
import {
  buildOrganizationSchema,
  buildEducationalOrganizationSchema,
} from "@/seo-kit/schema/organization";
import { buildWebsiteSchema } from "@/seo-kit/schema/website";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: `Six Sigma Courses South Africa | Training & Certification | ${SITE_NAME}`,
    description:
      "Six Sigma South Africa — the premier provider of Six Sigma training and certification on the African continent. Internationally accredited lean courses through CSSC (USA).",
    path: "/",
  }),
};

/**
 * `sameAs` is the highest-leverage AI-entity binding field. Add verified URLs
 * that identify Six Sigma South Africa / 2KO Africa CC on other authoritative
 * sites. Empty entries are intentionally omitted — 404s degrade trust.
 *
 * TODO (user-supplied):
 *   - LinkedIn company page (e.g. https://www.linkedin.com/company/six-sigma-south-africa/)
 *   - CSSC accredited-provider profile (https://www.sixsigmacouncil.org/...)
 *   - MICT SETA / SAQA provider listing
 *   - Wikidata entity (create in Phase D.2, then add the Q-ID URL)
 *   - YouTube / Facebook / X channels if active
 */
const SAME_AS: string[] = [
  // Populate with verified URLs only.
];

const ORG_DESCRIPTION =
  "Six Sigma South Africa is the premier provider of internationally accredited Six Sigma training and certification on the African continent.";

const organizationJsonLd = buildOrganizationSchema({
  name: SITE_NAME,
  url: SITE_URL,
  logoUrl: `${SITE_URL}/images/sssa-logo-full.jpg`,
  description: ORG_DESCRIPTION,
  sameAs: SAME_AS,
  contactPoint: {
    telephone: "+27-21-527-0065",
    email: "info@2ko.co.za",
    contactType: "customer service",
    areaServed: "ZA",
    availableLanguage: "en",
  },
});

const localBusinessJsonLd = buildEducationalOrganizationSchema({
  name: SITE_NAME,
  url: SITE_URL,
  logoUrl: `${SITE_URL}/images/sssa-logo-full.jpg`,
  description: ORG_DESCRIPTION,
  telephone: "+27-21-527-0065",
  email: "info@2ko.co.za",
  areaServed: [
    "Johannesburg",
    "Cape Town",
    "Durban",
    "Pretoria",
    "Port Elizabeth",
    "South Africa",
  ],
  addressCountry: "ZA",
  sameAs: SAME_AS,
  hasCredential: [
    {
      name: "Council for Six Sigma Certification (CSSC) accredited training provider",
      credentialCategory: "Accreditation",
      recognizedBy: {
        name: "Council for Six Sigma Certification",
        url: "https://www.sixsigmacouncil.org/",
      },
    },
    {
      name: "MICT SETA accredited training provider (Unit Standard 243816, accreditation #2007/01/215)",
      credentialCategory: "Accreditation",
      recognizedBy: {
        name: "Media, Information and Communication Technologies SETA",
      },
    },
  ],
});

const websiteJsonLd = buildWebsiteSchema({
  name: SITE_NAME,
  url: SITE_URL,
  searchUrlPattern: `${SITE_URL}/courses?q={search_term_string}`,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <JsonLd data={[organizationJsonLd, localBusinessJsonLd, websiteJsonLd]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <GoogleAnalytics gaId="G-NLFDVKD836" />
      </body>
    </html>
  );
}
