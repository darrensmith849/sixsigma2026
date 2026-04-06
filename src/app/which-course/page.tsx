import type { Metadata } from "next";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Which Six Sigma Course is Right for You? | Six Sigma South Africa",
  description:
    "Not sure which Six Sigma course to take? Use our guide to find the right belt level and training mode for your career goals.",
};

const courses = [
  {
    belt: "White Belt",
    level: "Total Beginner",
    description:
      "If you are completely new to Six Sigma and want a free introduction to the basic concepts and terminology.",
    duration: "6 hours of content",
    price: "Free",
    href: "/courses/online-white-belt",
    accent: "bg-gray-100 text-gray-600 border-gray-200",
  },
  {
    belt: "Yellow Belt",
    level: "Foundation Level",
    description:
      "If you want to understand the Six Sigma methodology at a foundational level and learn to support project teams.",
    duration: "2 Days / 14 hours online",
    price: "From R4,998",
    href: "/courses/online-yellow-belt",
    accent: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  {
    belt: "Green Belt",
    level: "Practitioner Level",
    description:
      "If you have some project management experience and want to lead improvement projects using LEAN or DMAIC methodology.",
    duration: "5 Days / 35 hours online",
    price: "From R16,995",
    href: "/courses/online-lean-green-belt",
    accent: "bg-green/10 text-green border-green/20",
  },
  {
    belt: "Black Belt",
    level: "Advanced / Leadership",
    description:
      "If you want to lead and manage Six Sigma projects at an organisational level with advanced statistical analysis skills.",
    duration: "10 Days / 70 hours online",
    price: "From R26,000",
    href: "/courses/online-lean-black-belt",
    accent: "bg-heading/5 text-heading border-heading/15",
  },
  {
    belt: "5S",
    level: "Short Course",
    description:
      "If you want to learn the 5S methodology for workplace organisation: Sort, Set in Order, Shine, Standardise, and Sustain.",
    duration: "1 Day",
    price: "R6,995",
    href: "/courses/classroom-5s",
    accent: "bg-green/10 text-green border-green/20",
  },
  {
    belt: "Kaizen",
    level: "Short Course",
    description:
      "If you want to learn continuous improvement principles and practices to drive operational excellence.",
    duration: "1 Day",
    price: "R6,995",
    href: "/courses/classroom-kaizen",
    accent: "bg-green/10 text-green border-green/20",
  },
];

export default function WhichCoursePage() {
  return (
    <div className="pt-[80px]">
      {/* ───── Hero ───── */}
      <section className="relative bg-green py-12 md:py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green via-green to-green-hover opacity-60" />
        <div className="container text-center relative z-10">
          <h1 className="!text-inverse mb-3 text-[32px] md:text-[38px]">
            Which Course is Right for You?
          </h1>
          <p className="text-inverse/85 text-[16px] md:text-[18px] leading-relaxed max-w-xl mx-auto">
            Not sure where to start your Six Sigma journey? Use our guide
            below to help you choose the right course based on your
            experience level and career goals.
          </p>
        </div>
      </section>

      {/* ───── Belt Progression ───── */}
      <FadeIn>
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="text-center mb-10">
              <p className="text-green text-[12px] font-bold uppercase tracking-[0.15em] mb-2">
                Your Path
              </p>
              <h2 className="text-heading font-bold text-[24px] md:text-[28px]">
                Belt Levels &amp; Short Courses
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[980px] mx-auto">
              {courses.map((course) => (
                <div
                  key={course.belt}
                  className="bg-white rounded-xl border border-border-grey/60 p-6 flex flex-col shadow-sm card-hover"
                >
                  <span className={`inline-block self-start px-3 py-1 text-[12px] font-semibold rounded-full border mb-4 ${course.accent}`}>
                    {course.level}
                  </span>
                  <h3 className="text-heading font-bold text-[22px] mb-2">
                    {course.belt}
                  </h3>
                  <p className="text-body text-[14px] md:text-[15px] leading-relaxed mb-5 flex-1">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mb-4 text-[13px]">
                    <span className="text-muted">{course.duration}</span>
                    <span className="text-green font-bold text-[16px]">{course.price}</span>
                  </div>
                  <Button href={course.href} variant="filled" size="default" className="w-full">
                    View Course
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── CTA ───── */}
      <FadeIn>
        <section className="bg-green py-12 md:py-14">
          <div className="container text-center">
            <h2 className="font-semibold text-inverse text-[24px] md:text-[28px] mb-3">
              Still not sure?
            </h2>
            <p className="text-[16px] md:text-[17px] max-w-xl mx-auto mb-6 leading-relaxed text-inverse/85">
              Get in touch with our team and we will help you find the best
              course for your career goals and organisational needs.
            </p>
            <Button href="/contact" variant="white" size="large">
              Contact Us
            </Button>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
