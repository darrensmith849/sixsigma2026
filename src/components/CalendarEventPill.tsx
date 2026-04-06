import type { CalendarEvent } from "@/lib/calendar";

const modeColors: Record<string, string> = {
  Classroom: "bg-green text-white",
  Virtual: "bg-blue-500 text-white",
  Online: "bg-amber-500 text-white",
};

const modeDots: Record<string, string> = {
  Classroom: "bg-green",
  Virtual: "bg-blue-500",
  Online: "bg-amber-500",
};

export default function CalendarEventPill({
  event,
  compact,
}: {
  event: CalendarEvent;
  compact?: boolean;
}) {
  const colorClass = event.mode
    ? modeColors[event.mode]
    : "bg-gray-400 text-white";
  const dotClass = event.mode ? modeDots[event.mode] : "bg-gray-400";

  if (compact) {
    return (
      <span
        className={`inline-block w-2 h-2 rounded-full ${dotClass}`}
        title={event.title}
      />
    );
  }

  return (
    <div
      className={`text-[11px] leading-tight px-1.5 py-0.5 rounded truncate ${colorClass}`}
      title={event.title}
    >
      {event.title}
    </div>
  );
}
