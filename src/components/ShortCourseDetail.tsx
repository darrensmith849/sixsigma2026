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
  const primaryCta = course.ctaLabels?.primary ?? "Enquire Now";
  const secondaryCta = course.ctaLabels?.secondary ?? "How to Book";

  return (
    <>
      {/* ───── Background Image Strip ───── */}
      <section className="pt-[80px]">
        <div className="relative h-[200px] md:h-[260px]">
          <Image
            src={course.imageSrc}
            alt={course.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </section>

      {/* ───── Title + Description + Sidebar Card ───── */}
      <section className="bg-white">
        <div className="container">
          <div className="lg:flex lg:gap-10 py-10 md:py-14">
            {/* Left: Title and description */}
            <div className="lg:flex-1 lg:max-w-[60%]">
              <h1 className="font-bold text-heading text-[28px] md:text-[36px] lg:text-[42px] leading-[1.1] tracking-tight">
                {course.title}
              </h1>

              <div className="mt-4 mb-5 rounded-full w-[50px] h-[3px] bg-green" />

              <p className="text-body text-[16px] md:text-[17px] leading-relaxed mb-6">
                {course.description}
              </p>

              <a
                href="#course-content"
                className="inline-flex items-center gap-2 text-heading font-semibold text-[15px] hover:text-green transition-colors"
              >
                <svg className="w-5 h-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                View Full Course Details
              </a>
            </div>

            {/* Right: Sidebar Card */}
            <div className="mt-8 lg:mt-0 lg:w-[340px] xl:w-[360px] shrink-0">
              <div className="bg-white rounded-xl overflow-hidden border border-border-grey shadow-sm lg:-mt-24">
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
                  <p className="font-semibold text-heading text-[16px]">
                    Course includes:
                  </p>

                  <ul className="space-y-2">
                    {course.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[14px] text-heading">
                        <svg className="w-4 h-4 text-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-2.5 pt-1">
                    <Button href="/contact" variant="outline" size="default" className="flex-1">
                      {primaryCta === "Get Quote" ? "Get Quote" : primaryCta}
                    </Button>
                    <Button href="/book-a-course" variant="filled" size="default" className="flex-1">
                      {secondaryCta === "Book Course" ? "Book Course" : secondaryCta}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Course Content ───── */}
      {course.courseContent && course.courseContent.length > 0 && (
        <FadeIn>
          <section id="course-content" className="bg-white pb-12 md:pb-16 scroll-mt-[80px]">
            <div className="container">
              <div className="max-w-3xl">
                <CourseAccordion
                  heading={course.courseContentHeading}
                  subheading={course.courseContentSubheading}
                  sections={course.courseContent}
                />
              </div>
            </div>
          </section>
        </FadeIn>
      )}

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
