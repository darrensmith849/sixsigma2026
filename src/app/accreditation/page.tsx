import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import Eyebrow from "@/components/Eyebrow";
import CTASection from "@/components/CTASection";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Accreditation | ${SITE_NAME}`,
  description:
    "Our Six Sigma courses are internationally accredited through the Council for Six Sigma Certification (CSSC) in the USA. Learn more about our accreditation.",
  path: "/accreditation",
});

const benefits = [
  {
    title: "Globally portable",
    body:
      "Your CSSC-accredited certification is recognised by employers and clients in every major market — from London to Sydney.",
    icon: "🌍",
  },
  {
    title: "Verified body of knowledge",
    body:
      "CSSC accreditation guarantees that your training covers the complete Six Sigma Body of Knowledge to a published standard.",
    icon: "📋",
  },
  {
    title: "Independent oversight",
    body:
      "Accreditation is granted and audited by an independent body, not by the training provider — your certification has weight.",
    icon: "✓",
  },
];

export default function AccreditationPage() {
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
        <div className="relative z-10 container-wide py-20 lg:py-28 text-center">
          <Eyebrow tone="white" className="mb-6 mx-auto">
            CSSC USA · MICT SETA
          </Eyebrow>
          <h1 className="!text-white mx-auto max-w-4xl">
            Internationally accredited, locally recognised
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-[19px] md:text-[21px] text-white/80 leading-[1.65]">
            Every certificate we issue carries the weight of one of the most
            recognised Six Sigma accreditation bodies in the world — the
            Council for Six Sigma Certification, USA.
          </p>
          <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 backdrop-blur-sm">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-[13px] font-bold">
              ✓
            </span>
            <span className="text-[14px] font-semibold uppercase tracking-[0.10em] text-white">
              CSSC Accredited Training Provider
            </span>
          </div>
        </div>
      </section>

      {/* ─── Why it matters ─── */}
      <FadeIn>
        <section className="bg-white py-24 md:py-32">
          <div className="container-wide">
            <div className="mb-16 max-w-3xl">
              <Eyebrow className="mb-5">Why accreditation matters</Eyebrow>
              <h2>A Six Sigma certification is only as valuable as the body that issues it</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-[24px] border border-ink-100 bg-white p-10 [box-shadow:var(--shadow-md)]"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-2xl">
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

      {/* ─── What's covered ─── */}
      <FadeIn>
        <section className="bg-ink-50 py-24 md:py-32">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <Eyebrow className="mb-5">What it covers</Eyebrow>
                <h2 className="mb-6">Every course we offer is accredited</h2>
                <p className="text-[18px] text-ink-500 leading-[1.65]">
                  From our free White Belt through to advanced Black Belt
                  programmes, every certificate we issue is backed by CSSC
                  USA accreditation.
                </p>
              </div>
              <div className="lg:col-span-7">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "White Belt",
                    "Yellow Belt",
                    "Lean Green Belt",
                    "DMAIC Green Belt",
                    "Lean Black Belt",
                    "DMAIC Black Belt",
                    "5S",
                    "Kaizen",
                    "Root Cause Analysis",
                    "Custom corporate programmes",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 rounded-[12px] bg-white px-5 py-4 border border-ink-100 [box-shadow:var(--shadow-sm)]"
                    >
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
                      <span className="text-[15px] font-medium text-ink-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <CTASection
        eyebrow="Ready to certify?"
        heading="Start a programme accredited worldwide"
        description="Talk to our team about which course is the right fit for you or your organisation."
        buttonText="Browse courses"
        buttonHref="/courses"
        secondaryHref="/contact"
        secondaryText="Contact us"
        variant="dark"
      />
    </>
  );
}
