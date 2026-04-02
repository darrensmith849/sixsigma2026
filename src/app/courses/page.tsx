import type { Metadata } from "next";
import CourseCard from "@/components/CourseCard";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title:
    "Six Sigma Courses in South Africa | Training & Certification",
  description:
    "Internationally accredited Six Sigma courses in South Africa. White Belt, Yellow Belt, Green Belt, Black Belt certification training available online, virtually, and in the classroom.",
};

const onlineCourses = [
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
    modes: ["Online"],
    imageSrc: "/images/courses/Online-1.jpg",
    href: "/courses",
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
    modes: ["Online"],
    imageSrc: "/images/courses/Online-3.jpg",
    href: "/courses",
  },
  {
    title: "Lean Green Belt Online",
    description:
      "Focus on the reduction of waste in all its forms throughout the operation. Learn 5S, visual factory principles, and how to identify and eliminate material and information flow waste.",
    includes: [
      "Lean methodology training",
      "5S and visual factory",
      "Waste reduction techniques",
      "CSSC internationally accredited certificate",
    ],
    modes: ["Online"],
    imageSrc: "/images/courses/Online-1.jpg",
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
    modes: ["Online"],
    imageSrc: "/images/courses/Online-3.jpg",
    href: "/courses",
  },
];

const virtualCourses = [
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
    modes: ["Virtual"],
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
    modes: ["Virtual"],
    imageSrc: "/images/courses/Virtual-2.jpg",
    href: "/courses",
  },
  {
    title: "DMAIC Green Belt Virtual",
    description:
      "Comprehensive live training in the DMAIC methodology. Problem solvers learn to apply the right tools at the right time to maximise efficiency in defining, measuring, analysing, improving, and controlling critical processes.",
    includes: [
      "Live virtual instructor-led sessions",
      "Full DMAIC methodology",
      "Statistical analysis tools",
      "CSSC internationally accredited certificate",
      "SigmaXL software trial",
    ],
    modes: ["Virtual"],
    imageSrc: "/images/courses/Virtual-3.jpg",
    href: "/courses",
  },
  {
    title: "Lean Black Belt Virtual",
    description:
      "Advanced Lean training for those managing Six Sigma projects. Focus on deeper waste elimination strategies, change management, and stakeholder influence across the organisation.",
    includes: [
      "Live virtual instructor-led sessions",
      "Advanced Lean techniques",
      "Change management training",
      "CSSC internationally accredited certificate",
    ],
    modes: ["Virtual"],
    imageSrc: "/images/courses/Virtual-5.jpg",
    href: "/courses",
  },
  {
    title: "DMAIC Black Belt Virtual",
    description:
      "Advanced statistical training and analysis tools for project leaders. Focus on deeper analysis, change management, and stakeholder influence with comprehensive project coaching.",
    includes: [
      "Live virtual instructor-led sessions",
      "Advanced statistical methods",
      "Change management & leadership",
      "CSSC internationally accredited certificate",
      "SigmaXL software trial",
    ],
    modes: ["Virtual"],
    imageSrc: "/images/courses/Virtual-6.jpg",
    href: "/courses",
  },
];

