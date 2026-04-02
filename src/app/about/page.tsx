import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import ClientLogoGrid from "@/components/ClientLogoGrid";
import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About Six Sigma South Africa | 2KO Africa CC",
  description:
    "Six Sigma South Africa is the leading Six Sigma training provider for many of the largest companies in South Africa and neighbouring African countries.",
};

export default function AboutPage() {
  return (
    <div className="pt-[80px]">
      {/* ───── Hero Image + Who We Are ───── */}
      <FadeIn>
        <section className="relative">
          <div className="relative w-full h-[300px] md:h-[450px] bg-light-grey">
            <Image
              src="/images/about-hero.jpg"
              alt="Six Sigma South Africa office"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="bg-green">
            <div className="container py-12 md:py-16">
              <h1 className="!text-inverse mb-6">Who We Are</h1>
              <p className="text-inverse/90 text-[20px] md:text-[24px] leading-relaxed max-w-3xl">
                2KO Africa CC &ndash; Six Sigma South Africa is the leading Six
                Sigma Training provider for many of the largest companies in
                South Africa, as well as neighbouring African countries.
              </p>
              <p className="text-inverse/90 text-[20px] md:text-[24px] leading-relaxed max-w-3xl mt-4">
                Choosing the correct training provider is crucial in a
                successful Six Sigma/Lean process. At 2KO Africa CC we work
                closely together with companies to assist them according to
                their specific training needs.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Accreditation ───── */}
      <FadeIn>
        <section className="section">
          <div className="container">
            <SectionHeading
              subtitle="2KO Africa CC has achieved both international and local accreditation for our Six Sigma courses, providing our clients with the peace of mind that our training is of the highest standard."
            >
              Accreditation
            </SectionHeading>

            <div className="grid md:grid-cols-2 gap-10 mt-10 max-w-4xl mx-auto">
              <div className="bg-light-grey rounded-lg p-6">
                <h3 className="text-heading font-semibold mb-3">
                  Six Sigma Council Registered Training Provider
                </h3>
                <p className="text-body text-[18px] leading-relaxed">
                  We are a professional accrediting body within the Six Sigma
                  industry. Our objective is to ensure that Six Sigma Certified
                  individuals have been exposed to the complete Six Sigma Body
                  of Knowledge and meet a minimum standard of proficiency.
                </p>
              </div>
              <div className="bg-light-grey rounded-lg p-6">
                <h3 className="text-heading font-semibold mb-3">
                  MICT SETA Accreditation
                </h3>
                <p className="text-body text-[18px] leading-relaxed">
                  Unit Standard: 243816 &mdash; Developing a project quality
                  management plan for a simple to moderately complex project.
                  Level 5. Our MICT SETA accreditation number is 2007/01/215.
                </p>
              </div>
            </div>

            <div className="mt-8 max-w-3xl mx-auto">
              <p className="text-body text-[18px] leading-relaxed text-center">
                Six Sigma South Africa is aligned with the Council for Six
                Sigma Certification (CSSC), which is known for quality
                assurance and high standards. In South Africa, our company
                started training Six Sigma courses in 2005, and we are
                registered as Six Sigma South Africa, with a trade mark
                pending.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Results Your Company Can Expect ───── */}
      <FadeIn>
        <section className="section bg-light-grey">
          <div className="container">
            <SectionHeading>
              Results Your Company Can Expect
            </SectionHeading>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
              {[
                "Improved Customer Service Loyalty",
                "Time Management and efficiency",
                "Reduced Cycle Time",
                "Employee Motivation and development of staff skills",
                "Strategic Planning",
                "Supply Chain Management",
                "Bottom line cost savings (5%–20% of turnover per annum)",
                "Improved quality of product or service",
                "Common language throughout the organisation",
                "World class standard",
                "Creates a competitive edge",
                "Improve ROI",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-white rounded-lg p-4"
                >
                  <span className="text-green text-[18px] mt-0.5 shrink-0">
                    &#10003;
                  </span>
                  <span className="text-body text-[18px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Why Choose Us ───── */}
      <FadeIn>
        <section className="section">
          <div className="container">
            <SectionHeading>
              Why Choose Six Sigma South Africa?
            </SectionHeading>

            <div className="space-y-6 mt-10 max-w-3xl mx-auto">
              {[
                {
                  heading: "Prompt response time",
                  text: "We address the needs of your company quickly and efficiently, ensuring you get started on your Six Sigma journey without delay.",
                },
                {
                  heading: "Dual certification",
                  text: "We provide 2 sets of certifications once students have successfully completed the training and the project — both a local and an internationally recognised certificate.",
                },
                {
                  heading: "Internationally recognised",
                  text: "Six Sigma/Lean certification is awarded by an institution that employs a certified and qualified Black Belt trainer. Certification is recognised worldwide provided it comes from a certified organisation.",
                },
                {
                  heading: "Flexible training schedule",
                  text: "We provide a flexible training schedule to suit delegates, offering online, virtual, and classroom training options.",
                },
                {
                  heading: "Well-established",
                  text: "Six Sigma South Africa has been providing Six Sigma training since 2005 and has trained over 5,000 professionals across Africa.",
                },
              ].map(({ heading, text }) => (
                <div key={heading} className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-green/10 flex items-center justify-center mt-1">
                    <span className="text-green text-[18px]">&#10003;</span>
                  </div>
                  <div>
                    <h3 className="text-heading font-semibold mb-1">
                      {heading}
                    </h3>
                    <p className="text-body text-[18px] leading-relaxed">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Mission & Vision ───── */}
      <FadeIn>
        <section className="section bg-light-grey">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              <div>
                <h2 className="text-heading font-semibold mb-4">
                  Our Mission
                </h2>
                <p className="text-body text-[18px] leading-relaxed">
                  To provide world-class Six Sigma and Lean training that
                  empowers individuals and organisations to achieve measurable
                  process improvement, reduce waste, and drive continuous
                  improvement across all sectors of the African economy.
                </p>
              </div>
              <div>
                <h2 className="text-heading font-semibold mb-4">
                  Our Vision
                </h2>
                <p className="text-body text-[18px] leading-relaxed">
                  To be the most trusted and recognised Six Sigma training
                  provider on the African continent, equipping professionals
                  with internationally accredited skills that drive excellence
                  in every industry.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Client List ───── */}
      <FadeIn>
        <ClientLogoGrid />
      </FadeIn>

      {/* ───── CTA ───── */}
      <FadeIn>
        <CTASection
          heading="Ready to transform your organisation?"
          description="Get in touch to discuss how Six Sigma training can benefit your team and drive measurable results."
          buttonText="Contact Us"
          buttonHref="/contact"
          variant="green"
          iconSrc="/images/Success-stories-01.png"
          iconAlt="Six Sigma training"
        />
      </FadeIn>
    </div>
  );
}
