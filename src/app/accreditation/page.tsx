import type { Metadata } from "next";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Accreditation | Six Sigma South Africa",
  description:
    "2KO Africa sets the standards in the Six Sigma space for accreditation and certification for Lean and Six Sigma in South Africa and the rest of Africa.",
};

export default function AccreditationPage() {
  return (
    <div className="pt-[80px]">
      {/* ───── Hero ───── */}
      <section className="relative bg-green py-12 md:py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green via-green to-green-hover opacity-60" />
        <div className="container text-center relative z-10">
          <h1 className="!text-inverse mb-3 text-[32px] md:text-[38px]">
            Accreditation
          </h1>
          <p className="text-inverse/90 text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto">
            2KO Africa sets the standards in the Six Sigma space for
            accreditation and certification for Lean and Six Sigma in South
            Africa and the rest of Africa.
          </p>
        </div>
      </section>

      {/* ───── Accreditation Overview ───── */}
      <FadeIn>
        <section className="py-12 md:py-14">
          <div className="container">
            <div className="max-w-[880px] mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg border border-border-grey p-5 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-2 h-2 rounded-full bg-green shrink-0" />
                    <h3 className="text-heading font-semibold text-[16px]">
                      Exclusive Training Provider
                    </h3>
                  </div>
                  <p className="text-body text-[14px] md:text-[15px] leading-relaxed">
                    Six Sigma South Africa&trade; is the exclusive training
                    provider for 2KO Africa. 2KO Africa is widely recognised as
                    the official industry standard for Lean &amp; Six Sigma
                    accreditation in Africa.
                  </p>
                </div>
                <div className="bg-white rounded-lg border border-border-grey p-5 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-2 h-2 rounded-full bg-green shrink-0" />
                    <h3 className="text-heading font-semibold text-[16px]">
                      International Recognition
                    </h3>
                  </div>
                  <p className="text-body text-[14px] md:text-[15px] leading-relaxed">
                    Our courses are internationally accredited through CSSC (USA)
                    and locally accredited through MICT SETA. We also offer
                    recognition of previous learning and partnership with
                    SigmaXL for statistical software.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-heading font-semibold text-[17px] mb-2">
                    Council for Six Sigma Certification (CSSC)
                  </h3>
                  <p className="text-body text-[14px] md:text-[15px] leading-relaxed">
                    The Council for Six Sigma Certification is the official
                    industry standard for Six Sigma accreditation for training
                    providers worldwide. Six Sigma South Africa is aligned with
                    CSSC, which is known for quality assurance and high
                    standards. Our company started training Six Sigma courses in
                    2005, and we are registered as Six Sigma South Africa, with a
                    trade mark pending.
                  </p>
                </div>
                <div>
                  <h3 className="text-heading font-semibold text-[17px] mb-2">
                    MICT SETA &amp; MER SETA
                  </h3>
                  <p className="text-body text-[14px] md:text-[15px] leading-relaxed mb-2">
                    <span className="font-semibold">MICT SETA Accreditation:</span>{" "}
                    ACC/2007/01/215 — Unit Standard 243816: Developing a project
                    quality management plan for a simple to moderately complex
                    project (Level 5).
                  </p>
                  <p className="text-body text-[14px] md:text-[15px] leading-relaxed">
                    <span className="font-semibold">MER SETA Registration:</span>{" "}
                    613/R/000340/2017 — Courses claimable from Skill Development
                    Levies through the relevant SETA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── What Does This Mean? ───── */}
      <FadeIn>
        <section className="py-12 md:py-14 bg-light-grey">
          <div className="container">
            <div className="max-w-[780px] mx-auto">
              <h2 className="text-heading font-bold text-[24px] md:text-[28px] mb-4">
                What does this mean?
              </h2>
              <p className="text-body text-[15px] md:text-[16px] leading-relaxed mb-4">
                At the practitioner level, Six Sigma South Africa evaluates Six
                Sigma-certified individuals to ensure their comprehensive Six
                Sigma standards against the Six Sigma Body of Knowledge and
                that each practitioner has met the minimum standard of
                proficiency for Six Sigma and its implementation.
              </p>
              <p className="text-body text-[15px] md:text-[16px] leading-relaxed mb-4">
                2KO Africa provides an opportunity for trainers, universities,
                and individuals to recalibrate by adhering to the standard
                which 2KO Africa sets. This benchmarking ensures that all
                certified practitioners maintain a consistent, high-quality
                standard across the industry.
              </p>
              <p className="text-body text-[15px] md:text-[16px] leading-relaxed">
                2KO Africa is the most recognised certification body for
                Africa. We are the only company that is authorised by MICT SETA
                in South Africa for Six Sigma certifications. We are a member
                of CSSC (Council for Six Sigma Certification), which is USA
                based. Our trainers are IASSC and CSSC certified.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Re-certification: Individual ───── */}
      <FadeIn>
        <section className="py-12 md:py-14">
          <div className="container">
            <div className="max-w-[880px] mx-auto">
              <div className="grid md:grid-cols-5 gap-8 items-start">
                <div className="md:col-span-3">
                  <h2 className="text-heading font-bold text-[22px] md:text-[26px] mb-3">
                    How to get re-certified with 2KO as an individual?
                  </h2>
                  <p className="text-body text-[15px] md:text-[16px] leading-relaxed mb-5">
                    Companies, universities, freelancers or any other training
                    providers who are seeking recertification will be required
                    to meet specific criteria in not only their education
                    requirements, but also in their testing requirements.
                    Accredited training providers are comprehensively reviewed
                    to ensure that they meet an extensive checklist of
                    compliance.
                  </p>
                  <h3 className="text-heading font-semibold text-[16px] mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-2 mb-5">
                    {[
                      "Hold a Black Belt certification from a recognised training organisation",
                      "Demonstrate advanced comprehension of Six Sigma leading to tangible improvements in quality and reductions in cost",
                      "Minimum of 5 years of project leadership experience",
                      "Successfully applied Six Sigma principles to enhance operational efficiency and effectiveness",
                      "Pass a re-certification assessment",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-heading text-[14px] md:text-[15px]">
                        <svg className="w-4 h-4 text-green shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-body text-[14px] leading-relaxed">
                    If you have never done a certification exam, fees vary from
                    R1,250 for Yellow Belt to R3,600 for Black Belt (exam only).
                    Project adjudication ranges from R4,200 to R8,800 (Green and
                    Black Belt respectively).
                  </p>
                </div>
                <div className="md:col-span-2">
                  <div className="bg-green rounded-xl p-6 text-center">
                    <p className="text-inverse/80 text-[13px] font-medium uppercase tracking-wider mb-1">
                      Individual Re-certification
                    </p>
                    <p className="text-inverse font-bold text-[28px] mb-4">
                      Get Certified
                    </p>
                    <p className="text-inverse/80 text-[14px] leading-relaxed mb-5">
                      Contact us to begin your individual re-certification
                      process with 2KO Africa.
                    </p>
                    <Button href="/contact" variant="white" size="default" className="w-full">
                      Enquire Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Re-certification: Trainer ───── */}
      <FadeIn>
        <section className="py-12 md:py-14 bg-light-grey">
          <div className="container">
            <div className="max-w-[880px] mx-auto">
              <div className="grid md:grid-cols-5 gap-8 items-start">
                <div className="md:col-span-3">
                  <h2 className="text-heading font-bold text-[22px] md:text-[26px] mb-3">
                    How to get re-certified with 2KO as a trainer?
                  </h2>
                  <p className="text-body text-[15px] md:text-[16px] leading-relaxed mb-5">
                    Trainers seeking accreditation or recertification with 2KO
                    Africa are comprehensively reviewed to ensure they meet an
                    extensive checklist of compliance in both education and
                    testing requirements.
                  </p>
                  <h3 className="text-heading font-semibold text-[16px] mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-2 mb-5">
                    {[
                      "Hold a Black Belt certification from a recognised training organisation",
                      "Demonstrate advanced comprehension of Six Sigma leading to tangible improvements",
                      "Minimum of 5 years of project leadership experience applying Six Sigma principles",
                      "Proven track record of delivering Six Sigma training",
                      "Meet 2KO Africa\u2019s trainer compliance checklist",
                      "Pass a trainer re-certification assessment",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-heading text-[14px] md:text-[15px]">
                        <svg className="w-4 h-4 text-green shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2">
                  <div className="bg-heading rounded-xl p-6 text-center">
                    <p className="text-white/70 text-[13px] font-medium uppercase tracking-wider mb-1">
                      Trainer Re-certification
                    </p>
                    <p className="text-white font-bold text-[28px] mb-4">
                      Get Certified
                    </p>
                    <p className="text-white/70 text-[14px] leading-relaxed mb-5">
                      Contact us to begin your trainer re-certification process
                      with 2KO Africa.
                    </p>
                    <Button href="/contact" variant="white" size="default" className="w-full">
                      Enquire Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── CTA ───── */}
      <FadeIn>
        <section className="bg-green py-12 md:py-14">
          <div className="container text-center">
            <h2 className="font-semibold text-inverse text-[24px] md:text-[28px] mb-3">
              Ready to get certified?
            </h2>
            <p className="text-[16px] md:text-[17px] max-w-2xl mx-auto mb-6 leading-relaxed text-inverse/90">
              Browse our internationally accredited Six Sigma courses.
            </p>
            <Button href="/courses" variant="white" size="large">
              View Courses
            </Button>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
