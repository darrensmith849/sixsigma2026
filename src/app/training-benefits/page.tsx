import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import Eyebrow from "@/components/Eyebrow";
import CTASection from "@/components/CTASection";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Benefits of Six Sigma Training | ${SITE_NAME}`,
  description:
    "Discover the business and career benefits of Six Sigma training — from reduced costs and improved quality to higher employability and faster promotion.",
  path: "/training-benefits",
});

const benefits = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 14l4-4 4 4 5-5" /></svg>
    ),
    title: "Reduce waste and cost",
    body: "Six Sigma gives your teams the tools to identify waste, remove it, and lock in the improvement. The result is lower operating costs and healthier margins.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    title: "Improve quality and consistency",
    body: "By reducing process variation you improve the customer experience, cut rework, and build a reputation for reliability.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    ),
    title: "Data-driven decisions",
    body: "Six Sigma gives your teams a common statistical language and a structured way to make decisions based on evidence rather than opinion.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
    title: "Career advancement",
    body: "Six Sigma certification is recognised globally and is one of the most in-demand skills on hiring managers' shortlists for operations, quality and continuous improvement roles.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    ),
    title: "Cross-functional leadership",
    body: "Green and Black Belt training prepares you to lead improvement projects that span departments, giving you exposure and credibility across the business.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
    ),
    title: "Culture of improvement",
    body: "Training a critical mass of staff in Six Sigma seeds a culture where everyone is looking for ways to work smarter — the compounding effect over years is transformative.",
  },
];

export default function TrainingBenefitsPage() {
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
        <div className="relative z-10 container-wide py-28 lg:py-40 text-center">
          <Eyebrow tone="white" className="mb-6 mx-auto">
            Why train with us
          </Eyebrow>
          <h1 className="!text-white mx-auto max-w-4xl">
            The business case for Six Sigma training
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-[19px] md:text-[21px] text-white/80 leading-[1.65]">
            Six measurable outcomes our clients see most often after rolling
            out Six Sigma training across their teams.
          </p>
        </div>
      </section>

      {/* ─── Benefits grid ─── */}
      <FadeIn>
        <section className="bg-white py-24 md:py-32">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-[24px] border border-ink-100 bg-white p-10 [box-shadow:var(--shadow-md)] transition-all duration-[var(--dur)] hover:-translate-y-1 hover:[box-shadow:var(--shadow-xl)]"
                >
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-700">
                    {b.icon}
                  </div>
                  <h3 className="mb-4">{b.title}</h3>
                  <p className="text-[16px] text-ink-500 leading-[1.65]">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      <CTASection
        eyebrow="Ready to invest?"
        heading="Build the business case for your team"
        description="Talk to us about a tailored training plan for individuals, teams or your whole organisation."
        buttonText="Browse courses"
        buttonHref="/courses"
        secondaryHref="/contact"
        secondaryText="Talk to us"
        variant="dark"
      />
    </>
  );
}
