import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import ClientLogoGrid from "@/components/ClientLogoGrid";
import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";
import Eyebrow from "@/components/Eyebrow";
import StatBlock from "@/components/StatBlock";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `About | ${SITE_NAME}`,
  description:
    "Six Sigma South Africa is the leading Six Sigma training provider for many of the largest companies in South Africa and neighbouring African countries.",
  path: "/about",
});

const whyChooseUs = [
  {
    heading: "Prompt response time",
    text: "We address the needs of your company quickly and efficiently, ensuring you get started on your Six Sigma journey without delay.",
  },
  {
    heading: "Dual certification",
    text: "We provide two sets of certifications once students have successfully completed the training and the project — both a local and an internationally recognised certificate.",
  },
  {
    heading: "Internationally recognised",
    text: "Six Sigma/Lean certification is awarded by an institution that employs a certified and qualified Black Belt trainer. Recognised worldwide.",
  },
  {
    heading: "Flexible training schedule",
    text: "We provide a flexible training schedule to suit delegates, offering online, virtual and classroom training options.",
  },
  {
    heading: "Well-established",
    text: "Six Sigma South Africa has been providing Six Sigma training since 2005 and has trained over 12,000 professionals across Africa.",
  },
];

const results = [
  "Improved customer service loyalty",
  "Time management and efficiency",
  "Reduced cycle time",
  "Employee motivation and skills development",
  "Strategic planning",
  "Supply chain management",
  "Bottom-line cost savings (5–20% of turnover per annum)",
  "Improved product or service quality",
  "Common language across the organisation",
  "World-class operational standard",
  "Creates a competitive edge",
  "Improved ROI",
];

export default function AboutPage() {
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
                Established 2005 · 2KO Africa CC
              </Eyebrow>
              <h1 className="!text-white mb-8">
                The continent&rsquo;s most accredited Six Sigma trainer
              </h1>
              <p className="text-[19px] md:text-[21px] text-white/85 leading-[1.65] max-w-[640px]">
                Six Sigma South Africa is the leading Six Sigma training
                provider for many of the largest companies in South Africa and
                neighbouring African countries. We work closely with
                organisations to deliver training matched to their specific
                operational needs.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] border border-white/10 [box-shadow:var(--shadow-xl)]">
                <Image
                  src="/images/hero-presentation.jpg"
                  alt="Six Sigma South Africa training session"
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

      {/* ─── Stats row ─── */}
      <FadeIn>
        <section className="bg-ink-50 py-24">
          <div className="container-wide">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
              <StatBlock value="12,000+" label="Professionals trained" />
              <StatBlock value="20+ yrs" label="Of training experience" />
              <StatBlock value="5,000+" label="Organisations served" />
              <StatBlock value="100%" label="CSSC accredited" />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── Accreditation ─── */}
      <FadeIn>
        <section className="py-24 md:py-32 bg-white">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Accreditation"
              subtitle="2KO Africa CC has achieved both international and local accreditation for our Six Sigma courses, providing clients with the peace of mind that our training is of the highest standard."
              align="center"
            >
              Trusted, accredited, recognised
            </SectionHeading>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="rounded-[24px] border border-ink-100 bg-white p-10 [box-shadow:var(--shadow-md)]">
                <Eyebrow className="mb-4">International</Eyebrow>
                <h3 className="mb-4">CSSC USA accreditation</h3>
                <p className="text-[16px] text-ink-500 leading-[1.65]">
                  We are a Council for Six Sigma Certification registered
                  training provider. Our certifications meet the complete Six
                  Sigma Body of Knowledge and are internationally recognised.
                </p>
              </div>
              <div className="rounded-[24px] border border-ink-100 bg-white p-10 [box-shadow:var(--shadow-md)]">
                <Eyebrow className="mb-4">Local</Eyebrow>
                <h3 className="mb-4">MICT SETA Accreditation</h3>
                <p className="text-[16px] text-ink-500 leading-[1.65]">
                  Unit Standard 243816 — developing a project quality management
                  plan for a simple to moderately complex project. Level 5. Our
                  MICT SETA accreditation number is 2007/01/215.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── Results expected ─── */}
      <FadeIn>
        <section className="bg-ink-50 py-24 md:py-32">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Outcomes"
              subtitle="Across thousands of completed projects, our clients consistently see measurable, repeatable gains."
            >
              Results your organisation can expect
            </SectionHeading>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {results.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[12px] bg-white p-5 border border-ink-100 [box-shadow:var(--shadow-sm)]"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-[15px] leading-[1.5] text-ink-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── Why Choose Us ─── */}
      <FadeIn>
        <section className="py-24 md:py-32 bg-white">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Why us"
              subtitle="The reasons our clients keep coming back, and why their teams cite us as the most professional training partner they&rsquo;ve worked with."
              align="left"
            >
              Why choose Six Sigma South Africa
            </SectionHeading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
              {whyChooseUs.map(({ heading, text }, i) => (
                <div key={heading} className="flex items-start gap-6">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-[16px] font-bold text-green-700 [box-shadow:inset_0_0_0_1px_rgba(22,178,74,.2)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="text-ink-900 mb-2">{heading}</h4>
                    <p className="text-[16px] text-ink-500 leading-[1.65]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── Mission & Vision ─── */}
      <FadeIn>
        <section className="bg-ink-50 py-24 md:py-32">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="relative overflow-hidden rounded-[24px] bg-green-900 p-10 md:p-12 text-white [box-shadow:var(--shadow-lg)]">
                <div className="pointer-events-none absolute inset-0 opacity-[0.10]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px)", backgroundSize: "26px 26px" }} aria-hidden="true" />
                <div className="relative z-10">
                  <Eyebrow tone="white" className="mb-5">Our mission</Eyebrow>
                  <h3 className="!text-white mb-5">Empower people to improve every process</h3>
                  <p className="text-[16px] text-white/85 leading-[1.65]">
                    To provide world-class Six Sigma and Lean training that
                    empowers individuals and organisations to achieve measurable
                    process improvement, reduce waste, and drive continuous
                    improvement across all sectors of the African economy.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[24px] bg-green-900 p-10 md:p-12 text-white [box-shadow:var(--shadow-lg)]">
                <div className="pointer-events-none absolute inset-0 opacity-[0.10]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px)", backgroundSize: "26px 26px" }} aria-hidden="true" />
                <div className="relative z-10">
                  <Eyebrow tone="white" className="mb-5">Our vision</Eyebrow>
                  <h3 className="!text-white mb-5">The most trusted name in Six Sigma in Africa</h3>
                  <p className="text-[16px] text-white/85 leading-[1.65]">
                    To be the most trusted and recognised Six Sigma training
                    provider on the African continent, equipping professionals
                    with internationally accredited skills that drive
                    excellence in every industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── Client logos ─── */}
      <FadeIn>
        <ClientLogoGrid />
      </FadeIn>

      {/* ─── CTA ─── */}
      <CTASection
        eyebrow="Ready to start?"
        heading="Transform your organisation with Six Sigma"
        description="Get in touch to discuss how Six Sigma training can benefit your team and drive measurable results."
        buttonText="Contact us"
        buttonHref="/contact#enquiry-form"
        secondaryHref="/courses"
        secondaryText="Browse courses"
        variant="dark"
      />
    </>
  );
}
