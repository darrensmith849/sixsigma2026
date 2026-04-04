import Image from "next/image";
import Link from "next/link";
import type { CourseData } from "@/data/courses";
import Button from "./Button";
import FadeIn from "./FadeIn";
import CourseAccordion from "./CourseAccordion";

interface ShortCourseDetailProps {
  course: CourseData;
}

export default function ShortCourseDetail({ course }: ShortCourseDetailProps) {
  const modeBadgeLabel =
    course.mode === "Online"
      ? "Online — Self-paced"
      : course.mode === "Virtual"
        ? "Virtual — Live instructor"
        : "Classroom — In person";

  const primaryCta = course.ctaLabels?.primary ?? "Enquire Now";
  const secondaryCta = course.ctaLabels?.secondary ?? "How to Book";

  return (
    <>
      {/* ───── Hero ───── */}
      <section className="pt-[80px] relative">
        <div className="relative" style={{ background: "#111" }}>
          {/* Background image — right-weighted on desktop */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[60%]">
              <Image
                src={course.imageSrc}
                alt={course.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
            {/* Multi-stop gradient for premium depth */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, #111 0%, #111 35%, rgba(17,17,17,0.85) 50%, rgba(17,17,17,0.4) 70%, rgba(17,17,17,0.15) 100%)",
              }}
            />
            {/* Bottom vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(17,17,17,0.6) 0%, transparent 40%)",
              }}
            />
          </div>

          {/* Hero content */}
          <div className="relative" style={{ minHeight: "540px" }}>
            <div className="container">
              <div className="flex items-end lg:items-center" style={{ minHeight: "540px" }}>
                <div className="max-w-lg pb-16 pt-20 lg:pb-20 lg:pt-24">
                  {/* Mode badge */}
                  <span className="inline-block px-5 py-2 text-[13px] font-bold uppercase tracking-wider rounded-full bg-green text-white mb-7">
                    {modeBadgeLabel}
                  </span>

                  {/* Title */}
                  <h1
                    className="text-white font-bold"
                    style={{
                      fontSize: "clamp(34px, 4.2vw, 56px)",
                      lineHeight: 1.08,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {course.title}
                  </h1>

                  {/* Green accent line */}
                  <div
                    className="mt-6 mb-7 rounded-full"
                    style={{ width: "60px", height: "4px", background: "#16b24a" }}
                  />

                  {/* Description */}
                  <p
                    className="leading-relaxed mb-9"
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "clamp(16px, 1.15vw, 19px)",
                      lineHeight: 1.7,
                    }}
                  >
                    {course.description}
                  </p>

                  {/* Hero CTA */}
                  <Button href="/contact" variant="white" size="large">
                    {primaryCta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Content + Overlapping Card ───── */}
      <section style={{ background: "#fafafa" }}>
        <div className="container relative">
          <div className="lg:flex lg:gap-12" style={{ paddingTop: "72px", paddingBottom: "80px" }}>
            {/* Left content — 2/3 */}
            <div className="lg:flex-1 lg:max-w-[60%] space-y-14">
              {/* Course Overview */}
              <FadeIn>
                <div>
                  <h2
                    className="font-bold mb-5"
                    style={{ color: "#2d2d2d", fontSize: "clamp(26px, 2.2vw, 36px)" }}
                  >
                    Course Overview
                  </h2>
                  <p
                    className="leading-relaxed"
                    style={{ color: "#5e5e5e", fontSize: "clamp(17px, 1.15vw, 20px)", lineHeight: 1.75 }}
                  >
                    {course.description}
                  </p>
                </div>
              </FadeIn>

              {/* What's Included */}
              <FadeIn>
                <div>
                  <h2
                    className="font-bold mb-5"
                    style={{ color: "#2d2d2d", fontSize: "clamp(24px, 2vw, 32px)" }}
                  >
                    What&apos;s Included
                  </h2>
                  <ul className="space-y-4">
                    {course.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[17px]"
                        style={{ color: "#5a5a5a" }}
                      >
                        <span
                          className="w-6 h-6 shrink-0 mt-0.5 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(22,178,74,0.1)" }}
                        >
                          <svg
                            className="w-3.5 h-3.5 text-green"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* Course Content — Accordion */}
              {course.courseContent && course.courseContent.length > 0 && (
                <FadeIn>
                  <CourseAccordion
                    heading={course.courseContentHeading}
                    subheading={course.courseContentSubheading}
                    sections={course.courseContent}
                  />
                </FadeIn>
              )}
            </div>

            {/* Right — Details Card */}
            <div className="mt-10 lg:mt-0 lg:w-[380px] xl:w-[400px] shrink-0">
              <div
                className="lg:sticky lg:top-[100px] bg-white rounded-xl overflow-hidden"
                style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.1)" }}
              >
                {/* Card image */}
                <div className="relative h-[200px]">
                  <Image
                    src={course.imageSrc}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                </div>

                {/* Card body */}
                <div className="p-6 space-y-5">
                  {/* Quick details */}
                  <div className="space-y-3">
                    <div
                      className="flex items-center justify-between py-3 border-b"
                      style={{ borderColor: "#eee" }}
                    >
                      <span className="flex items-center gap-2.5 text-[15px]" style={{ color: "#666" }}>
                        <svg className="w-[18px] h-[18px] text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Duration
                      </span>
                      <span className="font-semibold text-[15px]" style={{ color: "#333" }}>
                        {course.duration}
                      </span>
                    </div>

                    <div
                      className="flex items-center justify-between py-3 border-b"
                      style={{ borderColor: "#eee" }}
                    >
                      <span className="flex items-center gap-2.5 text-[15px]" style={{ color: "#666" }}>
                        <svg className="w-[18px] h-[18px] text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Mode
                      </span>
                      <span className="font-semibold text-[15px]" style={{ color: "#333" }}>
                        {course.mode}
                      </span>
                    </div>
                  </div>

                  {/* Includes in card */}
                  <div>
                    <p className="font-semibold text-[14px] uppercase tracking-wide mb-3" style={{ color: "#999" }}>
                      Includes
                    </p>
                    <ul className="space-y-2">
                      {course.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-[14px]"
                          style={{ color: "#555" }}
                        >
                          <svg
                            className="w-4 h-4 text-green shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3 pt-2">
                    <Button href="/contact" variant="filled" size="default" className="w-full">
                      {primaryCta}
                    </Button>
                    <Button href="/book-a-course" variant="outline" size="default" className="w-full">
                      {secondaryCta}
                    </Button>
                  </div>

                  <p className="text-center text-[13px]" style={{ color: "#999" }}>
                    Or{" "}
                    <Link href="/contact" className="text-green font-semibold hover:underline">
                      get in touch
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Explore More Courses ───── */}
      <FadeIn>
        <section style={{ background: "#ececeb", padding: "64px 0" }}>
          <div className="container text-center">
            <h2
              className="font-bold mb-4"
              style={{ color: "#5a5a5a", fontSize: "clamp(28px, 2.4vw, 40px)" }}
            >
              Explore More Courses
            </h2>
            <p
              className="mx-auto mb-8 leading-relaxed"
              style={{ color: "#5e5e5e", fontSize: "clamp(18px, 1.2vw, 21px)", maxWidth: "700px" }}
            >
              Browse our full range of internationally accredited Six Sigma
              courses available online, virtually, and in the classroom.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/courses" variant="filled" size="large">
                View All Courses
              </Button>
              <Button href="/which-course" variant="outline" size="large">
                Which Course is Right for Me?
              </Button>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Green CTA ───── */}
      <FadeIn>
        <section className="bg-green" style={{ padding: "80px 0" }}>
          <div className="container text-center">
            <h2 className="font-semibold text-inverse mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-[21px] max-w-3xl mx-auto mb-8 leading-relaxed text-inverse/90">
              Get in touch with our team to book your course or request a custom
              quote for your organisation.
            </p>
            <Button href="/contact" variant="white" size="large">
              Contact Us
            </Button>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
