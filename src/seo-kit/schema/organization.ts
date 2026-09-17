/**
 * Organization + EducationalOrganization JSON-LD builders.
 *
 * `sameAs` is the highest-leverage field for LLM entity binding — it connects
 * your brand to the broader entity graph (Wikidata, LinkedIn, accreditation
 * registries, Crunchbase). Always supply the canonical URLs you control.
 */
import type { JsonLdObject } from "../types";

export interface OrganizationConfig {
  name: string;
  url: string;
  logoUrl: string;
  description: string;
  /**
   * URLs that identify the same entity elsewhere on the web. LLMs use these
   * to anchor your brand to the entity graph (Wikidata, LinkedIn, accreditation
   * pages, Crunchbase, etc.). Verified URLs only — 404s degrade trust.
   */
  sameAs?: string[];
  contactPoint?: {
    telephone: string;
    email: string;
    contactType?: string;
    areaServed?: string;
    availableLanguage?: string;
  };
}

export interface EducationalOrganizationConfig extends OrganizationConfig {
  telephone: string;
  email: string;
  areaServed: string[];
  addressCountry: string;
  /** Optional accreditation credential references. */
  hasCredential?: Array<{
    name: string;
    credentialCategory?: string;
    recognizedBy?: { name: string; url?: string };
  }>;
}

export function buildOrganizationSchema(config: OrganizationConfig): JsonLdObject {
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.name,
    url: config.url,
    logo: config.logoUrl,
    description: config.description,
  };
  if (config.sameAs && config.sameAs.length > 0) {
    schema.sameAs = config.sameAs;
  }
  if (config.contactPoint) {
    schema.contactPoint = {
      "@type": "ContactPoint",
      telephone: config.contactPoint.telephone,
      email: config.contactPoint.email,
      contactType: config.contactPoint.contactType ?? "customer service",
      areaServed: config.contactPoint.areaServed ?? undefined,
      availableLanguage: config.contactPoint.availableLanguage ?? "en",
    };
  }
  return schema;
}

export function buildEducationalOrganizationSchema(
  config: EducationalOrganizationConfig,
): JsonLdObject {
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: config.name,
    url: config.url,
    logo: config.logoUrl,
    description: config.description,
    telephone: config.telephone,
    email: config.email,
    areaServed: config.areaServed,
    address: {
      "@type": "PostalAddress",
      addressCountry: config.addressCountry,
    },
  };
  if (config.sameAs && config.sameAs.length > 0) {
    schema.sameAs = config.sameAs;
  }
  if (config.hasCredential && config.hasCredential.length > 0) {
    schema.hasCredential = config.hasCredential.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      credentialCategory: c.credentialCategory,
      recognizedBy: c.recognizedBy
        ? {
            "@type": "Organization",
            name: c.recognizedBy.name,
            url: c.recognizedBy.url,
          }
        : undefined,
    }));
  }
  return schema;
}
