import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import JsonLd from "@/components/JsonLd";
import Eyebrow from "@/components/Eyebrow";
import CourseCard from "@/components/CourseCard";
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

const benefits = [
  { title: "CSSC accredited certificate", body: "Internationally recognised through CSSC USA on successful completion." },
  { title: "Experienced practitioners", body: "Trained and led by certified Six Sigma Black Belts with industry experience." },
  { title: "Flexible delivery", body: "Available in classroom, virtual instructor-led and self-paced online formats." },
  { title: "On-site available", body: "We deliver this course at your premises anywhere in South Africa or beyond." },
];

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  // Related courses: same topic, other modes
  const related = courses
    .filter((c) => c.topicSlug === course.topicSlug && c.slug !== course.slug)
    .slice(0, 3);

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
        <div className="relative z-10 container-wide py-20 md:py-28 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Eyebrow tone="white" className="mb-6">
                {course.topic} · {course.mode}
              </Eyebrow>
              <h1 className="!text-white mb-8">{course.title}</h1>
              <p className="text-[19px] md:text-[21px] text-white/85 leading-[1.65] max-w-[640px]">
                {course.summary}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/contact" variant="filled" size="large" trailingArrow>
                  Enquire now
                </Button>
                <Button href="/courses" variant="ghost-white" size="large">
                  All courses
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-white/10 [box-shadow:var(--shadow-xl)]">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Body: outline + sticky enquire card ─── */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Outline */}
            <FadeIn className="lg:col-span-7">
              <Eyebrow className="mb-5">Course outline</Eyebrow>
              <h2 className="mb-12">What you will learn</h2>
              <ol className="space-y-6">
                {course.outline.map((item, i) => (
                  <li key={item} className="flex items-start gap-5">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-[16px] font-bold text-green-700 [box-shadow:inset_0_0_0_1px_rgba(22,178,74,.2)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-2.5 text-[18px] leading-[1.6] text-ink-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>

              {/* What you'll get */}
              <div className="mt-20">
                <Eyebrow className="mb-5">What you&rsquo;ll get</Eyebrow>
                <h2 className="mb-12">Included with this course</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {benefits.map((b) => (
                    <div
                      key={b.title}
                      className="rounded-[20px] border border-ink-100 bg-white p-7 [box-shadow:var(--shadow-sm)]"
                    >
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-700">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-ink-900 mb-2">{b.title}</h4>
                      <p className="text-[15px] text-ink-500 leading-[1.6]">
                        {b.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Sticky enquire card */}
            <FadeIn className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-[24px] border border-ink-100 bg-white p-8 [box-shadow:var(--shadow-lg)]">
                  <Eyebrow className="mb-5">Enquire</Eyebrow>
                  <h3 className="mb-6">Reserve your seat</h3>

                  <dl className="space-y-5 mb-8 border-t border-b border-ink-100 py-6">
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Format
                      </dt>
                      <dd className="text-[15px] font-semibold text-ink-900 text-right">
                        {course.mode}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Duration
                      </dt>
                      <dd className="text-[15px] font-semibold text-ink-900 text-right">
                        {course.duration}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Accreditation
                      </dt>
                      <dd className="text-[15px] font-semibold text-ink-900 text-right">
                        CSSC USA
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Cities
                      </dt>
                      <dd className="text-[15px] font-semibold text-ink-900 text-right">
                        JHB · CPT · DBN · PE · PTA
                      </dd>
                    </div>
                  </dl>

                  <Button
                    href="/contact"
                    variant="filled"
                    size="large"
                    trailingArrow
                    className="w-full"
                  >
                    Enquire now
                  </Button>

                  <p className="mt-5 text-center text-[13px] text-ink-500">
                    Or call{" "}
                    <a href="tel:+27215270065" className="font-semibold text-green-700">
                      021 527 0065
                    </a>
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Related courses ─── */}
      {related.length > 0 && (
        <FadeIn>
          <section className="bg-ink-50 py-24 md:py-32">
            <div className="container-wide">
              <div className="mb-14 max-w-3xl">
                <Eyebrow>Other formats</Eyebrow>
                <h2 className="mt-5">
                  Same {course.topic}, different delivery
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((r) => (
                  <Link key={r.slug} href={`/courses/${r.slug}`} className="group block">
                    <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-ink-100 bg-white [box-shadow:var(--shadow-md)] transition-all duration-[var(--dur)] ease-[var(--ease)] group-hover:-translate-y-1 group-hover:[box-shadow:var(--shadow-xl)]">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={r.image}
                          alt={r.title}
                          fill
                          className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease)] group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-900 backdrop-blur-sm [box-shadow:var(--shadow-sm)]">
                          {r.mode}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <h3 className="text-[20px] font-bold text-ink-900 mb-3">
                          {r.shortTitle}
                        </h3>
                        <p className="text-[14px] text-ink-500 leading-[1.6] mb-6">
                          {r.duration}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-2 text-[14px] font-semibold text-green-700">
                          View course
                          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      )}
    </>
  );
}
