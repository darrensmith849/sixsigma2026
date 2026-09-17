/**
 * Upcoming course session calendar.
 *
 * STATUS: empty by default — populate with real upcoming sessions to unlock
 * structured Event / CourseInstance schema on /schedule and on each course
 * detail page. AI engines surface concrete date-specific answers ("when can I
 * do Green Belt classroom training in Cape Town?") from this data.
 *
 * Required per row:
 *   - courseSlug          must match a slug in courses[] (see courseData.ts)
 *   - city                one of the city slugs from cityData.ts, or "online"
 *   - startDate           ISO 8601 date or datetime
 *   - endDate             ISO 8601 date or datetime
 *
 * Optional:
 *   - instructorSlug      must match a slug in instructors[] (links Person)
 *   - seatsAvailable      integer; renders availability cue, drives Offer.availability
 *   - location            free-text venue/address if non-default
 *
 * As soon as this array has >= 1 entry:
 *   - /schedule renders a real session table (replaces the abstract city cards)
 *   - Each session emits Event JSON-LD on /schedule
 *   - The matching course detail page picks up a dated CourseInstance
 *
 * When a session date passes, leave it in or remove it — entries with endDate
 * in the past are filtered out automatically by getUpcomingSessions().
 */

export interface Session {
  courseSlug: string;
  city: string;
  startDate: string;
  endDate: string;
  instructorSlug?: string;
  seatsAvailable?: number;
  location?: string;
}

export const sessions: Session[] = [
  // Populate with real upcoming sessions. Example shape (DO NOT SHIP):
  //
  // {
  //   courseSlug: "dmaic-green-belt-classroom",
  //   city: "johannesburg",
  //   startDate: "2026-07-13",
  //   endDate: "2026-07-17",
  //   instructorSlug: "jane-doe",
  //   seatsAvailable: 12,
  // },
];

/** Return upcoming sessions (endDate >= today). */
export function getUpcomingSessions(now: Date = new Date()): Session[] {
  const today = now.toISOString().slice(0, 10);
  return sessions
    .filter((s) => s.endDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

/** All sessions for a given course slug (upcoming only). */
export function getSessionsForCourse(courseSlug: string): Session[] {
  return getUpcomingSessions().filter((s) => s.courseSlug === courseSlug);
}
