import type { CalendarEvent } from "@/lib/calendar";
import CalendarEventPill from "./CalendarEventPill";

const MAX_VISIBLE = 2;

export default function CalendarDayCell({
  day,
  events,
  isCurrentMonth,
  isToday,
  isSelected,
  onSelect,
}: {
  day: number;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const overflow = events.length - MAX_VISIBLE;

  return (
    <button
      onClick={onSelect}
      className={`
        relative min-h-[80px] md:min-h-[100px] p-1.5 md:p-2 text-left border border-border-grey rounded-md transition-colors
        ${isCurrentMonth ? "bg-white" : "bg-light-grey/50"}
        ${isSelected ? "ring-2 ring-green" : ""}
        ${isCurrentMonth ? "hover:bg-green/5" : ""}
      `}
    >
      <span
        className={`
          inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 text-[13px] md:text-[14px] font-medium rounded-full
          ${isToday ? "bg-green text-white" : ""}
          ${!isToday && isCurrentMonth ? "text-heading" : ""}
          ${!isCurrentMonth ? "text-muted/40" : ""}
        `}
      >
        {day}
      </span>

      {/* Desktop: pills */}
      <div className="hidden md:flex flex-col gap-0.5 mt-1">
        {events.slice(0, MAX_VISIBLE).map((event) => (
          <CalendarEventPill key={event.id} event={event} />
        ))}
        {overflow > 0 && (
          <span className="text-[11px] text-muted pl-1">+{overflow} more</span>
        )}
      </div>

      {/* Mobile: dots */}
      {events.length > 0 && (
        <div className="flex md:hidden gap-0.5 mt-1 justify-center">
          {events.slice(0, 3).map((event) => (
            <CalendarEventPill key={event.id} event={event} compact />
          ))}
          {events.length > 3 && (
            <span className="text-[9px] text-muted">+{events.length - 3}</span>
          )}
        </div>
      )}
    </button>
  );
}
