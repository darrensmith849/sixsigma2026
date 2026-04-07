import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Request a Brochure | ${SITE_NAME}`,
  description:
    "Request our Six Sigma training brochure and course catalogue. Full details on White, Yellow, Green and Black Belt programmes available in South Africa.",
  path: "/brochure",
});

export default function BrochurePage() {
  return (
    <div className="pt-[80px]">
      <FadeIn>
        <section className="bg-green py-16 md:py-24">
          <div className="container text-center">
            <h1 className="!text-inverse mb-6">Request our brochure</h1>
            <p className="text-inverse/90 text-[20px] md:text-[24px] leading-relaxed max-w-3xl mx-auto">
              Get the full Six Sigma South Africa course catalogue delivered to
              your inbox — complete with outlines, durations, pricing and
              upcoming dates.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="container py-16 md:py-24 max-w-3xl text-center">
          <h2 className="mb-6">What is in the brochure?</h2>
          <ul className="text-body text-[20px] leading-relaxed space-y-3 list-disc pl-6 text-left mb-12 max-w-xl mx-auto">
            <li>Full Six Sigma belt curriculum (White → Black)</li>
            <li>Lean Management and short course details</li>
            <li>Classroom, virtual and self-paced options</li>
            <li>Pricing and group discounts</li>
            <li>On-site corporate training packages</li>
          </ul>
          <Button href="/contact" variant="filled" size="large">
            Request brochure
          </Button>
        </section>
      </FadeIn>
    </div>
  );
}
