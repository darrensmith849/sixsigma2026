import type { CalendarEvent } from "@/lib/calendar";
import { getDaysInMonth, getFirstDayOfWeek, eventCoversDate } from "@/lib/calendar";
import CalendarDayCell from "./CalendarDayCell";

const DAY_HEADERS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export default function CalendarGrid({
  year,
  month,
  events,
  selectedDay,
  onSelectDay,
}: {
  year: number;
  month: number;
  events: CalendarEvent[];
  selectedDay: number | null;
  onSelectDay: (day: number) => void;
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOffset = getFirstDayOfWeek(year, month);

  // Previous month padding
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const daysInPrev = getDaysInMonth(prevYear, prevMonth);

  const todayStr = new Date().toISOString().slice(0, 10);

  // Build cells
  const cells: {
    day: number;
    isCurrentMonth: boolean;
    dateStr: string;
  }[] = [];

  // Prev month padding
  for (let i = firstDayOffset - 1; i >= 0; i--) {
    const d = daysInPrev - i;
    cells.push({
      day: d,
      isCurrentMonth: false,
      dateStr: `${prevYear}-${pad(prevMonth)}-${pad(d)}`,
    });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      isCurrentMonth: true,
      dateStr: `${year}-${pad(month)}-${pad(d)}`,
    });
  }

  // Next month padding (fill to 42 cells = 6 rows)
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({
      day: d,
      isCurrentMonth: false,
      dateStr: `${nextYear}-${pad(nextMonth)}-${pad(d)}`,
    });
  }

  return (
    <div>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_HEADERS.map((h) => (
          <div
            key={h}
            className="text-center text-[12px] md:text-[13px] font-semibold text-muted uppercase tracking-wider py-2"
          >
            {h}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-px bg-border-grey rounded-lg overflow-hidden">
        {cells.map((cell) => {
          const dayEvents = events.filter((e) =>
            eventCoversDate(e, cell.dateStr)
          );
          return (
            <CalendarDayCell
              key={cell.dateStr}
              day={cell.day}
              events={dayEvents}
              isCurrentMonth={cell.isCurrentMonth}
              isToday={cell.dateStr === todayStr}
              isSelected={
                cell.isCurrentMonth && cell.day === selectedDay
              }
              onSelect={() => {
                if (cell.isCurrentMonth) onSelectDay(cell.day);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
