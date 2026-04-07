import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, buildMetadata } from "@/lib/seo";
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/sssa-logo-full.jpg`,
  description:
    "Six Sigma South Africa is the premier provider of internationally accredited Six Sigma training and certification on the African continent.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+27-21-426-5300",
    email: "info@2ko.co.za",
    contactType: "customer service",
    areaServed: "ZA",
    availableLanguage: "en",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/sssa-logo-full.jpg`,
  telephone: "+27-21-426-5300",
  email: "info@2ko.co.za",
  areaServed: [
    "Johannesburg",
    "Cape Town",
    "Durban",
    "Pretoria",
    "Port Elizabeth",
    "South Africa",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "ZA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <JsonLd data={[organizationJsonLd, localBusinessJsonLd]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <GoogleAnalytics gaId="G-NLFDVKD836" />
      </body>
    </html>
  );
}
