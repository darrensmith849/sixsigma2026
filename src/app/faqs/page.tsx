import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import JsonLd from "@/components/JsonLd";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Six Sigma FAQs | ${SITE_NAME}`,
  description:
    "Frequently asked questions about Six Sigma training, certification, pricing and course delivery in South Africa.",
  path: "/faqs",
});

const faqs = [
  {
    q: "What is Six Sigma?",
    a: "Six Sigma is a data-driven methodology for eliminating defects and reducing variation in business processes. It uses statistical tools and structured problem-solving to help organisations improve quality, cut costs and delight customers.",
  },
  {
    q: "Which belt should I start with?",
    a: "Most people new to Six Sigma start with White Belt (free) or Yellow Belt to build foundational knowledge. Green Belt is ideal for practitioners who will lead small improvement projects, and Black Belt is for those who will lead large, cross-functional initiatives.",
  },
  {
    q: "Are your courses internationally accredited?",
    a: "Yes. Our Six Sigma courses are internationally accredited through the Council for Six Sigma Certification (CSSC) in the USA, so your certification is recognised globally.",
  },
  {
    q: "Do you offer training outside Johannesburg?",
    a: "We run training in Johannesburg, Cape Town, Durban, Pretoria and Port Elizabeth, as well as on-site at client premises anywhere in South Africa and across Africa. Virtual and self-paced online options are also available.",
  },
  {
    q: "How long does it take to complete a course?",
    a: "Short courses (5S, Kaizen) take about a day. Yellow Belt typically runs 2 days, Green Belt 5 days and Black Belt 10 days. Self-paced online courses can be completed at your own speed.",
  },
  {
    q: "Can you deliver a course on-site at my workplace?",
    a: "Absolutely. On-site corporate training is one of our most popular options. Contact us with your requirements and we will design a programme tailored to your team.",
  },
  {
    q: "What is the difference between Lean and DMAIC?",
    a: "Lean Six Sigma focuses on waste reduction using 5S and visual factory methods, ideal for manufacturing. DMAIC Six Sigma focuses on variation reduction using statistical methods, ideal for process and service environments.",
  },
  {
    q: "What software is used in training?",
    a: "For Green Belt and Black Belt courses, we use SigmaXL, a statistical analysis add-in for Microsoft Excel. A trial version is included with these courses.",
  },
];

export default function FaqsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />

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
            Help centre
          </Eyebrow>
          <h1 className="!text-white mx-auto max-w-3xl">
            Frequently asked questions
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-[19px] text-white/80 leading-[1.65]">
            Answers to the questions we hear most often about Six Sigma
            training and certification.
          </p>
        </div>
      </section>

      {/* ─── Accordion + sidebar ─── */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <FadeIn className="lg:col-span-8">
              <div className="space-y-3">
                {faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group overflow-hidden rounded-[16px] border border-ink-100 bg-white [box-shadow:var(--shadow-sm)] transition-all duration-[var(--dur)] open:[box-shadow:var(--shadow-md)]"
                  >
                    <summary className="flex cursor-pointer items-start justify-between gap-6 p-7 text-[18px] font-semibold text-ink-900 hover:bg-ink-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                      <span>{f.q}</span>
                      <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700 transition-transform duration-[var(--dur)] group-open:rotate-45">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 3v10M3 8h10" /></svg>
                      </span>
                    </summary>
                    <div className="px-7 pb-7 -mt-1 text-[16px] text-ink-500 leading-[1.7]">
                      {f.a}
                    </div>
                  </details>
                ))}
              </div>
            </FadeIn>

            {/* Sidebar */}
            <FadeIn className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 rounded-[24px] border border-ink-100 bg-ink-50 p-10">
                <Eyebrow className="mb-5">Still stuck?</Eyebrow>
                <h3 className="mb-4">We&rsquo;re happy to help</h3>
                <p className="text-[15px] text-ink-500 leading-[1.65] mb-8">
                  Our team replies to every enquiry within one business day.
                  Or call us directly on <a href="tel:+27214265300" className="font-semibold text-green-700">021 426 5300</a>.
                </p>
                <Button href="/contact" variant="filled" size="default" trailingArrow className="w-full">
                  Contact us
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
