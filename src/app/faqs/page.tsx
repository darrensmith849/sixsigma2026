import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import JsonLd from "@/components/JsonLd";
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
      <div className="pt-[80px]">
        <FadeIn>
          <section className="bg-green py-16 md:py-24">
            <div className="container text-center">
              <h1 className="!text-inverse mb-6">Frequently asked questions</h1>
              <p className="text-inverse/90 text-[20px] md:text-[24px] leading-relaxed max-w-3xl mx-auto">
                Answers to the questions we hear most often about Six Sigma
                training and certification.
              </p>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="container py-16 md:py-24 max-w-4xl">
            <div className="space-y-10">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h2 className="text-[26px] md:text-[30px] font-semibold mb-3">
                    {f.q}
                  </h2>
                  <p className="text-body text-[20px] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 flex flex-wrap gap-4">
              <Button href="/contact" variant="filled" size="large">
                Still have questions? Contact us
              </Button>
            </div>
          </section>
        </FadeIn>
      </div>
    </>
  );
}
