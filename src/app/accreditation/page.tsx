import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import RecertificationSection from "@/components/RecertificationSection";
import {
  BadgeDollarSign,
  FileText,
  IdCard,
  GraduationCap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Accreditation | Six Sigma South Africa",
  description:
    "2KO Africa is the official industry standard for Lean and Six Sigma accreditation and certification in South Africa and the rest of Africa.",
};

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
        <RecertificationSection
          badge="Individual"
          title="How to get re-certified with 2KO as an individual?"
          price="R1,900"
          description="Contact us to begin your individual re-certification process with 2KO Africa."
          note="Accredited training providers are comprehensively reviewed to ensure that they meet an extensive checklist of compliance."
          ctaHref="/contact"
          items={[
            { icon: BadgeDollarSign, text: "R1,900 inc VAT" },
            { icon: FileText, text: "Must submit your project" },
            { icon: IdCard, text: "Must provide CV, with references" },
            { icon: GraduationCap, text: "Must have been previously taught by a recognised institution" },
          ]}
        />
      </FadeIn>

      {/* ───── Trainer Re-certification ───── */}
      <FadeIn>
        <RecertificationSection
          badge="Trainer"
          title="How to get re-certified with 2KO as a trainer?"
          price="R2,400"
          description="Contact us to begin your trainer re-certification process with 2KO Africa."
          note="Trainers seeking accreditation or recertification with 2KO Africa are comprehensively reviewed against an extensive compliance checklist."
          ctaHref="/contact"
          bgClass="bg-light-grey"
          items={[
            { icon: BadgeDollarSign, text: "R2,400 inc VAT" },
            { icon: FileText, text: "Must submit your project" },
            { icon: IdCard, text: "Must provide CV, with references" },
            { icon: GraduationCap, text: "Must have been previously taught by a recognised institution" },
          ]}
        />
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
