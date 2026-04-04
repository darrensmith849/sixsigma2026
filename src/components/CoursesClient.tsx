"use client";

import { useState } from "react";
import Image from "next/image";
import ModeSwitcher from "./ModeSwitcher";
import CourseCard from "./CourseCard";
import Button from "./Button";
import FadeIn from "./FadeIn";

type Mode = "Online" | "Virtual" | "Classroom";

interface CourseData {
  title: string;
  description: string;
  includes: string[];
  mode: Mode;
  imageSrc: string;
  href: string;
  isFree?: boolean;
  stripColor?: "green" | "yellow";
  buttonLabel?: string;
}

const onlineCourses: CourseData[] = [
  {
    title: "Six Sigma White Belt training in South Africa",
    description:
      "Self-paced course introducing Six Sigma basics. Ideal for understanding fundamental concepts and improving workplace efficiency. No prior experience required.",
    includes: ["6 hours of content", "No Exam", "No Project"],
    mode: "Online",
    imageSrc: "/images/courses/Online-1.jpg",
    href: "/courses",
    isFree: true,
    stripColor: "yellow",
    buttonLabel: "Learn More",
  },
  {
    title: "Six Sigma Yellow Belt training in South Africa",
    description:
      "Course focusing on basic project management within Six Sigma. Excellent for team members seeking to support and participate in improvement projects.",
    includes: ["14 hours of content", "1 x 90-minute Exam", "No Project"],
    mode: "Online",
    imageSrc: "/images/courses/Online-2.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
  {
    title: "Six Sigma LEAN Green Belt training in South Africa",
    description:
      "Comprehensive course introducing Lean principles and tools. Learn to eliminate waste and improve efficiency in your organization's processes. Suitable for aspiring Lean practitioners.",
    includes: ["35 hours of content", "1 x 90-minute Exam", "3 Months to write a project"],
    mode: "Online",
    imageSrc: "/images/courses/Online-3.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
  {
    title: "Six Sigma DMAIC Green Belt training in South Africa",
    description:
      "In-depth online course teaching DMAIC (Define, Measure, Analyze, Improve, Control) process. Ideal for professionals seeking to implement this structured problem-solving methodology in their projects.",
    includes: ["35 hours of content", "1 x 90-minute Exam", "3 Months to write a project"],
    mode: "Online",
    imageSrc: "/images/courses/Online-4.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
  {
    title: "Six Sigma LEAN Black Belt training in South Africa",
    description:
      "Advanced course providing mastery in Lean methodologies. Learn to lead and drive Lean transformations in large-scale projects. Perfect for professionals desiring Lean leadership roles.",
    includes: ["70 hours of content", "2 x 90-minute Exams", "6 Months to write a project"],
    mode: "Online",
    imageSrc: "/images/courses/Online-5.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
  {
    title: "Six Sigma DMAIC Black Belt training in South Africa",
    description:
      "Expert-level online course in DMAIC, focusing on deep statistical analysis and strategic project leadership. Ideal for leaders seeking to drive process improvement using DMAIC.",
    includes: ["70 hours of content", "2 x 90-minute Exams", "6 Months to write a project"],
    mode: "Online",
    imageSrc: "/images/courses/Online-6.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
];

const virtualCourses: CourseData[] = [
  {
    title: "Six Sigma Root Cause Analysis training in South Africa",
    description:
      "Interactive course focusing on identifying and understanding the primary cause of a problem or issue. Ideal for problem-solvers and process improvers.",
    includes: ["2 Days", "No Exam", "No Project"],
    mode: "Virtual",
    imageSrc: "/images/courses/Virtual-1.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
  {
    title: "Six Sigma Yellow Belt training in South Africa",
    description:
      "Course teaching project participation and process management skills. Ideal for professionals seeking to optimize team performance.",
    includes: ["2 Days", "1 x 90-minute Exam", "No Project"],
    mode: "Virtual",
    imageSrc: "/images/courses/Virtual-2.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
  {
    title: "Six Sigma LEAN Green Belt training in South Africa",
    description:
      "Interactive course focusing on Lean principles and tools. Learn to streamline processes and eliminate waste in your organization. Ideal for professionals seeking hands-on Lean training.",
    includes: ["5 Days", "1 x 90-minute Exam", "3 Months to write a project"],
    mode: "Virtual",
    imageSrc: "/images/courses/Virtual-3.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
  {
    title: "Six Sigma DMAIC Green Belt training in South Africa",
    description:
      "Comprehensive virtual course on DMAIC process. Ideal for professionals seeking to effectively define, measure, analyze, improve, and control their business processes.",
    includes: ["5 Days", "1 x 90-minute Exam", "3 Months to write a project"],
    mode: "Virtual",
    imageSrc: "/images/courses/Virtual-4.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
  {
    title: "Six Sigma LEAN Black Belt training in South Africa",
    description:
      "Advanced virtual training in Lean methodologies. Learn to lead Lean transformations and enhance organizational efficiency. Perfect for professionals aspiring to Lean leadership roles.",
    includes: ["10 Days", "2 x 90-minute Exams", "6 Months to write a project"],
    mode: "Virtual",
    imageSrc: "/images/courses/Virtual-5.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
  {
    title: "Six Sigma DMAIC Black Belt training in South Africa",
    description:
      "Advanced virtual training in DMAIC. Learn to implement this proven problem-solving methodology in large-scale projects, driving process improvement and organizational excellence.",
    includes: ["10 Days", "2 x 90-minute Exams", "6 Months to write a project"],
    mode: "Virtual",
    imageSrc: "/images/courses/Virtual-1.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
];

const classroomCourses: CourseData[] = [
  {
    title: "Six Sigma Root Cause Analysis training in South Africa",
    description:
      "In-person, hands-on training on uncovering the primary cause of a problem, using structured problem-solving techniques. Perfect for proactive learners.",
    includes: ["2 Days", "No Exam", "No Project"],
    mode: "Classroom",
    imageSrc: "/images/courses/Classroom-1.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
  {
    title: "Six Sigma Yellow Belt training in South Africa",
    description:
      "Course exploring process improvement, project participation, and Six Sigma tools. Perfect for hands-on learners desiring active project involvement.",
    includes: ["2 Days", "1 x 90-minute Exam", "No Project"],
    mode: "Classroom",
    imageSrc: "/images/courses/Classroom-2.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
  {
    title: "Six Sigma Green Belt training in South Africa",
    description:
      "In-person course on Lean principles and tools. Hands-on training to eliminate waste and improve processes within your organization. Perfect for active learners desiring Lean expertise.",
    includes: ["5 Days", "1 x 90-minute Exam", "3 Months to write a project"],
    mode: "Classroom",
    imageSrc: "/images/courses/Classroom-3.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
  {
    title: "Six Sigma Green Belt training in South Africa",
    description:
      "In-person, comprehensive training on DMAIC process. Learn to apply this structured problem-solving methodology in your projects. Ideal for professionals seeking hands-on DMAIC training.",
    includes: ["5 Days", "1 x 90-minute Exam", "3 Months to write a project"],
    mode: "Classroom",
    imageSrc: "/images/courses/Classroom-4.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
  {
    title: "Six Sigma Black Belt training in South Africa",
    description:
      "Immersive course offering expert-level knowledge in Lean methodologies. Focus on strategic implementation and Lean leadership. Ideal for aspiring Lean transformation leaders.",
    includes: ["10 Days", "2 x 90-minute Exams", "6 Months to write a project"],
    mode: "Classroom",
    imageSrc: "/images/courses/Classroom-5.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
  {
    title: "Six Sigma Black Belt training in South Africa",
    description:
      "Expert-level classroom course in DMAIC. Focuses on deep statistical analysis and strategic project leadership. Perfect for professionals aiming to drive process improvement using DMAIC.",
    includes: ["10 Days", "2 x 90-minute Exams", "6 Months to write a project"],
    mode: "Classroom",
    imageSrc: "/images/courses/Classroom-1.jpg",
    href: "/courses",
    buttonLabel: "Learn More",
  },
];

const courseMap: Record<Mode, CourseData[]> = {
  Online: onlineCourses,
  Virtual: virtualCourses,
  Classroom: classroomCourses,
};

export default function CoursesClient() {
  const [activeMode, setActiveMode] = useState<Mode>("Online");
  const courses = courseMap[activeMode];

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
            {courses.map((course) => (
              <FadeIn key={course.title}>
                <CourseCard
                  title={course.title}
                  description={course.description}
                  includes={course.includes}
                  mode={course.mode}
                  imageSrc={course.imageSrc}
                  href={course.href}
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
