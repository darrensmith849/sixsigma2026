"use client";

import { useState } from "react";
import Image from "next/image";
import ModeSwitcher from "./ModeSwitcher";
import CourseCard from "./CourseCard";
import Button from "./Button";
import FadeIn from "./FadeIn";
import { mainCoursesByMode, type Mode } from "@/data/courses";

export default function CoursesClient() {
  const [activeMode, setActiveMode] = useState<Mode>("Online");
  const courses = mainCoursesByMode[activeMode];

  return (
    <>
      {/* ───── Hero / Intro ───── */}
      <section className="pt-[80px]">
        <div className="container text-center" style={{ paddingTop: "80px", paddingBottom: "20px" }}>
          <h1
            className="mx-auto"
            style={{
              fontSize: "clamp(48px, 5vw, 78px)",
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: "#5a5a5a",
              maxWidth: "980px",
            }}
          >
            Six Sigma Courses in South Africa
          </h1>

          <p
            className="mx-auto mt-10"
            style={{
              fontSize: "clamp(20px, 1.4vw, 27px)",
              lineHeight: 1.5,
              color: "#646464",
              maxWidth: "1060px",
            }}
          >
            Internationally accredited Six Sigma training and certification
            courses available online, virtually, and in the classroom. Our
            courses are accredited through CSSC (USA) and delivered by
            experienced professionals committed to helping you achieve process
            excellence.
          </p>

          <p className="mt-7" style={{ fontSize: "20px", color: "#646464" }}>
            For quick contact, you can send us an email{" "}
            <a
              href="/contact"
              className="text-green font-semibold hover:text-green-hover transition-colors"
            >
              here
            </a>
            .
          </p>
        </div>
      </section>

      {/* ───── Mode Switcher ───── */}
      <section style={{ paddingTop: "48px", paddingBottom: "56px" }}>
        <ModeSwitcher active={activeMode} onChange={setActiveMode} />
      </section>

      {/* ───── Course Card Grid ───── */}
      <section style={{ paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px" }}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-9">
            {courses.map((course, index) => (
              <FadeIn key={`${course.slug}-${index}`}>
                <CourseCard
                  title={course.title}
                  description={course.description}
                  includes={course.includes}
                  mode={course.mode}
                  imageSrc={course.imageSrc}
                  href={`/courses/${course.slug}`}
                  isFree={course.isFree}
                  stripColor={course.stripColor}
                  buttonLabel={course.buttonLabel}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Custom Training Solutions ───── */}
      <FadeIn>
        <section style={{ background: "#ececeb" }}>
          <div className="flex flex-col lg:flex-row">
            {/* Left text panel */}
            <div className="flex-1 flex items-center" style={{ padding: "64px 48px" }}>
              <div style={{ maxWidth: "540px", margin: "0 auto" }}>
                <h2
                  className="font-bold mb-5"
                  style={{ color: "#5a5a5a", fontSize: "clamp(30px, 2.8vw, 48px)", lineHeight: 1.12 }}
                >
                  Custom Training Solutions
                </h2>
                <p
                  className="mb-8 leading-relaxed"
                  style={{ color: "#5e5e5e", fontSize: "clamp(18px, 1.2vw, 22px)" }}
                >
                  Tailor your Six Sigma training experience with our custom
                  training solutions. Collaborate with our expert trainers to
                  develop a curriculum that meets your organisation&#39;s unique
                  needs and objectives.
                </p>
                <Button href="/contact" variant="filled" size="large">
                  Enquire Now
                </Button>
              </div>
            </div>

            {/* Right image panel */}
            <div className="flex-1 relative min-h-[400px] lg:min-h-[500px]">
              <Image
                src="/images/courses/custom-training.jpg"
                alt="Custom corporate training session"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Green CTA Banner ───── */}
      <FadeIn>
        <section className="bg-green" style={{ padding: "80px 0" }}>
          <div className="container text-center">
            <h2 className="font-semibold text-inverse mb-4">
              Not sure which course is right for you?
            </h2>
            <p className="text-[21px] max-w-3xl mx-auto mb-8 leading-relaxed text-inverse/90">
              Get in touch with our team and we will help you find the best
              course for your career goals and organisational needs.
            </p>
            <Button href="/contact" variant="white" size="large">
              Enquire now
            </Button>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
