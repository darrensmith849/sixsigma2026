/**
 * Event JSON-LD for scheduled training sessions.
 *
 * Use alongside (not instead of) Course schema. Course describes the
 * generic offering; Event describes a specific dated instance. Both can
 * coexist — engines may surface Course in topic queries and Event in
 * "when can I do X" queries.
 *
 * For an in-person training session prefer `EducationEvent`. Schema.org's
 * `eventAttendanceMode` keywords cover Online/Offline/Mixed.
 */
import type { JsonLdObject } from "../types";

export type EventAttendanceMode =
  | "OfflineEventAttendanceMode"
  | "OnlineEventAttendanceMode"
  | "MixedEventAttendanceMode";

export interface EventSchemaInput {
  name: string;
  description?: string;
  /** Canonical URL (the course detail page is usually the right target). */
  url: string;
  startDate: string; // ISO
  endDate: string; // ISO
  attendanceMode: EventAttendanceMode;
  organizer: JsonLdObject;
  location?: {
    name: string;
    addressLocality?: string;
    addressRegion?: string;
    addressCountry?: string;
    virtual?: boolean;
  };
  /** Optional Person sub-graph (or @id ref). */
  performer?: JsonLdObject;
  image?: string;
  inLanguage?: string;
}

export function buildEventSchema(input: EventSchemaInput): JsonLdObject {
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: input.name,
    startDate: input.startDate,
    endDate: input.endDate,
    eventAttendanceMode: `https://schema.org/${input.attendanceMode}`,
    eventStatus: "https://schema.org/EventScheduled",
    url: input.url,
    organizer: input.organizer,
    inLanguage: input.inLanguage ?? "en",
  };
  if (input.description) schema.description = input.description;
  if (input.image) schema.image = input.image;
  if (input.performer) schema.performer = input.performer;
  if (input.location) {
    if (input.location.virtual) {
      schema.location = {
        "@type": "VirtualLocation",
        url: input.url,
      };
    } else {
      schema.location = {
        "@type": "Place",
        name: input.location.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: input.location.addressLocality,
          addressRegion: input.location.addressRegion,
          addressCountry: input.location.addressCountry ?? "ZA",
        },
      };
    }
  }
  return schema;
}
