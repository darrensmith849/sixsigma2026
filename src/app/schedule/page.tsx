import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Training Schedule | ${SITE_NAME}`,
  description:
    "Upcoming Six Sigma training dates across South Africa — Johannesburg, Cape Town, Durban, Pretoria and Port Elizabeth. Enquire for the latest schedule.",
  path: "/schedule",
});

export default function SchedulePage() {
  return (
    <div className="pt-[80px]">
      <FadeIn>
        <section className="bg-green py-16 md:py-24">
          <div className="container text-center">
            <h1 className="!text-inverse mb-6">Training schedule</h1>
            <p className="text-inverse/90 text-[20px] md:text-[24px] leading-relaxed max-w-3xl mx-auto">
              We run Six Sigma training throughout the year across major South
              African cities. Contact us for the most up-to-date schedule and
              to reserve your seat.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="container py-16 md:py-24 max-w-4xl">
          <h2 className="mb-6">Upcoming sessions</h2>
          <p className="text-body text-[20px] leading-relaxed mb-6">
            Our public course calendar covers Johannesburg, Cape Town, Durban,
            Pretoria and Port Elizabeth. Virtual and self-paced online courses
            are available year-round.
          </p>
          <p className="text-body text-[20px] leading-relaxed mb-12">
            Because dates are updated frequently and often fill up fast, we
            confirm the next available seats by direct enquiry. Let us know
            which course, city and preferred dates work for you and we will
            come back to you within one business day.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact" variant="filled" size="large">
              Enquire for dates
            </Button>
            <Button href="/courses" variant="outline" size="large">
              View courses
            </Button>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
