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
        <div className="container text-center py-10 md:py-14">
          <h1 className="mx-auto max-w-[900px] text-[38px] md:text-[48px] lg:text-[56px] font-bold leading-[1.08] tracking-tight text-heading">
            Six Sigma Courses in South Africa
          </h1>

          <p className="mx-auto mt-6 max-w-[820px] text-[17px] md:text-[19px] leading-[1.55] text-body">
            Internationally accredited Six Sigma training and certification
            courses available online, virtually, and in the classroom. Our
            courses are accredited through CSSC (USA) and delivered by
            experienced professionals committed to helping you achieve process
            excellence.
          </p>

          <p className="mt-3 text-[15px] text-body">
            For quick contact, you can send us an email{" "}
            <a
              href="/contact"
              className="text-green font-semibold hover:text-green-hover transition-colors"
            >
              here</a>.
          </p>
        </div>
      </section>

      {/* ───── Mode Switcher ───── */}
      <section className="pb-10">
        <ModeSwitcher active={activeMode} onChange={setActiveMode} />
      </section>

      {/* ───── Course Card Grid ───── */}
      <section className="pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
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
        <section className="bg-light-grey">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 flex items-center">
              <div className="px-8 md:px-10 lg:px-14 py-10 lg:py-12 max-w-[500px] mx-auto lg:mx-0 lg:ml-auto">
                <h2 className="font-bold text-heading text-[28px] md:text-[34px] leading-[1.12] mb-4">
                  Custom Training Solutions
                </h2>
                <p className="text-body text-[17px] md:text-[18px] leading-relaxed mb-6">
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

            <div className="flex-1 relative min-h-[320px] lg:min-h-[400px]">
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

      {/* ───── Course Calendar Banner ───── */}
      <FadeIn>
        <section className="bg-green py-14 md:py-16">
          <div className="container text-center">
            <h2 className="font-semibold text-inverse text-[26px] md:text-[30px] mb-3">
              Course Calendar
            </h2>
            <p className="text-[17px] md:text-[18px] max-w-2xl mx-auto mb-6 leading-relaxed text-inverse/90">
              View our upcoming course schedule for virtual and classroom
              training across South Africa.
            </p>
            <Button href="/schedule" variant="white" size="large">
              View Schedule
            </Button>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
