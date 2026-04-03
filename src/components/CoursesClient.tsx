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
}

const onlineCourses: CourseData[] = [
  {
    title: "White Belt Online",
    description:
      "A free introductory course providing a basic understanding of Six Sigma concepts, terminology, and the DMAIC methodology. Ideal for anyone wanting to explore Six Sigma.",
    includes: [
      "Self-paced online modules",
      "Introduction to Six Sigma concepts",
      "Basic DMAIC overview",
      "Digital certificate of completion",
    ],
    mode: "Online",
    imageSrc: "/images/courses/Online-1.jpg",
    href: "/courses",
    isFree: true,
    stripColor: "yellow",
  },
  {
    title: "Yellow Belt Online",
    description:
      "Covers the understanding of the Six Sigma methodology at a foundational level. Participants learn to support Green and Black Belt project teams.",
    includes: [
      "Self-paced e-learning modules",
      "Six Sigma fundamentals",
      "Team participation techniques",
      "CSSC internationally accredited certificate",
    ],
    mode: "Online",
    imageSrc: "/images/courses/Online-2.jpg",
    href: "/courses",
  },
  {
    title: "Lean Green Belt Online",
    description:
      "Focus on the reduction of waste in all its forms throughout the operation. Learn 5S, visual factory principles, and how to identify and eliminate waste.",
    includes: [
      "Lean methodology training",
      "5S and visual factory",
      "Waste reduction techniques",
      "CSSC internationally accredited certificate",
    ],
    mode: "Online",
    imageSrc: "/images/courses/Online-3.jpg",
    href: "/courses",
  },
  {
    title: "DMAIC Green Belt Online",
    description:
      "Learn the tips and techniques for effective Six Sigma execution. Receive fundamental training in Define, Measure, Analyse, Improve and Control.",
    includes: [
      "Full DMAIC methodology",
      "Statistical analysis tools",
      "Process capability studies",
      "CSSC internationally accredited certificate",
    ],
    mode: "Online",
    imageSrc: "/images/courses/Online-4.jpg",
    href: "/courses",
  },
  {
    title: "Lean Black Belt Online",
    description:
      "Advanced Lean training covering deeper waste elimination strategies, change management, and stakeholder influence across the organisation.",
    includes: [
      "Advanced Lean techniques",
      "Change management training",
      "Stakeholder influence",
      "CSSC internationally accredited certificate",
    ],
    mode: "Online",
    imageSrc: "/images/courses/Online-5.jpg",
    href: "/courses",
  },
  {
    title: "DMAIC Black Belt Online",
    description:
      "Advanced statistical training and analysis tools for project leaders. Deeper analysis, change management, and stakeholder influence with project coaching.",
    includes: [
      "Advanced statistical methods",
      "Change management & leadership",
      "Project-based coaching",
      "CSSC internationally accredited certificate",
    ],
    mode: "Online",
    imageSrc: "/images/courses/Online-6.jpg",
    href: "/courses",
  },
];

const virtualCourses: CourseData[] = [
  {
    title: "Yellow Belt Virtual",
    description:
      "Live instructor-led training covering the fundamentals of Six Sigma. Learn to be part of a project team and review process improvements that support the project.",
    includes: [
      "Live virtual instructor-led sessions",
      "Interactive group exercises",
      "Six Sigma fundamentals",
      "CSSC internationally accredited certificate",
    ],
    mode: "Virtual",
    imageSrc: "/images/courses/Virtual-1.jpg",
    href: "/courses",
  },
  {
    title: "Lean Green Belt Virtual",
    description:
      "Master Lean Six Sigma principles focused on waste reduction. Set operations to order using 5S and visual factory; identify and eliminate waste in material and information flows.",
    includes: [
      "Live virtual instructor-led sessions",
      "Lean tools and techniques",
      "Waste identification workshops",
      "CSSC internationally accredited certificate",
    ],
    mode: "Virtual",
    imageSrc: "/images/courses/Virtual-2.jpg",

    href: "/courses",
  },
  {
    title: "DMAIC Green Belt Virtual",
    description:
      "Comprehensive live training in the DMAIC methodology. Problem solvers learn to apply the right tools at the right time to maximise efficiency.",
    includes: [
      "Live virtual instructor-led sessions",
      "Full DMAIC methodology",
      "Statistical analysis tools",
      "CSSC internationally accredited certificate",
    ],
    mode: "Virtual",
    imageSrc: "/images/courses/Virtual-3.jpg",
    href: "/courses",
  },
  {
    title: "Lean Black Belt Virtual",
    description:
      "Advanced Lean training for those managing Six Sigma projects. Focus on deeper waste elimination strategies, change management, and stakeholder influence.",
    includes: [
      "Live virtual instructor-led sessions",
      "Advanced Lean techniques",
      "Change management training",
      "CSSC internationally accredited certificate",
    ],
    mode: "Virtual",
    imageSrc: "/images/courses/Virtual-4.jpg",
    href: "/courses",
  },
  {
    title: "DMAIC Black Belt Virtual",
    description:
      "Advanced statistical training and analysis tools for project leaders. Deeper analysis, change management, and stakeholder influence with project coaching.",
    includes: [
      "Live virtual instructor-led sessions",
      "Advanced statistical methods",
      "Change management & leadership",
      "CSSC internationally accredited certificate",
    ],
    mode: "Virtual",
    imageSrc: "/images/courses/Virtual-5.jpg",
    href: "/courses",
  },
];

