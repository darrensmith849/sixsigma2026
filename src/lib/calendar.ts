// ─── Calendar Event Types ───────────────────────────────────────

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string; // "2026-04-15"
  endDate: string; // "2026-04-17" (exclusive for all-day)
  startDateTime?: string;
  endDateTime?: string;
  isAllDay: boolean;
  isMultiDay: boolean;
  location: string;
  mode: "Classroom" | "Virtual" | "Online" | null;
}

interface GoogleCalendarEvent {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  start: { date?: string; dateTime?: string };
  end: { date?: string; dateTime?: string };
  status: string;
}

interface GoogleCalendarResponse {
  items?: GoogleCalendarEvent[];
}

// ─── Helpers ────────────────────────────────────────────────────

function extractMode(
  text: string
): "Classroom" | "Virtual" | "Online" | null {
  const lower = text.toLowerCase();
  if (lower.includes("classroom") || lower.includes("instructor")) return "Classroom";
  if (lower.includes("virtual")) return "Virtual";
  if (lower.includes("online")) return "Online";
  return null;
}

function toDateString(iso: string): string {
  return iso.slice(0, 10);
}

function transformEvent(raw: GoogleCalendarEvent): CalendarEvent {
  const isAllDay = !!raw.start.date;

  const startDate = isAllDay
    ? raw.start.date!
    : toDateString(raw.start.dateTime!);
  const endDate = isAllDay
    ? raw.end.date!
    : toDateString(raw.end.dateTime!);

  const isMultiDay = isAllDay
    ? new Date(endDate).getTime() - new Date(startDate).getTime() > 86400000
    : startDate !== endDate;

  const title = raw.summary ?? "Untitled Event";
  const description = raw.description ?? "";
  const combined = `${title} ${description} ${raw.location ?? ""}`;

  return {
    id: raw.id,
    title,
    description,
    startDate,
    endDate,
    startDateTime: raw.start.dateTime,
    endDateTime: raw.end.dateTime,
    isAllDay,
    isMultiDay,
    location: raw.location ?? "",
    mode: extractMode(combined),
  };
}

// ─── Fetch Events ───────────────────────────────────────────────

const CALENDAR_ID = "sixsigmasouthafrica@gmail.com";

export async function getCalendarEvents(
  year: number,
  month: number
): Promise<CalendarEvent[]> {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  if (!apiKey) {
    console.error("GOOGLE_CALENDAR_API_KEY not set");
    return [];
  }

  const timeMin = new Date(year, month - 1, 1).toISOString();
  const timeMax = new Date(year, month + 1, 1).toISOString();

  const params = new URLSearchParams({
    key: apiKey,
    timeMin,
    timeMax,
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "250",
    timeZone: "Africa/Johannesburg",
  });

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      console.error(`Calendar API error: ${res.status}`);
      return [];
    }

    const data: GoogleCalendarResponse = await res.json();
    return (data.items ?? [])
      .filter((e) => e.status !== "cancelled")
      .map(transformEvent);
  } catch (err) {
    console.error("Calendar fetch failed:", err);
    return [];
  }
}

// ─── Date Utilities ─────────────────────────────────────────────

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/** 0 = Monday … 6 = Sunday */
export function getFirstDayOfWeek(year: number, month: number): number {
  const day = new Date(year, month - 1, 1).getDay();
  return day === 0 ? 6 : day - 1; // convert Sun=0 to Mon-based
}

export function isSameDay(a: string, b: string): boolean {
  return a.slice(0, 10) === b.slice(0, 10);
}

export function formatMonthYear(year: number, month: number): string {
  return new Date(year, month - 1).toLocaleString("en-ZA", {
    month: "long",
    year: "numeric",
  });
}

/** Check if a date string falls within an event's range */
export function eventCoversDate(event: CalendarEvent, dateStr: string): boolean {
  const d = dateStr;
  if (event.isAllDay) {
    // All-day end date is exclusive in Google Calendar
    return d >= event.startDate && d < event.endDate;
  }
  return d >= event.startDate && d <= event.endDate;
}
