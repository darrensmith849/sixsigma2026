import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Accreditation | Six Sigma South Africa",
  description:
    "2KO Africa CC has achieved both international and local accreditation for our Six Sigma courses. CSSC aligned. MICT SETA accredited.",
};

export default function AccreditationPage() {
  return (
    <div className="pt-[80px]">
      <FadeIn>
        <section className="section">
          <div className="container">
            <SectionHeading
              subtitle="2KO Africa CC has achieved both International and local accreditation for our Six Sigma courses. Providing our clients with the peace of mind that our training is of the highest standard."
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
                  industry that does not provide training, mentoring, coaching,
                  or consulting services. Our objective is to ensure that Six
                  Sigma Certified individuals have been exposed to the complete
                  Six Sigma Body of Knowledge and have been required to meet a
                  minimum standard of proficiency for Six Sigma and its
                  implementation.
                </p>
              </div>
              <div className="bg-light-grey rounded-lg p-6">
                <h3 className="text-heading font-semibold mb-3">
                  MICT SETA Accreditation: 2007/01/215
                </h3>
                <p className="text-body text-[18px] leading-relaxed">
                  Unit Standard: 243816 | Developing a project quality
                  management plan for a simple to moderately complex project |
                  Level 5
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

      <FadeIn>
        <section className="section bg-light-grey">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-heading font-semibold mb-6">
              Is 2KO Africa certification internationally recognised?
            </h2>
            <p className="text-body text-[18px] leading-relaxed mb-4">
              2KO Africa is the most recognised certification body for Africa.
              We are the only company that is authorised by MICT SETA in South
              Africa for six sigma certifications. We are a member of CSSC
              (Council for Six Sigma Certification), which is USA based.
            </p>
            <p className="text-body text-[18px] leading-relaxed">
              Typically, however, six sigma accreditation is dependent on the
              black belt trainer who certifies you. Our trainers are IASSC and
              CSSC certified.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="section bg-green">
          <div className="container text-center">
            <h2 className="font-semibold text-inverse mb-4">
              Ready to get certified?
            </h2>
            <p className="text-[21px] max-w-3xl mx-auto mb-8 leading-relaxed text-inverse/90">
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
