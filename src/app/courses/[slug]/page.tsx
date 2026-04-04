import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCourseBySlug, getAllSlugs } from "@/data/courses";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";

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
    title: `${course.title} | Six Sigma South Africa`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const modeBadgeLabel =
    course.mode === "Online"
      ? "Online — Self-paced"
      : course.mode === "Virtual"
        ? "Virtual — Live instructor"
        : "Classroom — In person";

  return (
    <>
      {/* ───── Hero ───── */}
      <section className="pt-[80px]">
        <div className="relative">
          {/* Image */}
          <div className="relative h-[340px] md:h-[420px]">
            <Image
              src={course.imageSrc}
              alt={course.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Overlay content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="max-w-3xl">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-block px-4 py-1.5 text-[14px] font-semibold rounded-full bg-green text-white">
                    {course.mode}
                  </span>
                  {course.isFree && (
                    <span className="inline-block px-4 py-1.5 text-[14px] font-semibold rounded-full bg-yellow-400 text-gray-900">
                      Free
                    </span>
                  )}
                </div>
                <h1
                  className="text-white font-bold"
                  style={{
                    fontSize: "clamp(32px, 4vw, 56px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {course.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Quick Info Bar ───── */}
      <section className="bg-green">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-4 py-5">
            <div className="flex flex-wrap items-center gap-6 text-white text-[16px]">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {modeBadgeLabel}
              </span>
              <span className="flex items-center gap-2 font-semibold text-[18px]">
                {course.price}
              </span>
            </div>
            <Button href="/contact" variant="white" size="default">
              Enquire Now
            </Button>
          </div>
        </div>
      </section>

      {/* ───── Main Content ───── */}
      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: 2 cols */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <FadeIn>
                <div>
                  <h2
                    className="font-bold mb-4"
                    style={{ color: "#5a5a5a", fontSize: "clamp(28px, 2.4vw, 40px)" }}
                  >
                    Course Overview
                  </h2>
                  <p
                    className="leading-relaxed"
                    style={{ color: "#5e5e5e", fontSize: "clamp(18px, 1.2vw, 21px)" }}
                  >
                    {course.description}
                  </p>
                </div>
              </FadeIn>

              {/* What's Included */}
              <FadeIn>
                <div>
                  <h2
                    className="font-bold mb-4"
                    style={{ color: "#5a5a5a", fontSize: "clamp(24px, 2vw, 32px)" }}
                  >
                    What&apos;s Included
                  </h2>
                  <ul className="space-y-3">
                    {course.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[18px]"
                        style={{ color: "#5a5a5a" }}
                      >
                        <svg
                          className="w-5 h-5 text-green shrink-0 mt-0.5"
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

            </div>

            {/* Right: Sidebar */}
            <div className="lg:col-span-1">
              <div
                className="sticky top-[100px] rounded-lg p-7 space-y-6"
                style={{ background: "#ececeb" }}
              >
                <h3
                  className="font-bold"
                  style={{ color: "#5a5a5a", fontSize: "24px" }}
                >
                  Course Details
                </h3>

                <div className="space-y-4 text-[16px]" style={{ color: "#5a5a5a" }}>
                  <div className="flex justify-between">
                    <span className="font-semibold">Mode</span>
                    <span>{course.mode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Duration</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Price</span>
                    <span className="font-semibold text-green">{course.price}</span>
                  </div>
                </div>

                <hr className="border-gray-300" />

                <div className="space-y-3">
                  <Button href="/contact" variant="filled" size="large" className="w-full">
                    Enquire Now
                  </Button>
                  <Button href="/book-a-course" variant="outline" size="large" className="w-full">
                    How to Book
                  </Button>
                </div>

                <p className="text-center text-[14px]" style={{ color: "#888" }}>
                  Or{" "}
                  <Link href="/contact" className="text-green font-semibold hover:underline">
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
        <section style={{ background: "#ececeb", padding: "64px 0" }}>
          <div className="container text-center">
            <h2
              className="font-bold mb-4"
              style={{ color: "#5a5a5a", fontSize: "clamp(28px, 2.4vw, 40px)" }}
            >
              Explore More Courses
            </h2>
            <p
              className="mx-auto mb-8 leading-relaxed"
              style={{ color: "#5e5e5e", fontSize: "clamp(18px, 1.2vw, 21px)", maxWidth: "700px" }}
            >
              Browse our full range of internationally accredited Six Sigma
              courses available online, virtually, and in the classroom.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
        <section className="bg-green" style={{ padding: "80px 0" }}>
          <div className="container text-center">
            <h2 className="font-semibold text-inverse mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-[21px] max-w-3xl mx-auto mb-8 leading-relaxed text-inverse/90">
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
