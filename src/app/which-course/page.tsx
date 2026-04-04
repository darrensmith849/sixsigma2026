import type { Metadata } from "next";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Which Six Sigma Course is Right for You? | Six Sigma South Africa",
  description:
    "Not sure which Six Sigma course to take? Use our guide to find the right belt level and training mode for your career goals.",
};

export default function WhichCoursePage() {
  return (
    <div className="pt-[80px]">
      <FadeIn>
        <section className="section">
          <div className="container text-center">
            <h1 className="mb-6">Which Course is Right for You?</h1>
            <p className="text-body text-[21px] leading-relaxed max-w-3xl mx-auto mb-10">
              Not sure where to start your Six Sigma journey? Use our guide
              below to help you choose the right course based on your
              experience level and career goals.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="section bg-light-grey">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  belt: "White Belt",
                  level: "Total Beginner",
                  description:
                    "If you are completely new to Six Sigma and want a free introduction to the basic concepts and terminology.",
                  duration: "6 hours of content",
                  price: "Free",
                },
                {
                  belt: "Yellow Belt",
                  level: "Foundation Level",
                  description:
                    "If you want to understand the Six Sigma methodology at a foundational level and learn to support project teams.",
                  duration: "2 Days / 14 hours online",
                  price: "From R4,998",
                },
                {
                  belt: "Green Belt",
                  level: "Practitioner Level",
                  description:
                    "If you have some project management experience and want to lead improvement projects using LEAN or DMAIC methodology.",
                  duration: "5 Days / 35 hours online",
                  price: "From R16,995",
                },
                {
                  belt: "Black Belt",
                  level: "Advanced / Leadership",
                  description:
                    "If you want to lead and manage Six Sigma projects at an organisational level with advanced statistical analysis skills.",
                  duration: "10 Days / 70 hours online",
                  price: "From R26,000",
                },
                {
                  belt: "5S",
                  level: "Short Course",
                  description:
                    "If you want to learn the 5S methodology for workplace organisation: Sort, Set in Order, Shine, Standardise, and Sustain.",
                  duration: "1 Day",
                  price: "R6,995",
                },
                {
                  belt: "Kaizen",
                  level: "Short Course",
                  description:
                    "If you want to learn continuous improvement principles and practices to drive operational excellence.",
                  duration: "1 Day",
                  price: "R6,995",
                },
              ].map((course) => (
                <div
                  key={course.belt}
                  className="bg-white rounded-lg p-6 flex flex-col"
                >
                  <div className="inline-block px-3 py-1 text-[14px] font-semibold rounded-full bg-green text-white mb-4 self-start">
                    {course.level}
                  </div>
                  <h3 className="text-heading font-semibold text-[24px] mb-2">
                    {course.belt}
                  </h3>
                  <p className="text-body text-[16px] leading-relaxed mb-4 flex-1">
                    {course.description}
                  </p>
                  <p className="text-body text-[14px] mb-1">
                    <strong>Duration:</strong> {course.duration}
                  </p>
                  <p className="text-green font-semibold text-[18px] mb-4">
                    {course.price}
                  </p>
                  <Button href="/courses" variant="filled" size="default">
                    View Courses
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="section bg-green">
          <div className="container text-center">
            <h2 className="font-semibold text-inverse mb-4">
              Still not sure?
            </h2>
            <p className="text-[21px] max-w-3xl mx-auto mb-8 leading-relaxed text-inverse/90">
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
