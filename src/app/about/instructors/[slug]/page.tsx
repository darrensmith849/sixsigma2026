import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import FadeIn from "@/components/FadeIn";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, PUBLISHER_ORG, SITE_NAME, SITE_URL } from "@/lib/seo";
import BreadcrumbsJsonLd from "@/seo-kit/schema/breadcrumbs";
import { buildPersonSchema } from "@/seo-kit/schema/person";
import { instructors, getInstructor } from "@/data/instructors";

export function generateStaticParams() {
  // Returns empty until src/data/instructors.ts is populated, so the dynamic
  // route is inert (no pages prerendered, requests 404). Once instructors land
  // the static pages spin up automatically.
  return instructors.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getInstructor(slug);
  if (!p) return { title: "Instructor not found" };
  return buildMetadata({
    title: `${p.name} — ${p.jobTitle} | ${SITE_NAME}`,
    description: p.bio,
    path: `/about/instructors/${p.slug}`,
    image: p.image,
  });
}

export default async function InstructorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getInstructor(slug);
  if (!p) notFound();

  const url = `${SITE_URL}/about/instructors/${p.slug}`;

  const personJsonLd = buildPersonSchema({
    url,
    name: p.name,
    jobTitle: p.jobTitle,
    description: p.bio,
    image: p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}`,
    email: p.email,
    worksFor: PUBLISHER_ORG,
    knowsAbout: p.knowsAbout,
    hasCredential: p.credentials.map((c) => ({
      name: c,
      credentialCategory: "Professional certification",
    })),
    sameAs: p.linkedinUrl ? [p.linkedinUrl] : [],
  });

  return (
    <>
      <JsonLd data={personJsonLd} />
      <BreadcrumbsJsonLd
        siteUrl={SITE_URL}
        crumbs={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
          { name: "Instructors", url: "/about/instructors" },
          { name: p.name, url: `/about/instructors/${p.slug}` },
        ]}
      />

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
        <div className="relative z-10 container-wide py-20 md:py-28 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Eyebrow tone="white" className="mb-6">
                {p.jobTitle}
              </Eyebrow>
              <h1 className="!text-white mb-8">{p.name}</h1>
              <p className="text-[19px] md:text-[21px] text-white/85 leading-[1.65] max-w-[640px]">
                {p.bio}
              </p>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[1/1] w-full overflow-hidden rounded-[24px] border border-white/10 [box-shadow:var(--shadow-xl)]">
                <Image
                  src={p.image}
                  alt={p.name}
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

      {/* ─── Body ─── */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Knows about + credentials */}
            <FadeIn className="lg:col-span-7">
              <Eyebrow className="mb-5">Expertise</Eyebrow>
              <h2 className="mb-10">What {p.name.split(" ")[0]} teaches</h2>
              <div className="flex flex-wrap gap-3 mb-16">
                {p.knowsAbout.map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center rounded-full bg-green-50 px-4 py-2 text-[14px] font-semibold text-green-700"
                  >
                    {k}
                  </span>
                ))}
              </div>

              <Eyebrow className="mb-5">Credentials</Eyebrow>
              <h2 className="mb-10">Qualifications</h2>
              <ul className="space-y-4">
                {p.credentials.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-4 text-[16px] text-ink-700"
                  >
                    <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            {/* Sticky details card */}
            <FadeIn className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-[24px] border border-ink-100 bg-white p-8 [box-shadow:var(--shadow-lg)]">
                  <Eyebrow className="mb-5">At a glance</Eyebrow>
                  <h3 className="mb-6">{p.name.split(" ")[0]}&rsquo;s details</h3>
                  <dl className="space-y-5 mb-6 border-t border-b border-ink-100 py-6">
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Experience
                      </dt>
                      <dd className="text-[15px] font-semibold text-ink-900 text-right">
                        {p.yearsExperience} years
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Role
                      </dt>
                      <dd className="text-[15px] font-semibold text-ink-900 text-right">
                        {p.jobTitle}
                      </dd>
                    </div>
                    {p.linkedinUrl && (
                      <div className="flex items-start justify-between gap-4">
                        <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                          LinkedIn
                        </dt>
                        <dd className="text-[15px] font-semibold text-ink-900 text-right">
                          <a
                            href={p.linkedinUrl}
                            target="_blank"
                            rel="noopener"
                            className="text-green-700 hover:underline"
                          >
                            View profile ↗
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                  <Button
                    href="/contact#enquiry-form"
                    variant="filled"
                    size="default"
                    trailingArrow
                    className="w-full"
                  >
                    Enquire about training
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Back to team ─── */}
      <section className="bg-ink-50 py-20">
        <div className="container-wide text-center">
          <Link
            href="/about/instructors"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-green-700 hover:underline"
          >
            ← View all instructors
          </Link>
        </div>
      </section>
    </>
  );
}
