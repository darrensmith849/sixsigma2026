"use client";

import { useState, useCallback } from "react";
import type { CalendarEvent } from "@/lib/calendar";
import { formatMonthYear, eventCoversDate } from "@/lib/calendar";
import CalendarGrid from "./CalendarGrid";
import CalendarDayDetail from "./CalendarDayDetail";

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export default function CalendarShell({
  initialEvents,
  initialYear,
  initialMonth,
}: {
  initialEvents: CalendarEvent[];
  initialYear: number;
  initialMonth: number;
}) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [events, setEvents] = useState(initialEvents);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMonth = useCallback(async (y: number, m: number) => {
    setLoading(true);
    setSelectedDay(null);
    try {
      const res = await fetch(`/api/calendar?year=${y}&month=${m}`);
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch {
      // Keep current events on error
    } finally {
      setLoading(false);
    }
  }, []);

  const goToPrev = () => {
    const m = month === 1 ? 12 : month - 1;
    const y = month === 1 ? year - 1 : year;
    setYear(y);
    setMonth(m);
    fetchMonth(y, m);
  };

  const goToNext = () => {
    const m = month === 12 ? 1 : month + 1;
    const y = month === 12 ? year + 1 : year;
    setYear(y);
    setMonth(m);
    fetchMonth(y, m);
  };

  const goToToday = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    if (y !== year || m !== month) {
      setYear(y);
      setMonth(m);
      fetchMonth(y, m);
    }
    setSelectedDay(now.getDate());
  };

  const selectedDateStr = selectedDay
    ? `${year}-${pad(month)}-${pad(selectedDay)}`
    : null;

  const selectedEvents = selectedDateStr
    ? events.filter((e) => eventCoversDate(e, selectedDateStr))
    : [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPrev}
          className="p-2 rounded-lg hover:bg-light-grey transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5 text-heading" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center">
          <h2 className="text-heading text-[22px] md:text-[26px] font-bold">
            {formatMonthYear(year, month)}
          </h2>
          <button
            onClick={goToToday}
            className="text-[13px] text-link hover:text-link-hover font-medium mt-1"
          >
            Today
          </button>
        </div>

        <button
          onClick={goToNext}
          className="p-2 rounded-lg hover:bg-light-grey transition-colors"
          aria-label="Next month"
        >
          <svg className="w-5 h-5 text-heading" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-[12px] md:text-[13px]">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-green" />
          Classroom
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-500" />
          Virtual
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500" />
          Online
        </span>
      </div>

      {/* Calendar grid */}
      <div className={`transition-opacity ${loading ? "opacity-50" : ""}`}>
        <CalendarGrid
          year={year}
          month={month}
          events={events}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />
      </div>

      {/* Day detail panel */}
      {selectedDay !== null && selectedDateStr && (
        <CalendarDayDetail
          events={selectedEvents}
          dateStr={selectedDateStr}
          onClose={() => setSelectedDay(null)}
        />
      )}

      {/* Empty state */}
      {!loading && events.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted text-[16px]">
            No courses scheduled for {formatMonthYear(year, month)}.
          </p>
          <p className="text-muted text-[14px] mt-2">
            Check adjacent months or{" "}
            <a href="/contact" className="text-link hover:text-link-hover">
              contact us
            </a>{" "}
            for custom training dates.
          </p>
        </div>
      )}
    </div>
  );
}