const classroomCourses: CourseData[] = [
  {
    title: "Yellow Belt Classroom",
    description:
      "In-person training in the fundamentals of Six Sigma. Available in Johannesburg, Cape Town, Durban, and Pretoria.",
    includes: [
      "Face-to-face instructor-led training",
      "Hands-on group exercises",
      "Printed course materials",
      "CSSC internationally accredited certificate",
    ],
    mode: "Classroom",
    imageSrc: "/images/courses/Classroom-1.jpg",
    href: "/courses",
  },
  {
    title: "Lean Green Belt Classroom",
    description:
      "In-person Lean Six Sigma training focused on waste reduction methodologies. Hands-on workshops and real-world case studies in a collaborative environment.",
    includes: [
      "Face-to-face instructor-led training",
      "Lean tools and workshops",
      "Real-world case studies",
      "CSSC internationally accredited certificate",
    ],
    mode: "Classroom",
    imageSrc: "/images/courses/Classroom-2.jpg",
    href: "/courses",
  },
  {
    title: "DMAIC Green Belt Classroom",
    description:
      "Comprehensive in-person DMAIC training with hands-on statistical exercises. Green Belts are the problem solvers applying the right tools to maximise efficiency.",
    includes: [
      "Face-to-face instructor-led training",
      "Full DMAIC methodology",
      "Hands-on statistical exercises",
      "CSSC internationally accredited certificate",
    ],
    mode: "Classroom",
    imageSrc: "/images/courses/Classroom-3.jpg",
    href: "/courses",
  },
  {
    title: "Lean Black Belt Classroom",
    description:
      "Advanced in-person Lean training for project leaders and change agents. Develop expertise in managing complex improvement initiatives.",
    includes: [
      "Face-to-face instructor-led training",
      "Advanced Lean techniques",
      "Project leadership skills",
      "CSSC internationally accredited certificate",
    ],
    mode: "Classroom",
    imageSrc: "/images/courses/Classroom-2.jpg",
    href: "/courses",
  },
  {
    title: "DMAIC Black Belt Classroom",
    description:
      "Advanced in-person statistical training for those leading Six Sigma projects. Deeper analysis tools, change management, and stakeholder influence.",
    includes: [
      "Face-to-face instructor-led training",
      "Advanced statistical methods",
      "Change management & leadership",
      "CSSC internationally accredited certificate",
    ],
    mode: "Classroom",
    imageSrc: "/images/courses/Classroom-3.jpg",
    href: "/courses",
  },
  {
    title: "Root Cause Analysis Classroom",
    description:
      "Learn systematic approaches to identifying root causes of problems and implementing effective corrective actions. Essential for any improvement professional.",
    includes: [
      "Face-to-face instructor-led training",
      "RCA tools and frameworks",
      "Real-world problem-solving exercises",
      "Certificate of completion",
    ],
    mode: "Classroom",
    imageSrc: "/images/courses/Classroom-1.jpg",
    href: "/courses",
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
                  Need a tailored training programme for your organisation? We
                  design and deliver customised Six Sigma and Lean Management
                  courses to meet your specific operational challenges and
                  improvement goals. Training can be delivered on-site at your
                  premises or virtually.
                </p>
                <Button href="/contact" variant="filled" size="large">
                  Enquire now
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