const classroomCourses = [
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
    modes: ["Classroom"],
    imageSrc: "/images/courses/Classroom-1.jpg",
    href: "/courses",
  },
  {
    title: "Lean Green Belt Classroom",
    description:
      "In-person Lean Six Sigma training focused on waste reduction methodologies. Hands-on workshops and real-world case studies in a collaborative classroom environment.",
    includes: [
      "Face-to-face instructor-led training",
      "Lean tools and workshops",
      "Real-world case studies",
      "CSSC internationally accredited certificate",
    ],
    modes: ["Classroom"],
    imageSrc: "/images/courses/Classroom-2.jpg",
    href: "/courses",
  },
  {
    title: "DMAIC Green Belt Classroom",
    description:
      "Comprehensive in-person DMAIC training with hands-on statistical exercises. Green Belts are the problem solvers assigned to Black Belt projects, applying the right tools to maximise efficiency.",
    includes: [
      "Face-to-face instructor-led training",
      "Full DMAIC methodology",
      "Hands-on statistical exercises",
      "CSSC internationally accredited certificate",
      "SigmaXL software trial",
    ],
    modes: ["Classroom"],
    imageSrc: "/images/courses/Classroom-4.jpg",
    href: "/courses",
  },
  {
    title: "Lean Black Belt Classroom",
    description:
      "Advanced in-person Lean training for project leaders and change agents. Develop expertise in managing complex improvement initiatives across the organisation.",
    includes: [
      "Face-to-face instructor-led training",
      "Advanced Lean techniques",
      "Project leadership skills",
      "CSSC internationally accredited certificate",
    ],
    modes: ["Classroom"],
    imageSrc: "/images/courses/Classroom-1.jpg",
    href: "/courses",
  },
  {
    title: "DMAIC Black Belt Classroom",
    description:
      "Advanced in-person statistical training for those leading Six Sigma projects. Deeper analysis tools, change management, and stakeholder influence with project-based coaching.",
    includes: [
      "Face-to-face instructor-led training",
      "Advanced statistical methods",
      "Change management & leadership",
      "CSSC internationally accredited certificate",
      "SigmaXL software trial",
    ],
    modes: ["Classroom"],
    imageSrc: "/images/courses/Classroom-2.jpg",
    href: "/courses",
  },
  {
    title: "Root Cause Analysis Classroom",
    description:
      "Learn systematic approaches to identifying the root causes of problems and implementing effective corrective actions. Essential for any process improvement professional.",
    includes: [
      "Face-to-face instructor-led training",
      "RCA tools and frameworks",
      "Real-world problem-solving exercises",
      "Certificate of completion",
    ],
    modes: ["Classroom"],
    imageSrc: "/images/courses/Classroom-4.jpg",
    href: "/courses",
  },
];

