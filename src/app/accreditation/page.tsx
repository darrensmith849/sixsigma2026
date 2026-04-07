import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Accreditation | ${SITE_NAME}`,
  description:
    "Our Six Sigma courses are internationally accredited through the Council for Six Sigma Certification (CSSC) in the USA. Learn more about our accreditation.",
  path: "/accreditation",
});

export default function AccreditationPage() {
  return (
    <div className="pt-[80px]">
      <FadeIn>
        <section className="bg-green py-16 md:py-24">
          <div className="container text-center">
            <h1 className="!text-inverse mb-6">International accreditation</h1>
            <p className="text-inverse/90 text-[20px] md:text-[24px] leading-relaxed max-w-3xl mx-auto">
              Our Six Sigma certifications are recognised globally through our
              accreditation with the Council for Six Sigma Certification (CSSC)
              in the United States.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="container py-16 md:py-24 max-w-4xl">
          <h2 className="mb-6">Why accreditation matters</h2>
          <p className="text-body text-[20px] leading-relaxed mb-6">
            A Six Sigma certification is only as valuable as the body that
            issues it. By partnering with CSSC (USA) we ensure that every
            certificate we issue carries the weight of one of the most
            recognised Six Sigma accreditation bodies in the world.
          </p>
          <p className="text-body text-[20px] leading-relaxed mb-6">
            This means that employers, clients and partners — anywhere in the
            world — will immediately recognise the standard of training behind
            your qualification.
          </p>
          <h2 className="mb-6 mt-12">What CSSC accreditation covers</h2>
          <ul className="space-y-3 text-body text-[20px] leading-relaxed list-disc pl-6 mb-12">
            <li>White, Yellow, Green and Black Belt Six Sigma certifications</li>
            <li>Lean Management and Lean Six Sigma programmes</li>
            <li>Short courses including 5S and Kaizen</li>
            <li>Instructor-led, virtual and self-paced delivery</li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <Button href="/courses" variant="filled" size="large">
              View our courses
            </Button>
            <Button href="/contact" variant="outline" size="large">
              Contact us
            </Button>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
