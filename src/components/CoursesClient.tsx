"use client";

import { useState } from "react";
import Image from "next/image";
import CourseCard from "./CourseCard";
import Button from "./Button";
import FadeIn from "./FadeIn";
import Eyebrow from "./Eyebrow";

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
    href: "/courses/white-belt-online",
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
    href: "/courses/yellow-belt-online",
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
    href: "/courses/lean-green-belt-online",
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
    href: "/courses/dmaic-green-belt-online",
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
    href: "/courses/lean-black-belt-online",
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
    href: "/courses/dmaic-black-belt-online",
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
    href: "/courses/yellow-belt-virtual",
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

    href: "/courses/lean-green-belt-virtual",
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
    href: "/courses/dmaic-green-belt-virtual",
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
    href: "/courses/lean-black-belt-virtual",
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
    href: "/courses/dmaic-black-belt-virtual",
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
    href: "/courses/yellow-belt-classroom",
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
    href: "/courses/lean-green-belt-classroom",
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
    href: "/courses/dmaic-green-belt-classroom",
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
    imageSrc: "/images/courses/Classroom-4.jpg",
    href: "/courses/lean-black-belt-classroom",
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
    imageSrc: "/images/courses/Classroom-5.jpg",
    href: "/courses/dmaic-black-belt-classroom",
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
    href: "/courses/root-cause-analysis-classroom",
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

  const modes: Mode[] = ["Online", "Virtual", "Classroom"];

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
        <div className="relative z-10 container-wide py-20 md:py-28 lg:py-40 text-center">
          <Eyebrow tone="white" className="mb-6 mx-auto">
            All courses · CSSC accredited
          </Eyebrow>
          <h1 className="!text-white mx-auto max-w-4xl">
            Six Sigma courses in South Africa
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-[19px] md:text-[21px] text-white/80 leading-[1.65]">
            Internationally accredited Six Sigma training delivered online,
            virtually and in the classroom. Choose the format that fits your
            schedule and learning style.
          </p>

          {/* Mode pills inside hero */}
          <div className="mt-12 inline-flex rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur-sm">
            {modes.map((m) => (
              <button
                key={m}
                onClick={() => setActiveMode(m)}
                className={`relative px-7 py-3 text-[14px] font-semibold uppercase tracking-[0.10em] rounded-full transition-all duration-[var(--dur)] ease-[var(--ease)] ${
                  activeMode === m
                    ? "bg-white text-ink-900"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Course grid on soft surface ─── */}
      <section className="bg-ink-50 py-24 md:py-32">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <FadeIn key={course.title}>
                <CourseCard
                  title={course.title}
                  description={course.description}
                  includes={course.includes}
                  mode={course.mode}
                  imageSrc={course.imageSrc}
                  href={course.href}
                  isFree={course.isFree}
                />
              </FadeIn>
            ))}

            {/* "Not sure which" inline card */}
            <FadeIn>
              <div className="flex h-full flex-col justify-center rounded-[20px] border border-dashed border-green-500/40 bg-green-50 p-10">
                <Eyebrow className="mb-5">Need help?</Eyebrow>
                <h3 className="mb-4 text-ink-900">
                  Not sure which course is right for you?
                </h3>
                <p className="text-[15px] text-ink-700 leading-[1.6] mb-7">
                  Tell us your role, your goals and your team size, and
                  we&rsquo;ll recommend the best fit within one business day.
                </p>
                <Button href="/contact#enquiry-form" variant="filled" size="default" trailingArrow>
                  Talk to us
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Custom training split ─── */}
      <FadeIn>
        <section className="bg-white py-24 md:py-32">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-ink-100 [box-shadow:var(--shadow-xl)]">
                  <Image
                    src="/images/courses/custom-training.jpg"
                    alt="Custom corporate training session"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="lg:col-span-6">
                <Eyebrow className="mb-5">Bespoke programmes</Eyebrow>
                <h2 className="mb-6">Custom training, tailored to your team</h2>
                <p className="text-[18px] text-ink-500 leading-[1.65] mb-10 max-w-[540px]">
                  Need a programme designed for your specific operational
                  challenges? We design and deliver customised Six Sigma and
                  Lean Management courses on-site at your premises or virtually,
                  anywhere in South Africa.
                </p>
                <Button href="/contact#enquiry-form" variant="filled" size="large" trailingArrow>
                  Enquire about custom training
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