export default function CoursesPage() {
  return (
    <div className="pt-[80px]">
      {/* ───── Green Hero ───── */}
      <section className="bg-green py-16 md:py-24">
        <div className="container text-center">
          <h1 className="!text-inverse mb-6">
            Six Sigma Courses in South Africa
          </h1>
          <p className="text-inverse/90 text-[20px] md:text-[24px] leading-relaxed max-w-4xl mx-auto">
            Internationally accredited Six Sigma training and certification
            courses available online, virtually, and in the classroom.
            Training available in{" "}
            <a
              href="/contact"
              className="!text-inverse underline underline-offset-2 hover:!text-inverse/80"
            >
              Johannesburg
            </a>
            ,{" "}
            <a
              href="/contact"
              className="!text-inverse underline underline-offset-2 hover:!text-inverse/80"
            >
              Cape Town
            </a>
            ,{" "}
            <a
              href="/contact"
              className="!text-inverse underline underline-offset-2 hover:!text-inverse/80"
            >
              Durban
            </a>
            ,{" "}
            <a
              href="/contact"
              className="!text-inverse underline underline-offset-2 hover:!text-inverse/80"
            >
              Pretoria
            </a>{" "}
            and on-site across South Africa.
          </p>
        </div>
      </section>

      {/* ───── Course Intro ───── */}
      <FadeIn>
        <section className="section">
          <div className="container">
            <SectionHeading
              subtitle="Explore our comprehensive range of Six Sigma and Lean courses, from White Belt through to Black Belt. All certifications are internationally accredited through CSSC (USA). Choose the delivery mode that suits you best."
            >
              Our Course Catalogue
            </SectionHeading>

            {/* Delivery mode key */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green" />
                <span className="text-[16px] text-body">
                  <strong className="text-heading">Online</strong> — Self-paced e-learning
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-hover" />
                <span className="text-[16px] text-body">
                  <strong className="text-heading">Virtual</strong> — Live instructor-led via video
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-dark" />
                <span className="text-[16px] text-body">
                  <strong className="text-heading">Classroom</strong> — In-person training in SA
                </span>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Online Courses ───── */}
      <FadeIn>
        <section className="section bg-light-grey">
          <div className="container">
            <SectionHeading subtitle="Study at your own pace with our self-paced e-learning courses. Access your materials 24/7 from anywhere.">
              Online Courses
            </SectionHeading>
            <div className="grid md:grid-cols-2 gap-8 mt-10">
              {onlineCourses.map((course) => (
                <CourseCard key={course.title} {...course} />
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Virtual Courses ───── */}
      <FadeIn>
        <section className="section">
          <div className="container">
            <SectionHeading subtitle="Join live, instructor-led sessions from the comfort of your home or office. Interactive training with real-time support.">
              Virtual Courses
            </SectionHeading>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {virtualCourses.map((course) => (
                <CourseCard key={course.title} {...course} />
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Classroom Courses ───── */}
      <FadeIn>
        <section className="section bg-light-grey">
          <div className="container">
            <SectionHeading subtitle="Face-to-face training in Johannesburg, Cape Town, Durban, Pretoria, and on-site at your organisation.">
              Classroom Courses
            </SectionHeading>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {classroomCourses.map((course) => (
                <CourseCard key={course.title} {...course} />
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Belt Comparison ───── */}
      <FadeIn>
        <section className="section">
          <div className="container">
            <SectionHeading subtitle="Understanding the differences between belt levels helps you choose the right course for your career goals.">
              Understanding the Belt Levels
            </SectionHeading>

            <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
              <div className="bg-light-grey rounded-lg p-6">
                <h3 className="text-heading font-semibold mb-3">
                  Yellow Belt
                </h3>
                <p className="text-body text-[18px] leading-relaxed mb-3">
                  The foundational level covering the understanding of Six Sigma
                  methodology. Participants become part of a project team,
                  reviewing process improvements that support the project.
                </p>
                <p className="text-muted text-[15px]">
                  <strong className="text-heading">Role:</strong> Project team
                  support member
                </p>
              </div>

              <div className="bg-light-grey rounded-lg p-6">
                <h3 className="text-heading font-semibold mb-3">
                  Green Belt
                </h3>
                <p className="text-body text-[18px] leading-relaxed mb-3">
                  Learn the tips and techniques for effective Six Sigma
                  execution. Receive fundamental training in Define, Measure,
                  Analyse, Improve and Control (DMAIC).
                </p>
                <p className="text-muted text-[15px]">
                  <strong className="text-heading">Role:</strong> Problem solver
                  assigned to Black Belt projects
                </p>
              </div>

              <div className="bg-light-grey rounded-lg p-6">
                <h3 className="text-heading font-semibold mb-3">
                  Black Belt
                </h3>
                <p className="text-body text-[18px] leading-relaxed mb-3">
                  Advanced training in deeper analysis tools and change
                  management. Black Belts lead Six Sigma projects within their
                  organisations and coach project teams.
                </p>
                <p className="text-muted text-[15px]">
                  <strong className="text-heading">Role:</strong> Project leader,
                  coach, and advisor
                </p>
              </div>

              <div className="bg-light-grey rounded-lg p-6">
                <h3 className="text-heading font-semibold mb-3">
                  Lean vs DMAIC
                </h3>
                <p className="text-body text-[18px] leading-relaxed mb-3">
                  <strong className="text-heading">Lean:</strong> Focuses on
                  waste reduction using 5S and visual factory. Best suited for
                  manufacturing environments.
                </p>
                <p className="text-body text-[18px] leading-relaxed">
                  <strong className="text-heading">DMAIC:</strong> Focuses on
                  variation reduction using statistical methods. Best suited for
                  process environments.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── CTA ───── */}
      <FadeIn>
        <CTASection
          heading="Not sure which course is right for you?"
          description="Get in touch with our team and we will help you find the best course for your career goals and organisational needs."
          buttonText="Enquire Now"
          buttonHref="/contact"
          variant="green"
        />
      </FadeIn>
    </div>
  );
}
