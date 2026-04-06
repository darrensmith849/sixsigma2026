import type { CalendarEvent } from "@/lib/calendar";

const modeBadge: Record<string, string> = {
  Classroom: "bg-green/10 text-green",
  Virtual: "bg-blue-500/10 text-blue-600",
  Online: "bg-amber-500/10 text-amber-600",
};

function formatTime(dt?: string): string {
  if (!dt) return "";
  return new Date(dt).toLocaleTimeString("en-ZA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatDateRange(event: CalendarEvent): string {
  if (event.isAllDay && !event.isMultiDay) return "All day";
  if (event.isAllDay && event.isMultiDay) {
    const start = new Date(event.startDate).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
    });
    // End is exclusive for all-day, subtract 1 day
    const endDate = new Date(event.endDate);
    endDate.setDate(endDate.getDate() - 1);
    const end = endDate.toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
    });
    return `${start} – ${end}`;
  }
  if (event.startDateTime && event.endDateTime) {
    return `${formatTime(event.startDateTime)} – ${formatTime(event.endDateTime)}`;
  }
  return "";
}

export default function CalendarDayDetail({
  events,
  dateStr,
  onClose,
}: {
  events: CalendarEvent[];
  dateStr: string;
  onClose: () => void;
}) {
  const dateLabel = new Date(dateStr + "T00:00:00").toLocaleDateString(
    "en-ZA",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <div className="bg-white rounded-lg border border-border-grey p-5 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-heading font-semibold text-[17px]">{dateLabel}</h3>
        <button
          onClick={onClose}
          className="text-muted hover:text-heading transition-colors p-1"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {events.length === 0 ? (
        <p className="text-muted text-[15px]">No events on this day.</p>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 p-3 bg-light-grey rounded-lg"
            >
              <div className="w-1 self-stretch rounded-full bg-green shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-heading font-medium text-[15px] leading-snug">
                  {event.title}
                </p>
                <p className="text-muted text-[13px] mt-1">
                  {formatDateRange(event)}
                </p>
                {event.location && (
                  <p className="text-muted text-[13px] mt-0.5">
                    {event.location}
                  </p>
                )}
                {event.mode && (
                  <span
                    className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full mt-1.5 ${modeBadge[event.mode]}`}
                  >
                    {event.mode}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
