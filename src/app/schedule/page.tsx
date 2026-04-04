import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Six Sigma Course Schedule South Africa | Joburg Cape Town",
  description:
    "View the Six Sigma South Africa course schedule for virtual and classroom training in Johannesburg, Cape Town, Durban, and Pretoria.",
};

export default function SchedulePage() {
  return (
    <div className="pt-[80px]">
      <section className="section">
        <div className="container">
          <h1 className="text-center mb-8">Calendar</h1>
          <div className="max-w-5xl mx-auto">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=sixsigmasouthafrica%40gmail.com&ctz=Africa%2FJohannesburg"
              style={{ border: 0 }}
              width="100%"
              height="600"
              className="rounded-lg"
              title="Six Sigma South Africa Course Schedule"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
