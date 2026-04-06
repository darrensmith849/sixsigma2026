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
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, #111 0%, #111 35%, rgba(17,17,17,0.85) 50%, rgba(17,17,17,0.4) 70%, rgba(17,17,17,0.15) 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(17,17,17,0.6) 0%, transparent 40%)",
              }}
            />
          </div>

          {/* Hero content */}
          <div className="relative min-h-[420px] md:min-h-[460px]">
            <div className="container">
              <div className="flex items-end lg:items-center min-h-[420px] md:min-h-[460px]">
                <div className="max-w-lg pb-12 pt-16 lg:pb-16 lg:pt-20">
                  <span className="inline-block px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider rounded-full bg-green text-white mb-5">
                    {modeBadgeLabel}
                  </span>

                  <h1 className="text-white font-bold text-[28px] md:text-[36px] lg:text-[42px] leading-[1.1] tracking-tight">
                    {course.title}
                  </h1>

                  <div className="mt-4 mb-5 rounded-full w-[50px] h-[3px] bg-green" />

                  <p className="text-white/80 text-[15px] md:text-[16px] leading-relaxed mb-7">
                    {course.description}
                  </p>

                  <Button href="/contact" variant="white" size="large">
                    {primaryCta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Content + Card ───── */}
      <section className="bg-white">
        <div className="container relative">
          <div className="lg:flex lg:gap-10 py-12 md:py-16">
            {/* Left content */}
            <div className="lg:flex-1 lg:max-w-[60%] space-y-10">
              {/* Course Overview */}
              <FadeIn>
                <div>
                  <h2 className="font-bold text-heading text-[24px] md:text-[28px] mb-3">
                    Course Overview
                  </h2>
                  <p className="text-body text-[16px] md:text-[17px] leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </FadeIn>

              {/* What's Included */}
              <FadeIn>
                <div>
                  <h2 className="font-bold text-heading text-[22px] md:text-[26px] mb-3">
                    What&apos;s Included
                  </h2>
                  <ul className="space-y-2">
                    {course.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-heading text-[15px] md:text-[16px]"
                      >
                        <span className="w-5 h-5 shrink-0 mt-0.5 rounded-full flex items-center justify-center bg-green/10">
                          <svg
                            className="w-3 h-3 text-green"
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
            <div className="mt-8 lg:mt-0 lg:w-[340px] xl:w-[360px] shrink-0">
              <div className="lg:sticky lg:top-[100px] bg-light-grey rounded-xl overflow-hidden shadow-sm">
                {/* Card image */}
                <div className="relative h-[180px]">
                  <Image
                    src={course.imageSrc}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="360px"
                  />
                </div>

                {/* Card body */}
                <div className="p-5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 border-b border-border-grey text-[14px]">
                      <span className="text-muted font-medium flex items-center gap-2">
                        <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Duration
                      </span>
                      <span className="font-semibold text-heading">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border-grey text-[14px]">
                      <span className="text-muted font-medium flex items-center gap-2">
                        <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Mode
                      </span>
                      <span className="font-semibold text-heading">{course.mode}</span>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-[12px] uppercase tracking-wide text-muted mb-2">
                      Includes
                    </p>
                    <ul className="space-y-1.5">
                      {course.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-[13px] text-heading">
                          <svg className="w-3.5 h-3.5 text-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-1">
                    <Button href="/contact" variant="filled" size="default" className="w-full">
                      {primaryCta}
                    </Button>
                    <Button href="/book-a-course" variant="outline" size="default" className="w-full">
                      {secondaryCta}
                    </Button>
                  </div>

                  <p className="text-center text-[12px] text-muted">
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
        <section className="bg-light-grey py-12 md:py-14">
          <div className="container text-center">
            <h2 className="font-bold text-heading text-[24px] md:text-[28px] mb-3">
              Explore More Courses
            </h2>
            <p className="text-body text-[16px] md:text-[17px] leading-relaxed max-w-xl mx-auto mb-6">
              Browse our full range of internationally accredited Six Sigma
              courses available online, virtually, and in the classroom.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
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
        <section className="bg-green py-12 md:py-14">
          <div className="container text-center">
            <h2 className="font-semibold text-inverse text-[24px] md:text-[28px] mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-[16px] md:text-[17px] max-w-2xl mx-auto mb-6 leading-relaxed text-inverse/90">
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
