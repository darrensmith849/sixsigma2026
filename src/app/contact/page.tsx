import type { Metadata } from "next";
import ClientLogoGrid from "@/components/ClientLogoGrid";
import ContactForm from "@/components/ContactForm";
import FadeIn from "@/components/FadeIn";
import Eyebrow from "@/components/Eyebrow";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Contact | ${SITE_NAME}`,
  description:
    "Contact Six Sigma South Africa on 021 426 5300 or info@2ko.co.za for accredited Six Sigma training, consultancy, and corporate training enquiries.",
  path: "/contact",
});

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: SITE_NAME,
    telephone: "+27-21-426-5300",
    email: "info@2ko.co.za",
  },
};

const cities = [
  "Johannesburg",
  "Cape Town",
  "Durban",
  "Pretoria",
  "Port Elizabeth",
  "On-site nationwide",
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactJsonLd} />

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
            Get in touch
          </Eyebrow>
          <h1 className="!text-white mx-auto max-w-4xl">
            Talk to South Africa&rsquo;s leading Six Sigma trainers
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-[19px] md:text-[21px] text-white/80 leading-[1.65]">
            Whether you&rsquo;re booking a course, requesting a quote for
            corporate training, or asking about consultancy — we reply within
            one business day.
          </p>
        </div>
      </section>

      {/* ─── Form + Contact card ─── */}
      <section className="bg-ink-50 py-24 md:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form card */}
            <FadeIn className="lg:col-span-7">
              <div className="rounded-[24px] border border-ink-100 bg-white p-8 md:p-12 [box-shadow:var(--shadow-lg)]">
                <Eyebrow className="mb-5">Send an enquiry</Eyebrow>
                <h2 className="mb-3">How can we help?</h2>
                <p className="text-[16px] text-ink-500 mb-10">
                  Fill in the form and our team will get back to you within
                  one business day.
                </p>
                <ContactForm />
              </div>
            </FadeIn>

            {/* Contact details card */}
            <FadeIn className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[24px] bg-green-900 p-10 text-white [box-shadow:var(--shadow-lg)] h-full">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.10]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                  }}
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <Eyebrow tone="white" className="mb-5">
                    Contact details
                  </Eyebrow>
                  <h3 className="!text-white mb-8">Six Sigma South Africa</h3>

                  <div className="space-y-6">
                    <div>
                      <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/55 mb-1.5">
                        Phone
                      </div>
                      <a
                        href="tel:+27214265300"
                        className="text-[20px] font-semibold text-white hover:text-green-200 transition-colors"
                      >
                        021 426 5300
                      </a>
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/55 mb-1.5">
                        Email
                      </div>
                      <a
                        href="mailto:info@2ko.co.za"
                        className="text-[20px] font-semibold text-white hover:text-green-200 transition-colors"
                      >
                        info@2ko.co.za
                      </a>
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/55 mb-3">
                        We train in
                      </div>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                        {cities.map((c) => (
                          <li
                            key={c}
                            className="flex items-center gap-2 text-[14px] text-white/85"
                          >
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-300" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-white/15">
                    <Eyebrow tone="white" className="mb-3">
                      Become a trainer
                    </Eyebrow>
                    <p className="text-[14px] text-white/75 leading-[1.65]">
                      Certified Six Sigma Black Belt or Master Black Belt? Send
                      your CV to{" "}
                      <a
                        href="mailto:info@2ko.co.za"
                        className="font-semibold text-white underline-offset-2 hover:underline"
                      >
                        info@2ko.co.za
                      </a>{" "}
                      with the subject &ldquo;Trainer Application&rdquo;.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Client Logos ─── */}
      <FadeIn>
        <ClientLogoGrid />
      </FadeIn>
    </>
  );
}
