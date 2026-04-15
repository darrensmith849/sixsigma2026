import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCourseBySlug, getAllSlugs } from "@/data/courses";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import ShortCourseDetail from "@/components/ShortCourseDetail";
import CourseAccordion from "@/components/CourseAccordion";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };

  return {
    title: `${course.detailTitle ?? course.title} | Six Sigma South Africa`,
    description: course.detailDescription ?? course.description,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  if (course.beltLevel === "short") {
    return <ShortCourseDetail course={course} />;
  }

  const modeBadgeLabel =
    course.mode === "Online"
      ? "Online — Self-paced"
      : course.mode === "Virtual"
        ? "Virtual — Live instructor"
        : "Classroom — In person";

  const displayTitle = course.detailTitle ?? course.title;
  const displayDesc = course.detailDescription ?? course.description;
  const displayIncludes = course.detailIncludes ?? course.includes;

  return (
    <>
      {/* ───── Hero ───── */}
      <section className="pt-[80px]">
        <div className="relative">
          <div className="relative h-[280px] md:h-[340px]">
            <Image
              src={course.imageSrc}
              alt={displayTitle}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="max-w-2xl">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-block px-3.5 py-1 text-[13px] font-semibold rounded-full bg-green text-white">
                    {course.mode}
                  </span>
                  {course.isFree && (
                    <span className="inline-block px-3.5 py-1 text-[13px] font-semibold rounded-full bg-yellow-400 text-gray-900">
                      Free
                    </span>
                  )}
                </div>
                <h1 className="text-white font-bold text-[28px] md:text-[36px] lg:text-[42px] leading-[1.1] tracking-tight">
                  {displayTitle}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Quick Info Bar ───── */}
      <section className="bg-green">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-3 py-3.5">
            <div className="flex flex-wrap items-center gap-5 text-white text-[14px]">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {modeBadgeLabel}
              </span>
            </div>
            <Button href={`/contact?course=${course.slug}`} variant="white" size="default">
              Enquire Now
            </Button>
          </div>
        </div>
      </section>

      {/* ───── Main Content ───── */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: 2 cols */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <FadeIn>
                <div>
                  <h2 className="font-bold text-heading text-[24px] md:text-[28px] mb-3">
                    Course Overview
                  </h2>
                  <p className="text-body text-[16px] md:text-[17px] leading-relaxed">
                    {displayDesc}
                  </p>
                  {course.overviewText && (
                    <p className="text-body text-[16px] md:text-[17px] leading-relaxed mt-3">
                      {course.overviewText}
                    </p>
                  )}
                </div>
              </FadeIn>

              {/* What's Included */}
              <FadeIn>
                <div>
                  <h2 className="font-bold text-heading text-[22px] md:text-[26px] mb-3">
                    What&apos;s Included
                  </h2>
                  <ul className="space-y-2">
                    {displayIncludes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-heading text-[15px] md:text-[16px]"
                      >
                        <svg
                          className="w-4.5 h-4.5 text-green shrink-0 mt-0.5"
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

              {/* Who Should Attend */}
              {course.whoShouldAttend && (
                <FadeIn>
                  <div>
                    <h2 className="font-bold text-heading text-[22px] md:text-[26px] mb-3">
                      Who Should Attend?
                    </h2>
                    <p className="text-body text-[15px] md:text-[16px] leading-relaxed">
                      {course.whoShouldAttend}
                    </p>
                  </div>
                </FadeIn>
              )}

              {/* Results that your company can expect */}
              {course.companyResults && course.companyResults.length > 0 && (
                <FadeIn>
                  <div>
                    <h2 className="font-bold text-heading text-[22px] md:text-[26px] mb-3">
                      Results That Your Company Can Expect
                    </h2>
                    <ul className="space-y-1.5">
                      {course.companyResults.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-heading text-[15px]">
                          <span className="text-green mt-0.5 shrink-0">&#8226;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              )}

              {/* What you can expect */}
              {course.whatYouCanExpect && course.whatYouCanExpect.length > 0 && (
                <FadeIn>
                  <div>
                    <h2 className="font-bold text-heading text-[22px] md:text-[26px] mb-3">
                      What You Can Expect
                    </h2>
                    <ul className="space-y-2">
                      {course.whatYouCanExpect.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-heading text-[15px]">
                          <svg className="w-4 h-4 text-green shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              )}

              {/* Why choose us */}
              {course.whyChooseUs && course.whyChooseUs.length > 0 && (
                <FadeIn>
                  <div>
                    <h2 className="font-bold text-heading text-[22px] md:text-[26px] mb-3">
                      Why Choose Six Sigma South Africa as Training Provider?
                    </h2>
                    <ul className="space-y-2">
                      {course.whyChooseUs.map((item) => (
                        <li key={item.substring(0, 30)} className="flex items-start gap-2.5 text-heading text-[15px]">
                          <span className="text-green mt-0.5 shrink-0">&#8226;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              )}

              {/* Companies trained */}
              {course.companiesTrained && course.companiesTrained.length > 0 && (
                <FadeIn>
                  <div>
                    <h2 className="font-bold text-heading text-[22px] md:text-[26px] mb-3">
                      Some of the Companies We&apos;ve Trained
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                      {course.companiesTrained.map((company) => (
                        <span
                          key={company}
                          className="inline-block px-2.5 py-1 text-[13px] rounded-md bg-light-grey text-heading"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Course Content — Accordion */}
              {course.courseContent && course.courseContent.length > 0 && (
                <FadeIn>
                  <CourseAccordion
                    heading={course.courseContentHeading}
                    subheading={course.courseContentSubheading}
                    sections={course.courseContent}
                  />
                </FadeIn>
              )}

              {/* Video Section */}
              {course.videoHeading && (
                <FadeIn>
                  <div>
                    <h2 className="font-bold text-heading text-[22px] md:text-[26px] mb-3">
                      {course.videoHeading}
                    </h2>
                    {course.videoSrc ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                        <video
                          src={course.videoSrc}
                          controls
                          className="w-full h-full"
                          preload="metadata"
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-light-grey flex items-center justify-center">
                        <div className="text-center p-6">
                          <svg className="w-12 h-12 text-green mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                          </svg>
                          <p className="text-muted text-[14px]">
                            Video preview coming soon
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </FadeIn>
              )}

              {/* Classroom-specific details */}
              {course.classroomFee && (
                <FadeIn>
                  <div>
                    <h2 className="font-bold text-heading text-[22px] md:text-[26px] mb-3">
                      Classroom-Based Training
                    </h2>
                    <div className="space-y-2 text-heading text-[15px]">
                      <p><span className="font-semibold">Standard fee:</span> {course.classroomFee}</p>
                      {course.classroomDiscounts?.map((d) => (
                        <p key={d.substring(0, 20)}>{d}</p>
                      ))}
                      {course.classroomVenue && (
                        <p><span className="font-semibold">Venue:</span> {course.classroomVenue}</p>
                      )}
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Virtual-specific details */}
              {course.virtualFee && (
                <FadeIn>
                  <div>
                    <h2 className="font-bold text-heading text-[22px] md:text-[26px] mb-3">
                      Virtual Training
                    </h2>
                    <div className="space-y-2 text-heading text-[15px]">
                      <p><span className="font-semibold">Standard fee:</span> {course.virtualFee}</p>
                      {course.virtualHardware && (
                        <p><span className="font-semibold">Hardware:</span> {course.virtualHardware}</p>
                      )}
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>

            {/* Right: Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-[100px] rounded-xl bg-light-grey p-6 space-y-5">
                <h3 className="font-bold text-heading text-[20px]">
                  Course Details
                </h3>

                <div className="space-y-3 text-[14px]">
                  <div className="flex justify-between items-center py-2 border-b border-border-grey">
                    <span className="text-muted font-medium">Mode</span>
                    <span className="text-heading font-semibold">{course.mode}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border-grey">
                    <span className="text-muted font-medium">Duration</span>
                    <span className="text-heading font-semibold">{course.duration}</span>
                  </div>
                </div>

                <hr className="border-border-grey" />

                <div className="space-y-2.5">
                  <Button href={`/contact?course=${course.slug}`} variant="filled" size="default" className="w-full">
                    Enquire Now
                  </Button>
                  <Button href={`/book-a-course?course=${course.slug}`} variant="outline" size="default" className="w-full">
                    How to Book
                  </Button>
                </div>

                <p className="text-center text-[13px] text-muted">
                  Or{" "}
                  <Link href={`/contact?course=${course.slug}`} className="text-green font-semibold hover:underline">
                    get in touch
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Related Courses ───── */}
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
            <Button href={`/contact?course=${course.slug}`} variant="white" size="large">
              Contact Us
            </Button>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
