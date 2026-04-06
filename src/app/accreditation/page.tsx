import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Accreditation | Six Sigma South Africa",
  description:
    "2KO Africa is the official industry standard for Lean and Six Sigma accreditation and certification in South Africa and the rest of Africa.",
};

/* Icon-led requirement items — old site exact content */
const individualRequirements = [
  {
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
    label: "R1,900 inc VAT",
  },
  {
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    label: "Must submit your project",
  },
  {
    icon: "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z",
    label: "Must provide CV, with references",
  },
  {
    icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
    label: "Must have been previously taught by a recognised institution",
  },
];

const trainerRequirements = [
  {
    icon: individualRequirements[0].icon,
    label: "R2,400 inc VAT",
  },
  ...individualRequirements.slice(1),
];

export default function AccreditationPage() {
  return (
    <div className="pt-[80px]">
      {/* ───── Hero ───── */}
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
        <section className="bg-white py-10 md:py-12">
          <div className="container">
            <div className="max-w-[680px]">
              <h1 className="font-bold text-heading text-[28px] md:text-[34px] lg:text-[38px] leading-[1.12] tracking-tight mb-3">
                Lean &amp; Six Sigma Accreditation Body for Africa
              </h1>
              <div className="w-[50px] h-[3px] bg-green rounded-full mb-4" />
              <p className="text-body text-[15px] md:text-[16px] leading-relaxed mb-3">
                2KO Africa is widely recognised as the official industry standard
                for Lean &amp; Six Sigma accreditation in Africa. Six Sigma South
                Africa&trade; is the exclusive training provider for 2KO Africa.
              </p>
              <p className="text-body text-[15px] md:text-[16px] leading-relaxed mb-5">
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

      {/* ───── What Does This Mean? ───── */}
      <FadeIn>
        <section id="what-does-this-mean" className="py-10 md:py-12 bg-light-grey scroll-mt-[80px]">
          <div className="container">
            <div className="max-w-[640px] mx-auto">
              <h2 className="text-heading font-bold text-[22px] md:text-[26px] mb-3">
                What does this mean?
              </h2>
              <p className="text-body text-[15px] leading-relaxed mb-3">
                At the practitioner level, we evaluate Six Sigma-certified
                individuals to ensure comprehensive standards against the Six
                Sigma Body of Knowledge and that each practitioner has met the
                minimum standard of proficiency for Six Sigma and its
                implementation.
              </p>
              <p className="text-body text-[15px] leading-relaxed mb-3">
                Individuals who have trained elsewhere and who require official
                certification can apply to be accredited. Your request will be
                ratified if we are satisfied that top standards have been met, or
                where this is not clear, you may be required to sit for the Six
                Sigma South Africa exam.
              </p>
              <p className="text-body text-[15px] leading-relaxed">
                Companies, universities, freelancers or any other training
                providers who are seeking recertification will be required to
                meet specific criteria in not only their education requirements,
                but also in their testing requirements.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Individual Re-certification ───── */}
      <FadeIn>
        <section className="py-10 md:py-12">
          <div className="container">
            <div className="max-w-[820px] mx-auto">
              <h2 className="text-heading font-bold text-[22px] md:text-[26px] mb-5">
                How to get re-certified with 2KO as an individual?
              </h2>

              {/* Icon-led requirements row */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {individualRequirements.map((req) => (
                  <div key={req.label} className="flex items-start gap-3 bg-light-grey rounded-lg p-4">
                    <div className="w-9 h-9 rounded-lg bg-green/10 flex items-center justify-center shrink-0">
                      <svg className="w-[18px] h-[18px] text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d={req.icon} />
                      </svg>
                    </div>
                    <span className="text-heading font-medium text-[14px] leading-snug pt-1.5">
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <p className="text-body text-[14px] leading-relaxed flex-1">
                  Accredited training providers are comprehensively reviewed to
                  ensure that they meet an extensive checklist of compliance.
                </p>
                <Button href="/contact" variant="filled" size="default">
                  Get Certified
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Trainer Re-certification ───── */}
      <FadeIn>
        <section className="py-10 md:py-12 bg-light-grey">
          <div className="container">
            <div className="max-w-[820px] mx-auto">
              <h2 className="text-heading font-bold text-[22px] md:text-[26px] mb-5">
                How to get re-certified with 2KO as a trainer?
              </h2>

              {/* Icon-led requirements row */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {trainerRequirements.map((req) => (
                  <div key={req.label} className="flex items-start gap-3 bg-white rounded-lg p-4">
                    <div className="w-9 h-9 rounded-lg bg-green/10 flex items-center justify-center shrink-0">
                      <svg className="w-[18px] h-[18px] text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d={req.icon} />
                      </svg>
                    </div>
                    <span className="text-heading font-medium text-[14px] leading-snug pt-1.5">
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <p className="text-body text-[14px] leading-relaxed flex-1">
                  Trainers seeking accreditation or recertification with 2KO
                  Africa are comprehensively reviewed against an extensive
                  compliance checklist.
                </p>
                <Button href="/contact" variant="filled" size="default">
                  Get Certified
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── CTA ───── */}
      <FadeIn>
        <section className="bg-green py-10 md:py-12">
          <div className="container text-center">
            <h2 className="font-semibold text-inverse text-[22px] md:text-[26px] mb-2">
              Ready to get certified?
            </h2>
            <p className="text-[15px] md:text-[16px] max-w-xl mx-auto mb-5 leading-relaxed text-inverse/85">
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
