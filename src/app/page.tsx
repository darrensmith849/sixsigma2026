import type { Metadata } from "next";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import Button from "@/components/Button";
import ClientLogoGrid from "@/components/ClientLogoGrid";
import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";
import Eyebrow from "@/components/Eyebrow";
import StatBlock from "@/components/StatBlock";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import CourseCard from "@/components/CourseCard";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Six Sigma Training & Certification in South Africa | ${SITE_NAME}`,
  description:
    "Internationally accredited Six Sigma training and certification across South Africa. White, Yellow, Green and Black Belt courses in Johannesburg, Cape Town, Durban, Pretoria and Port Elizabeth.",
  path: "/",
});

const featuredCourses = [
  {
    title: "White Belt Online",
    description:
      "A free introductory course providing a basic understanding of Six Sigma concepts, terminology, and the DMAIC methodology.",
    includes: [
      "Self-paced online modules",
      "Introduction to Six Sigma",
      "Digital certificate",
    ],
    mode: "Online" as const,
    imageSrc: "/images/courses/Online-1.jpg",
    href: "/courses/white-belt-online",
    isFree: true,
  },
  {
    title: "DMAIC Green Belt",
    description:
      "Comprehensive Define-Measure-Analyse-Improve-Control training. Lead small to medium improvement projects.",
    includes: [
      "Full DMAIC methodology",
      "Statistical analysis tools",
      "CSSC accredited certificate",
    ],
    mode: "Classroom" as const,
    imageSrc: "/images/courses/Classroom-3.jpg",
    href: "/courses/dmaic-green-belt-classroom",
  },
  {
    title: "DMAIC Black Belt",
    description:
      "Advanced statistical training and analysis tools for project leaders. Deeper analysis and stakeholder leadership.",
    includes: [
      "Advanced statistical methods",
      "Change management",
      "CSSC accredited certificate",
    ],
    mode: "Virtual" as const,
    imageSrc: "/images/courses/Virtual-5.jpg",
    href: "/courses/dmaic-black-belt-virtual",
  },
];

export default function Home() {
  return (
    <>
      {/* ─── Hero ─── */}
      <HeroSection
        eyebrow="Internationally accredited · CSSC USA"
        heading="Master Six Sigma in South Africa"
        imageSrc="/images/hero-presentation.jpg"
        imageAlt="Six Sigma training presentation"
        badge={{ value: "12,000+", label: "Professionals trained" }}
        actions={
          <>
            <Button href="/contact#enquiry-form" variant="filled" size="large" trailingArrow>
              Enquire now
            </Button>
            <Button href="/courses/white-belt-online" variant="white" size="large">
              Free White Belt
            </Button>
          </>
        }
      >
        <p>
          The premier provider of internationally accredited Six Sigma training
          and certification on the African continent. White, Yellow, Green and
          Black Belt courses delivered in classroom, virtual and self-paced
          online formats.
        </p>
        <p>
          We train teams in{" "}
          <a href="/courses/in/johannesburg">Johannesburg</a>,{" "}
          <a href="/courses/in/cape-town">Cape Town</a>,{" "}
          <a href="/courses/in/durban">Durban</a>,{" "}
          <a href="/courses/in/pretoria">Pretoria</a> and{" "}
          <a href="/courses/in/port-elizabeth">Port Elizabeth</a> — and on-site
          anywhere in South Africa.
        </p>
      </HeroSection>

      {/* ─── Trust strip ─── */}
      <FadeIn>
        <ClientLogoGrid />
      </FadeIn>

      {/* ─── Stats row ─── */}
      <FadeIn>
        <section className="bg-ink-50 py-24">
          <div className="container-wide">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
              <StatBlock value="12,000+" label="Professionals trained" />
              <StatBlock value="18+ yrs" label="Training experience" />
              <StatBlock value="5" label="Cities served" />
              <StatBlock value="100%" label="CSSC accredited" />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── Featured courses ─── */}
      <FadeIn>
        <section className="py-24 md:py-32 bg-white">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Our courses"
              subtitle="From Free White Belt to advanced Black Belt — every course is internationally accredited and delivered by experienced practitioners."
              align="left"
            >
              Six Sigma certifications, your way
            </SectionHeading>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((c) => (
                <CourseCard key={c.title} {...c} />
              ))}
            </div>

            <div className="mt-14 flex justify-center">
              <Button href="/courses" variant="outline" size="large" trailingArrow>
                Browse all courses
              </Button>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── Kickstart split ─── */}
      <FadeIn>
        <section className="relative overflow-hidden bg-green-900">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 container-wide py-24 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[24px] border border-white/10 [box-shadow:var(--shadow-xl)]">
                  <Image
                    src="/images/kickstart-businessman.jpg"
                    alt="Six Sigma professional"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="lg:col-span-6">
                <Eyebrow tone="white" className="mb-6">
                  Kickstart your journey
                </Eyebrow>
                <h2 className="!text-white mb-6">
                  From foundation to fluency in Six Sigma
                </h2>
                <p className="text-[19px] leading-[1.65] text-white/80 mb-10 max-w-[540px]">
                  Explore our comprehensive range of courses, from White Belt to
                  Black Belt. Our curriculum includes Lean Management and Root
                  Cause Analysis. Embark on a path to success with our
                  internationally recognised certifications.
                </p>
                <Button href="/courses" variant="white" size="large" trailingArrow>
                  View our courses
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── Testimonials ─── */}
      <FadeIn>
        <section className="bg-ink-50 py-24 md:py-32">
          <div className="container-wide">
            <SectionHeading
              eyebrow="What clients say"
              subtitle="The organisations who train with us are some of South Africa&rsquo;s most demanding employers."
              align="center"
            >
              Trusted by South Africa&rsquo;s leaders
            </SectionHeading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <TestimonialCard
                quote="The Green Belt programme transformed how our operations team approaches process improvement. Within six months we measured material savings."
                name="Operations Director"
                role="Manufacturing Sector"
                logo="/images/client-logos/Colour-Logo-Toyota.png"
                logoAlt="Toyota"
              />
              <TestimonialCard
                quote="Practical, well-structured and properly accredited. We now run all our continuous improvement training through Six Sigma South Africa."
                name="Head of Learning"
                role="Financial Services"
                logo="/images/client-logos/Colour-Logo-Standard-Bank.png"
                logoAlt="Standard Bank"
              />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── Final CTA ─── */}
      <CTASection
        eyebrow="Ready to get started?"
        heading="Train with the most accredited Six Sigma provider in Africa"
        description="Whether you're an individual exploring Six Sigma or a team leader rolling out an enterprise programme, we have a course that fits."
        buttonText="Enquire now"
        buttonHref="/contact"
        secondaryText="Browse courses"
        secondaryHref="/courses"
        variant="dark"
      />
    </>
  );
}
