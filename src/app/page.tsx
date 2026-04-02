import HeroSection from "@/components/HeroSection";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import ClientLogoGrid from "@/components/ClientLogoGrid";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        heading="Six Sigma training and certification in South Africa"
        imageSrc="/images/focused-man-working-with-laptop.jpg"
        imageAlt="Six Sigma training session"
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

      {/* Kickstart Section */}
      <section className="section bg-light-grey">
        <div className="container text-center">
          <SectionHeading
            subtitle="Explore our comprehensive range of courses, from White Belt to Black Belt. Our curriculum includes Lean Management and Root Cause Analysis as well. Embark on a path to success with our internationally recognized certifications."
          >
            Kickstart your Six Sigma journey
          </SectionHeading>
          <Button href="/courses" variant="filled" size="large">
            View our courses
          </Button>
        </div>
      </section>

      {/* Client Logo Grid */}
      <ClientLogoGrid />

      {/* Transforming Businesses CTA */}
      <CTASection
        heading="Transforming businesses across industries"
        description="We have empowered organizations to optimize their processes, reduce costs, and improve overall performance. Read inspiring testimonials and learn about our impact across various industries."
        buttonText="View our courses"
        buttonHref="/courses"
        variant="green"
      />

      {/* Events & Workshops CTA */}
      <CTASection
        heading="Stay ahead with our events and workshops"
        description="Join our upcoming webinars, workshops, and training sessions to stay up-to-date on the latest Six Sigma methodologies and industry best practices. Learn from experienced professionals and enhance your skills."
        buttonText="Enquire for dates"
        buttonHref="/contact"
        variant="light"
      />
    </>
  );
}
