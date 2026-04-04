import Image from "next/image";
import Link from "next/link";
import type { CourseData } from "@/data/courses";
import Button from "./Button";
import FadeIn from "./FadeIn";

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

  return (
    <>
      {/* ───── Hero + Overlapping Card ───── */}
      <section className="pt-[80px] relative">
        {/* Dark hero band */}
        <div className="relative" style={{ background: "#1a1a1a" }}>
          {/* Background image — right side only on desktop */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[55%]">
              <Image
                src={course.imageSrc}
                alt={course.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/80 to-[#1a1a1a]/40 lg:from-[#1a1a1a] lg:via-[#1a1a1a]/70 lg:to-transparent" />
            </div>
          </div>

          {/* Hero content */}
          <div className="relative" style={{ minHeight: "480px" }}>
            <div className="container">
              <div className="flex items-center" style={{ minHeight: "480px" }}>
                <div className="max-w-xl py-16 lg:py-20">
                  {/* Mode badge */}
                  <span className="inline-block px-4 py-1.5 text-[14px] font-semibold rounded-full bg-green text-white mb-6">
                    {modeBadgeLabel}
                  </span>

                  {/* Title */}
                  <h1
                    className="text-white font-bold mb-6"
                    style={{
                      fontSize: "clamp(32px, 4vw, 52px)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {course.title}
                  </h1>

                  {/* Description */}
                  <p
                    className="mb-8 leading-relaxed"
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: "clamp(17px, 1.2vw, 20px)",
                    }}
                  >
                    {course.description}
                  </p>

                  {/* CTA */}
                  <Button href="/contact" variant="white" size="large">
                    Enquire Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlapping details card — desktop only overlap */}
        <div className="container relative">
          <div className="lg:absolute lg:right-6 xl:right-8 lg:top-0 lg:-translate-y-[140px] lg:w-[380px] xl:w-[400px] z-10">
            <div
              className="bg-white rounded-xl overflow-hidden"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
            >
              {/* Card image */}
              <div className="relative h-[220px]">
                <Image
                  src={course.imageSrc}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>

              {/* Card body */}
              <div className="p-7 space-y-5">
                {/* Price */}
                <div className="flex items-baseline justify-between">
                  <span
                    className="font-bold text-green"
                    style={{ fontSize: "28px" }}
                  >
                    {course.price}
                  </span>
                  {course.isFree && (
                    <span className="inline-block px-3 py-1 text-[13px] font-semibold rounded-full bg-yellow-400 text-gray-900">
                      Free
                    </span>
                  )}
                </div>

                {/* Quick details */}
                <div className="space-y-3 text-[15px]" style={{ color: "#5a5a5a" }}>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><span className="font-semibold">Duration:</span> {course.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span><span className="font-semibold">Mode:</span> {course.mode}</span>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Includes */}
                <div>
                  <p className="font-semibold text-[15px] mb-3" style={{ color: "#5a5a5a" }}>
                    What&apos;s included:
                  </p>
                  <ul className="space-y-2.5">
                    {course.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[15px]"
                        style={{ color: "#5a5a5a" }}
                      >
                        <svg
                          className="w-[18px] h-[18px] text-green shrink-0 mt-0.5"
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

                <hr className="border-gray-200" />

                {/* CTAs */}
                <div className="space-y-3">
                  <Button href="/contact" variant="filled" size="default" className="w-full">
                    Enquire Now
                  </Button>
                  <Button href="/book-a-course" variant="outline" size="default" className="w-full">
                    How to Book
                  </Button>
                </div>

                <p className="text-center text-[14px]" style={{ color: "#888" }}>
                  Or{" "}
                  <Link href="/contact" className="text-green font-semibold hover:underline">
                    get in touch
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Lower Content ───── */}
      <section style={{ padding: "80px 0 64px", background: "#fafafa" }}>
        <div className="container">
          <div className="lg:max-w-[58%] space-y-12">
            {/* Course Overview */}
            <FadeIn>
              <div>
                <h2
                  className="font-bold mb-4"
                  style={{ color: "#5a5a5a", fontSize: "clamp(28px, 2.4vw, 40px)" }}
                >
                  Course Overview
                </h2>
                <p
                  className="leading-relaxed"
                  style={{ color: "#5e5e5e", fontSize: "clamp(18px, 1.2vw, 21px)" }}
                >
                  {course.description}
                </p>
              </div>
            </FadeIn>

            {/* What's Included */}
            <FadeIn>
              <div>
                <h2
                  className="font-bold mb-4"
                  style={{ color: "#5a5a5a", fontSize: "clamp(24px, 2vw, 32px)" }}
                >
                  What&apos;s Included
                </h2>
                <ul className="space-y-3">
                  {course.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[18px]"
                      style={{ color: "#5a5a5a" }}
                    >
                      <svg
                        className="w-5 h-5 text-green shrink-0 mt-0.5"
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
            </FadeIn>
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
