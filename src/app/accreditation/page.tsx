import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Accreditation | Six Sigma South Africa",
  description:
    "2KO Africa is the official industry standard for Lean and Six Sigma accreditation and certification in South Africa and the rest of Africa.",
};

export default function AccreditationPage() {
  return (
    <div className="pt-[80px]">
      {/* ───── 1. Hero: Landscape Image + Text Below ───── */}
      <section>
        <div className="relative h-[200px] md:h-[260px]">
          <Image
            src="/images/accreditation-hero.jpg"
            alt="Six Sigma accreditation and certification"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />
        </div>
      </section>

      <FadeIn>
        <section className="bg-white py-10 md:py-14">
          <div className="container">
            <div className="max-w-[720px]">
              <h1 className="font-bold text-heading text-[28px] md:text-[34px] lg:text-[38px] leading-[1.12] tracking-tight mb-4">
                Lean &amp; Six Sigma Accreditation Body for Africa
              </h1>
              <div className="w-[50px] h-[3px] bg-green rounded-full mb-5" />
              <p className="text-body text-[15px] md:text-[16px] leading-relaxed mb-4">
                2KO Africa is widely recognised as the official industry standard
                for Lean &amp; Six Sigma accreditation in Africa. Six Sigma South
                Africa&trade; is the exclusive training provider for 2KO Africa.
              </p>
              <p className="text-body text-[15px] md:text-[16px] leading-relaxed mb-6">
                Our accreditation provides assurance that training is both
                reputable and valuable, having undergone a thorough evaluation
                process to ensure courses meet stringent criteria set forth by
                accrediting bodies in South Africa and beyond.
              </p>
              <Button href="#what-does-this-mean" variant="filled" size="large">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── 2. What Does This Mean? ───── */}
      <FadeIn>
        <section id="what-does-this-mean" className="py-12 md:py-14 scroll-mt-[80px]">
          <div className="container">
            <div className="max-w-[720px] mx-auto">
              <h2 className="text-heading font-bold text-[24px] md:text-[28px] mb-4">
                What does this mean?
              </h2>
              <p className="text-body text-[15px] md:text-[16px] leading-relaxed mb-4">
                At the practitioner level, we evaluate Six Sigma-certified
                individuals to ensure comprehensive standards against the Six
                Sigma Body of Knowledge and that each practitioner has met the
                minimum standard of proficiency for Six Sigma and its
                implementation.
              </p>
              <p className="text-body text-[15px] md:text-[16px] leading-relaxed mb-4">
                Individuals who have trained elsewhere and who require official
                certification can apply to be accredited. Your request will be
                ratified if we are satisfied that top standards have been met, or
                where this is not clear, you may be required to sit for the Six
                Sigma South Africa exam.
              </p>
              <p className="text-body text-[15px] md:text-[16px] leading-relaxed">
                Companies, universities, freelancers or any other training
                providers who are seeking recertification will be required to
                meet specific criteria in not only their education requirements,
                but also in their testing requirements. Accredited training
                providers are comprehensively reviewed to ensure that they meet
                an extensive checklist of compliance.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── 3. Individual Re-certification ───── */}
      <FadeIn>
        <section className="py-12 md:py-14 bg-light-grey">
          <div className="container">
            <div className="max-w-[880px] mx-auto">
              <div className="grid md:grid-cols-5 gap-8 items-start">
                <div className="md:col-span-3">
                  <h2 className="text-heading font-bold text-[22px] md:text-[26px] mb-4">
                    How to get re-certified with 2KO as an individual?
                  </h2>
                  <p className="text-body text-[15px] md:text-[16px] leading-relaxed mb-5">
                    If you have never done a certification exam, the fees vary
                    from R1,250 for Yellow Belt to R3,600 for Black Belt (exam
                    only). The cost of having projects adjudicated range from
                    R4,200 to R8,800 (Green and Black Belt respectively).
                  </p>
                  <h3 className="text-heading font-semibold text-[16px] mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Hold a Black Belt certification from a recognised training organisation",
                      "Demonstrate advanced comprehension of Six Sigma leading to tangible improvements in quality and reductions in cost",
                      "Minimum of 5 years of project leadership experience",
                      "Successfully applied Six Sigma principles to enhance operational efficiency and effectiveness",
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
                  <div className="bg-green rounded-xl p-6 text-center">
                    <p className="text-inverse/70 text-[12px] font-semibold uppercase tracking-wider mb-1">
                      Individual
                    </p>
                    <p className="text-inverse font-bold text-[26px] mb-4">
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

      {/* ───── 4. Trainer Re-certification ───── */}
      <FadeIn>
        <section className="py-12 md:py-14">
          <div className="container">
            <div className="max-w-[880px] mx-auto">
              <div className="grid md:grid-cols-5 gap-8 items-start">
                <div className="md:col-span-3">
                  <h2 className="text-heading font-bold text-[22px] md:text-[26px] mb-4">
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
                  <ul className="space-y-2">
                    {[
                      "Hold a Black Belt certification from a recognised training organisation",
                      "Demonstrate advanced comprehension of Six Sigma leading to tangible improvements",
                      "Minimum of 5 years of project leadership experience applying Six Sigma principles",
                      "Proven track record of delivering Six Sigma training",
                      "Meet 2KO Africa\u2019s trainer compliance checklist",
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
                    <p className="text-white/60 text-[12px] font-semibold uppercase tracking-wider mb-1">
                      Trainer
                    </p>
                    <p className="text-white font-bold text-[26px] mb-4">
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
