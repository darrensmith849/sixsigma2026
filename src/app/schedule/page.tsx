import type { Metadata } from "next";
import { getCalendarEvents } from "@/lib/calendar";
import CalendarShell from "@/components/CalendarShell";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Six Sigma Course Schedule South Africa | Joburg Cape Town",
  description:
    "View the Six Sigma South Africa course schedule for virtual and classroom training in Johannesburg, Cape Town, Durban, and Pretoria.",
};

export default async function SchedulePage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const events = await getCalendarEvents(year, month);

  return (
    <div className="pt-[80px]">
      {/* Hero */}
      <section className="bg-green py-16 md:py-20">
        <div className="container text-center">
          <h1 className="!text-inverse mb-4">Course Schedule</h1>
          <p className="text-inverse/90 text-[18px] md:text-[22px] leading-relaxed max-w-3xl mx-auto">
            View upcoming Six Sigma training dates for virtual and classroom
            courses across South Africa.
          </p>
        </div>
      </section>

      {/* Calendar */}
      <FadeIn>
        <section className="section">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <CalendarShell
                initialEvents={events}
                initialYear={year}
                initialMonth={month}
              />
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
