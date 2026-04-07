import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import Eyebrow from "@/components/Eyebrow";
import CTASection from "@/components/CTASection";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Our Services | ${SITE_NAME}`,
  description:
    "Discover services offered in the Six Sigma space through world-leading experts. Consultancy, process improvement, quality management, project management, eLearning and corporate training.",
  path: "/services",
});

const services = [
  {
    eyebrow: "Strategy",
    title: "Consultancy",
    body:
      "Maximise efficiency and productivity with our expert consultancy. Our team of certified Six Sigma professionals works with your organisation to identify areas for improvement, develop strategies, and implement solutions for long-term success.",
    image: "/images/Consultancy-01.jpg",
    cta: "Enquire now",
    href: "/contact",
  },
  {
    eyebrow: "Operations",
    title: "Process Improvement",
    body:
      "Unlock your organisation's potential with our process improvement services. We apply Six Sigma methodologies to analyse and optimise your business processes, reducing waste and increasing profitability while maintaining the highest quality standards.",
    image: "/images/Process-improvement.jpg",
    cta: "Learn more",
    href: "/about",
  },
  {
    eyebrow: "Quality",
    title: "Quality Management",
    body:
      "Ensure your organisation meets the highest quality standards with our quality management services. We help you establish and maintain a robust quality management system, develop quality policies and conduct audits and assessments to monitor performance.",
    image: "/images/Quality-management.jpg",
    cta: "View courses",
    href: "/courses",
  },
  {
    eyebrow: "Delivery",
    title: "Project Management",
    body:
      "Drive successful project delivery with our structured project management services. Our experts help your teams plan effectively, coordinate resources, manage timelines and execute with precision — every project on time and within budget.",
    image: "/images/courses/Classroom-3.jpg",
    cta: "View courses",
    href: "/courses",
  },
  {
    eyebrow: "Self-paced",
    title: "eLearning Solutions",
    body:
      "Flexible, cost-effective learning. Our online courses accommodate various learning styles, allowing your team to study at their own pace from anywhere — with the same accreditation as our classroom programmes.",
    image: "/images/focused-man-working-with-laptop.jpg",
    cta: "View courses",
    href: "/courses",
  },
  {
    eyebrow: "Bespoke",
    title: "Corporate Training",
    body:
      "Empower your workforce with customised corporate training programmes. We offer a wide range of Six Sigma and Lean Management courses tailored to your organisation, delivered on-site or virtually anywhere in South Africa.",
    image: "/images/courses/custom-training.jpg",
    cta: "View courses",
    href: "/courses",
  },
  {
    eyebrow: "Sector-specific",
    title: "Industry Solutions",
    body:
      "Targeted solutions designed for your industry. We understand the unique challenges faced by different sectors and offer tailored services for manufacturing, healthcare, finance, mining, logistics and more.",
    image: "/images/Industry-specific-solutions.jpg",
    cta: "View courses",
    href: "/courses",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-green-900 text-white pt-[80px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 container-wide py-20 lg:py-28 text-center">
          <Eyebrow tone="white" className="mb-6 mx-auto">
            What we do
          </Eyebrow>
          <h1 className="!text-white mx-auto max-w-4xl">
            Services that turn theory into measurable improvement
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-[19px] md:text-[21px] text-white/80 leading-[1.65]">
            From hands-on consultancy to enterprise corporate training. We
            deliver Six Sigma services across South Africa and the wider
            African continent.
          </p>
        </div>
      </section>

      {/* ─── Services list ─── */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-wide space-y-24 md:space-y-32">
          {services.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <FadeIn key={s.title}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  <div
                    className={`lg:col-span-6 relative ${
                      reverse ? "lg:order-2" : ""
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-ink-100 [box-shadow:var(--shadow-xl)]">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div
                    className={`lg:col-span-6 ${reverse ? "lg:order-1" : ""}`}
                  >
                    <Eyebrow className="mb-5">{s.eyebrow}</Eyebrow>
                    <h2 className="mb-6">{s.title}</h2>
                    <p className="text-[18px] text-ink-500 leading-[1.65] mb-10 max-w-[540px]">
                      {s.body}
                    </p>
                    <Button href={s.href} variant="filled" size="large" trailingArrow>
                      {s.cta}
                    </Button>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <CTASection
        eyebrow="Let's talk"
        heading="Tell us about your improvement challenge"
        description="We'll match the right service and the right team to your goal — whether it's a single workshop or a multi-year transformation."
        buttonText="Get in touch"
        buttonHref="/contact"
        secondaryHref="/courses"
        secondaryText="View courses"
        variant="dark"
      />
    </>
  );
}
