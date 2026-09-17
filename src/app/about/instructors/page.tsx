import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import FadeIn from "@/components/FadeIn";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import BreadcrumbsJsonLd from "@/seo-kit/schema/breadcrumbs";
import { instructors } from "@/data/instructors";

export const metadata: Metadata = buildMetadata({
  title: `Our Instructors | ${SITE_NAME}`,
  description:
    "Meet the certified Six Sigma Black Belts and Master Black Belts who deliver Six Sigma South Africa training across the country.",
  path: "/about/instructors",
});

export default function InstructorsPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        siteUrl={SITE_URL}
        crumbs={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
          { name: "Instructors", url: "/about/instructors" },
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
        <div className="relative z-10 container-wide py-20 md:py-28 lg:py-40 text-center">
          <Eyebrow tone="white" className="mb-6 mx-auto">
            Our team
          </Eyebrow>
          <h1 className="!text-white mx-auto max-w-4xl">
            Certified practitioners, working coaches
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-[19px] md:text-[21px] text-white/80 leading-[1.65]">
            Our courses are delivered by working Six Sigma practitioners with
            decades of combined experience in South African industry and the
            public sector.
          </p>
        </div>
      </section>

      {/* ─── Roster ─── */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-wide">
          {instructors.length === 0 ? (
            // Empty state — until src/data/instructors.ts is populated, show
            // a graceful placeholder so the route doesn't 404 if someone
            // arrives via a stale link. AI crawlers see a clear "team profiles
            // updating" message rather than missing content.
            <FadeIn>
              <div className="mx-auto max-w-2xl rounded-[24px] border border-dashed border-ink-200 bg-ink-50 p-12 text-center">
                <Eyebrow className="mb-5 mx-auto">Updating</Eyebrow>
                <h2 className="mb-4">Our team profiles are being updated</h2>
                <p className="text-[16px] text-ink-500 leading-[1.65] mb-8">
                  We&rsquo;re refreshing the instructor profiles. Every Six
                  Sigma South Africa course is led by a CSSC-certified Black
                  Belt with industry experience. Get in touch to learn more
                  about the instructor leading your course.
                </p>
                <Button
                  href="/contact#enquiry-form"
                  variant="filled"
                  size="default"
                  trailingArrow
                >
                  Ask about our trainers
                </Button>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructors.map((p) => (
                <FadeIn key={p.slug}>
                  <Link
                    href={`/about/instructors/${p.slug}`}
                    className="group block"
                  >
                    <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-ink-100 bg-white [box-shadow:var(--shadow-md)] transition-all duration-[var(--dur)] ease-[var(--ease)] group-hover:-translate-y-1 group-hover:[box-shadow:var(--shadow-xl)]">
                      <div className="relative aspect-[1/1] overflow-hidden bg-ink-50">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <h3 className="text-[22px] font-bold text-ink-900 mb-1">
                          {p.name}
                        </h3>
                        <p className="text-[14px] text-green-700 font-semibold mb-4">
                          {p.jobTitle}
                        </p>
                        <p className="text-[14px] text-ink-500 leading-[1.6] mb-6 line-clamp-3">
                          {p.bio}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-2 text-[14px] font-semibold text-green-700">
                          View profile
                          <svg
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 8h10M9 4l4 4-4 4" />
                          </svg>
                        </span>
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
