import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Training Schedule | ${SITE_NAME}`,
  description:
    "Upcoming Six Sigma training dates across South Africa — Johannesburg, Cape Town, Durban, Pretoria and Port Elizabeth. Enquire for the latest schedule.",
  path: "/schedule",
});

const cities = [
  { name: "Johannesburg", code: "JHB", days: "Mon–Fri" },
  { name: "Cape Town", code: "CPT", days: "Mon–Fri" },
  { name: "Durban", code: "DBN", days: "Mon–Fri" },
  { name: "Pretoria", code: "PTA", days: "Mon–Fri" },
  { name: "Port Elizabeth", code: "PE", days: "Mon–Fri" },
  { name: "Virtual & Online", code: "ONL", days: "Anytime" },
];

export default function SchedulePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-green-900 text-white pt-[80px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 container-wide py-28 lg:py-40 text-center">
          <Eyebrow tone="white" className="mb-6 mx-auto">
            Upcoming sessions
          </Eyebrow>
          <h1 className="!text-white mx-auto max-w-4xl">
            Training schedule
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-[19px] md:text-[21px] text-white/80 leading-[1.65]">
            We run Six Sigma training year-round across South Africa&rsquo;s
            major cities. Public courses, virtual sessions and self-paced
            online — your schedule, your pace.
          </p>
        </div>
      </section>

      {/* ─── Cities grid ─── */}
      <FadeIn>
        <section className="bg-white py-24 md:py-32">
          <div className="container-wide">
            <div className="mb-14 max-w-3xl">
              <Eyebrow className="mb-5">Where we train</Eyebrow>
              <h2>Six locations, year-round availability</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((c) => (
                <div
                  key={c.name}
                  className="group relative overflow-hidden rounded-[20px] border border-ink-100 bg-white p-8 [box-shadow:var(--shadow-md)] transition-all duration-[var(--dur)] hover:-translate-y-1 hover:[box-shadow:var(--shadow-xl)]"
                >
                  <div className="flex items-start justify-between mb-5">
                    <span className="inline-flex h-12 items-center justify-center rounded-[12px] bg-green-50 px-4 text-[14px] font-bold uppercase tracking-[0.12em] text-green-700">
                      {c.code}
                    </span>
                    <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                      {c.days}
                    </span>
                  </div>
                  <h3 className="mb-2">{c.name}</h3>
                  <p className="text-[14px] text-ink-500 leading-[1.6] mb-6">
                    Public course dates available throughout the year. On-site
                    training also offered.
                  </p>
                  <Button href="/contact" variant="ghost" size="small" trailingArrow>
                    Enquire for dates
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      <CTASection
        eyebrow="Reserve your seat"
        heading="Find a date that works for you"
        description="Public course dates fill up fast. Get in touch and we'll confirm the next available slot in your preferred city within one business day."
        buttonText="Enquire for dates"
        buttonHref="/contact"
        secondaryHref="/courses"
        secondaryText="Browse courses"
        variant="dark"
      />
    </>
  );
}
