import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import {
  buildMetadata,
  PUBLISHER_ORG,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import BreadcrumbsJsonLd from "@/seo-kit/schema/breadcrumbs";
import { buildEventSchema } from "@/seo-kit/schema/event";
import { getCourse } from "../courses/[slug]/courseData";
import { cities as cityData } from "../courses/in/[city]/cityData";
import { getInstructor } from "@/data/instructors";
import { getUpcomingSessions } from "@/data/sessions";

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

const dateRangeFormatter = new Intl.DateTimeFormat("en-ZA", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  if (start === end) return dateRangeFormatter.format(s);
  return `${dateRangeFormatter.format(s)} – ${dateRangeFormatter.format(e)}`;
}

function cityName(slug: string): string {
  if (slug === "online" || slug === "virtual") return "Online / Virtual";
  const c = cityData.find((c) => c.slug === slug);
  return c?.name ?? slug;
}

export default function SchedulePage() {
  const upcoming = getUpcomingSessions();

  // Build Event JSON-LD per session, plus an ItemList wrapper so engines can
  // navigate the full list. Empty array → no Event schema (we don't want to
  // emit a stub ItemList with zero entries).
  const eventSchemas = upcoming
    .map((s) => {
      const course = getCourse(s.courseSlug);
      if (!course) return null;
      const instructor = s.instructorSlug
        ? getInstructor(s.instructorSlug)
        : undefined;
      const isOnline = s.city === "online" || s.city === "virtual";
      const city = isOnline ? null : cityData.find((c) => c.slug === s.city);
      return buildEventSchema({
        name: `${course.title} — ${cityName(s.city)} (${formatDateRange(s.startDate, s.endDate)})`,
        description: course.summary,
        url: `${SITE_URL}/courses/${course.slug}`,
        startDate: s.startDate,
        endDate: s.endDate,
        attendanceMode: isOnline
          ? "OnlineEventAttendanceMode"
          : "OfflineEventAttendanceMode",
        organizer: PUBLISHER_ORG,
        image: course.image.startsWith("http")
          ? course.image
          : `${SITE_URL}${course.image}`,
        location: isOnline
          ? { name: "Online", virtual: true }
          : {
              name: s.location ?? `${city?.name} venue`,
              addressLocality: city?.locality ?? cityName(s.city),
              addressRegion: city?.region,
              addressCountry: "ZA",
            },
        performer: instructor
          ? {
              "@type": "Person",
              "@id": `${SITE_URL}/about/instructors/${instructor.slug}`,
              name: instructor.name,
            }
          : undefined,
      });
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);

  return (
    <>
      <BreadcrumbsJsonLd
        siteUrl={SITE_URL}
        crumbs={[
          { name: "Home", url: "/" },
          { name: "Schedule", url: "/schedule" },
        ]}
      />
      {eventSchemas.length > 0 && <JsonLd data={eventSchemas} />}

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
        <div className="relative z-10 container-wide py-20 md:py-28 lg:py-40 text-center">
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

      {/* ─── Upcoming sessions table — only renders when src/data/sessions.ts
            has populated upcoming entries. Empty → section omitted, falls
            through to the cities grid. ─── */}
      {upcoming.length > 0 && (
        <FadeIn>
          <section className="bg-white py-24 md:py-32">
            <div className="container-wide">
              <div className="mb-14 max-w-3xl">
                <Eyebrow className="mb-5">Upcoming dates</Eyebrow>
                <h2>Next public sessions</h2>
                <p className="mt-5 text-[17px] text-ink-500 leading-[1.65]">
                  Confirmed public dates across our delivery cities. On-site
                  programmes are also available year-round — get in touch.
                </p>
              </div>

              <div className="overflow-x-auto rounded-[20px] border border-ink-100 [box-shadow:var(--shadow-sm)]">
                <table className="w-full min-w-[700px] border-collapse text-left">
                  <thead className="bg-ink-50">
                    <tr>
                      <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Course
                      </th>
                      <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Mode
                      </th>
                      <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Location
                      </th>
                      <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Dates
                      </th>
                      <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Trainer
                      </th>
                      <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-500 text-right">
                        Seats
                      </th>
                      <th className="px-6 py-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {upcoming.map((s, i) => {
                      const course = getCourse(s.courseSlug);
                      const instructor = s.instructorSlug
                        ? getInstructor(s.instructorSlug)
                        : undefined;
                      if (!course) return null;
                      return (
                        <tr
                          key={`${s.courseSlug}-${s.city}-${s.startDate}-${i}`}
                          className="border-t border-ink-100"
                        >
                          <td className="px-6 py-5">
                            <Link
                              href={`/courses/${course.slug}`}
                              className="text-[15px] font-semibold text-ink-900 hover:text-green-700"
                            >
                              {course.topic}
                            </Link>
                            <div className="text-[12px] text-ink-500 mt-0.5">
                              {course.shortTitle}
                            </div>
                          </td>
                          <td className="px-6 py-5 text-[14px] text-ink-700">
                            {course.mode}
                          </td>
                          <td className="px-6 py-5 text-[14px] text-ink-700">
                            {cityName(s.city)}
                          </td>
                          <td className="px-6 py-5 text-[14px] font-semibold text-ink-900">
                            {formatDateRange(s.startDate, s.endDate)}
                          </td>
                          <td className="px-6 py-5 text-[14px] text-ink-700">
                            {instructor ? (
                              <Link
                                href={`/about/instructors/${instructor.slug}`}
                                className="hover:text-green-700"
                              >
                                {instructor.name}
                              </Link>
                            ) : (
                              "—"
                            )}
                          </td>
                          <td className="px-6 py-5 text-[14px] text-ink-700 text-right">
                            {s.seatsAvailable != null
                              ? s.seatsAvailable
                              : "—"}
                          </td>
                          <td className="px-6 py-5 text-right">
                            <Button
                              href={`/contact?subject=session&course=${course.topicSlug}&mode=${course.modeSlug}&date=${s.startDate}#enquiry-form`}
                              variant="filled"
                              size="small"
                            >
                              Reserve
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* ─── Cities grid (always shown — context for on-site / virtual) ─── */}
      <FadeIn>
        <section className={`${upcoming.length > 0 ? "bg-ink-50" : "bg-white"} py-24 md:py-32`}>
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
                  <Button href="/contact#enquiry-form" variant="ghost" size="small" trailingArrow>
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
        buttonHref="/contact#enquiry-form"
        secondaryHref="/courses"
        secondaryText="Browse courses"
        variant="dark"
      />
    </>
  );
}
