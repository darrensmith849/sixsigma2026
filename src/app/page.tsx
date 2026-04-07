import type { Metadata } from "next";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Six Sigma Training & Certification in South Africa | ${SITE_NAME}`,
  description:
    "Internationally accredited Six Sigma training and certification across South Africa. White, Yellow, Green and Black Belt courses in Johannesburg, Cape Town, Durban, Pretoria and Port Elizabeth.",
  path: "/",
});

import Button from "@/components/Button";
import ClientLogoGrid from "@/components/ClientLogoGrid";
import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <FadeIn>
        <HeroSection
          heading="Six Sigma training and certification in South Africa"
          imageSrc="/images/hero-presentation.jpg"
          imageAlt="Six Sigma training presentation"
          actions={
            <>
              <Button href="/contact" variant="filled" size="large">
                Enquire Now
              </Button>
              <Button href="/courses" variant="outline" size="large">
                FREE White Belt
              </Button>
            </>
          }
        >
          <p>
            Welcome to Six Sigma South Africa&trade;, the premier provider of Six
            Sigma training and certification on the African continent. Our lean
            courses in South Africa are internationally accredited through CSSC
            (USA). Our expert team is committed to helping individuals and
            organizations achieve process excellence and drive continuous
            improvement.
          </p>
          <p>
            For quick contact, you can send us an email{" "}
            <a href="/contact">here</a>. We offer training in{" "}
            <a href="/courses">Johannesburg</a>,{" "}
            <a href="/courses">Cape Town</a>,{" "}
            <a href="/courses">Durban</a>,{" "}
            <a href="/courses">Pretoria</a>,{" "}
            <a href="/courses">Port Elizabeth</a> and elsewhere in{" "}
            <a href="/courses">South Africa</a>.
          </p>
          <p>
            We also offer <a href="/courses">Root Cause Analysis</a> training.
          </p>
        </HeroSection>
      </FadeIn>

      {/* Kickstart Section — 2-column: image left, green text right */}
      <FadeIn>
        <section className="flex flex-col lg:flex-row">
          <div className="relative w-full lg:w-1/2 min-h-[400px] lg:min-h-[500px]">
            <Image
              src="/images/kickstart-businessman.jpg"
              alt="Six Sigma professional"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="w-full lg:w-1/2 bg-green flex items-center">
            <div className="px-8 md:px-12 lg:px-20 py-16 lg:py-24 max-w-[680px]">
              <h2 className="text-inverse font-semibold mb-4">
                Kickstart your Six Sigma journey
              </h2>
              <p className="text-inverse/90 text-[21px] leading-relaxed mb-8">
                Explore our comprehensive range of courses, from White Belt to
                Black Belt. Our curriculum includes Lean Management and Root Cause
                Analysis as well. Embark on a path to success with our
                internationally recognized certifications.
              </p>
              <Button href="/courses" variant="white" size="large">
                View our courses
              </Button>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Client Logo Grid */}
      <FadeIn>
        <ClientLogoGrid />
      </FadeIn>

      {/* Transforming Businesses CTA */}
      <FadeIn>
        <CTASection
          heading="Transforming businesses across industries"
          description="We have empowered organizations to optimize their processes, reduce costs, and improve overall performance. Read inspiring testimonials and learn about our impact across various industries."
          buttonText="View our courses"
          buttonHref="/courses"
          variant="green"
          iconSrc="/images/Success-stories-01.png"
          iconAlt="Process improvement"
        />
      </FadeIn>

      {/* Events & Workshops — 2-column: text left, image right */}
      <FadeIn>
        <section className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 bg-white flex items-center">
            <div className="px-8 md:px-12 lg:px-20 py-16 lg:py-24 max-w-[680px] lg:ml-auto">
              <h2 className="text-heading font-semibold mb-4">
                Stay ahead with our events and workshops
              </h2>
              <p className="text-body text-[21px] leading-relaxed mb-8">
                Join our upcoming webinars, workshops, and training sessions to
                stay up-to-date on the latest Six Sigma methodologies and industry
                best practices. Learn from experienced professionals and enhance
                your skills.
              </p>
              <Button href="/contact" variant="filled" size="large">
                Enquire for dates
              </Button>
            </div>
          </div>
          <div className="relative w-full lg:w-1/2 min-h-[400px] lg:min-h-[500px]">
            <Image
              src="/images/events-certification.jpg"
              alt="Six Sigma Green Belt certification ceremony"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </section>
      </FadeIn>
    </>
  );
}
