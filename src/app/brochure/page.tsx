import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Request a Brochure | ${SITE_NAME}`,
  description:
    "Request our Six Sigma training brochure and course catalogue. Full details on White, Yellow, Green and Black Belt programmes available in South Africa.",
  path: "/brochure",
});

const includes = [
  "Full Six Sigma belt curriculum (White → Black)",
  "Lean Management and short course details",
  "Classroom, virtual and self-paced options",
  "Pricing and group discounts",
  "On-site corporate training packages",
  "Upcoming dates across all 5 cities",
];

export default function BrochurePage() {
  return (
    <>
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
                Free download
              </Eyebrow>
              <h1 className="!text-white mb-8">
                Get the full Six Sigma course catalogue
              </h1>
              <p className="text-[19px] md:text-[21px] text-white/85 leading-[1.65] max-w-[640px] mb-10">
                Our brochure has everything you need to choose the right
                programme — outlines, pricing, dates and delivery formats — in
                one downloadable PDF.
              </p>
              <Button href="/contact" variant="filled" size="large" trailingArrow>
                Request brochure
              </Button>
            </div>

            {/* Mocked brochure visual */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-[320px]">
                <div className="aspect-[3/4] rotate-[3deg] rounded-[20px] border border-white/10 bg-white p-8 [box-shadow:var(--shadow-xl)]">
                  <div className="flex h-full flex-col">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-green-700">
                      Six Sigma South Africa
                    </div>
                    <div className="mt-2 text-[24px] font-extrabold leading-[1.1] text-ink-900">
                      Course<br />Catalogue<br />2026
                    </div>
                    <div className="mt-6 flex-1 space-y-2">
                      <div className="h-2 w-3/4 rounded-full bg-ink-100" />
                      <div className="h-2 w-full rounded-full bg-ink-100" />
                      <div className="h-2 w-5/6 rounded-full bg-ink-100" />
                    </div>
                    <div className="mt-6">
                      <div className="inline-block rounded-full bg-green-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                        CSSC USA
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 top-6 -z-10 h-full w-full -rotate-[3deg] rounded-[20px] border border-white/10 bg-white/40" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── What's inside ─── */}
      <FadeIn>
        <section className="bg-white py-24 md:py-32">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <Eyebrow className="mb-5">Inside</Eyebrow>
                <h2 className="mb-6">What&rsquo;s in the brochure</h2>
                <p className="text-[18px] text-ink-500 leading-[1.65]">
                  Six pages of essential reference material for anyone
                  evaluating Six Sigma training for themselves or their team.
                </p>
              </div>
              <ul className="lg:col-span-7 space-y-3">
                {includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 rounded-[16px] border border-ink-100 bg-white px-6 py-5 [box-shadow:var(--shadow-sm)]"
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span className="text-[16px] text-ink-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
