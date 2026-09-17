import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import BreadcrumbsJsonLd from "@/seo-kit/schema/breadcrumbs";
import { listContentPosts } from "@/seo-kit/content";

export const metadata: Metadata = buildMetadata({
  title: `Insights | ${SITE_NAME}`,
  description:
    "Original research, case studies and practitioner perspectives on Six Sigma, Lean and continuous improvement in South African industry.",
  path: "/insights",
});

const dateFmt = new Intl.DateTimeFormat("en-ZA", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function InsightsIndexPage() {
  const posts = listContentPosts("insights");

  return (
    <>
      <BreadcrumbsJsonLd
        siteUrl={SITE_URL}
        crumbs={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/insights" },
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
            Insights
          </Eyebrow>
          <h1 className="!text-white mx-auto max-w-4xl">
            Notes from the South African continuous-improvement frontline
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-[19px] md:text-[21px] text-white/80 leading-[1.65]">
            Original research, case studies and practitioner perspectives on
            Six Sigma and Lean in South African industry and the public sector.
          </p>
        </div>
      </section>

      {/* ─── Articles ─── */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-wide">
          {posts.length === 0 ? (
            <FadeIn>
              <div className="mx-auto max-w-2xl rounded-[24px] border border-dashed border-ink-200 bg-ink-50 p-12 text-center">
                <Eyebrow className="mb-5 mx-auto">In development</Eyebrow>
                <h2 className="mb-4">Original research, coming soon</h2>
                <p className="text-[16px] text-ink-500 leading-[1.65] mb-8">
                  We&rsquo;re putting together SA-specific case studies and an
                  annual <i>State of Quality Management in South Africa</i>{" "}
                  report. Want a heads-up when the first piece lands?
                </p>
                <Button
                  href="/contact#enquiry-form"
                  variant="filled"
                  size="default"
                  trailingArrow
                >
                  Add me to the list
                </Button>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((p) => (
                <FadeIn key={p.slug}>
                  <Link
                    href={`/insights/${p.slug}`}
                    className="group flex h-full flex-col rounded-[20px] border border-ink-100 bg-white p-8 [box-shadow:var(--shadow-md)] transition-all duration-[var(--dur)] hover:-translate-y-1 hover:[box-shadow:var(--shadow-xl)]"
                  >
                    <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-500 mb-4">
                      {dateFmt.format(new Date(p.frontmatter.datePublished))}
                      {p.frontmatter.tags && p.frontmatter.tags.length > 0 && (
                        <>
                          {" · "}
                          {p.frontmatter.tags[0]}
                        </>
                      )}
                    </p>
                    <h3 className="text-[22px] font-bold text-ink-900 mb-3">
                      {p.frontmatter.title}
                    </h3>
                    <p className="text-[15px] text-ink-500 leading-[1.6] mb-6">
                      {p.frontmatter.summary}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 text-[14px] font-semibold text-green-700">
                      Read article
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
