import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { courses, getCourse } from "./courseData";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Course not found" };
  return buildMetadata({
    title: `${course.title} | ${SITE_NAME}`,
    description: course.description,
    path: `/courses/${course.slug}`,
    image: course.image,
  });
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    url: `${SITE_URL}/courses/${course.slug}`,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.mode,
      courseWorkload: course.duration,
    },
  };

  return (
    <>
      <JsonLd data={courseJsonLd} />
      <div className="pt-[80px]">
        <FadeIn>
          <section className="relative">
            <div className="relative w-full h-[300px] md:h-[450px] bg-light-grey">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
            <div className="bg-green">
              <div className="container py-12 md:py-16">
                <p className="text-inverse/80 text-[18px] font-semibold mb-2 uppercase tracking-wide">
                  {course.topic} · {course.mode}
                </p>
                <h1 className="!text-inverse mb-6">{course.title}</h1>
                <p className="text-inverse/90 text-[20px] md:text-[24px] leading-relaxed max-w-3xl">
                  {course.summary}
                </p>
                <p className="text-inverse/90 text-[18px] mt-6">
                  <strong>Duration:</strong> {course.duration}
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="container py-16 md:py-24 max-w-4xl">
            <h2 className="mb-8">What you will learn</h2>
            <ul className="space-y-3 text-body text-[20px] leading-relaxed mb-12 list-disc pl-6">
              {course.outline.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact" variant="filled" size="large">
                Enquire Now
              </Button>
              <Button href="/courses" variant="outline" size="large">
                View all courses
              </Button>
            </div>
          </section>
        </FadeIn>
      </div>
    </>
  );
}
