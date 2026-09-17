import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import Eyebrow from "@/components/Eyebrow";
import CTASection from "@/components/CTASection";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import BreadcrumbsJsonLd from "@/seo-kit/schema/breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: `Our Services | ${SITE_NAME}`,
  description:
    "Six Sigma training is the entry point: certification, Sigmafy Statistics for the measurement, Integrated Improvement Partnerships to sustain the cadence, and systems work when the process itself is the constraint.",
  path: "/services",
});

/**
 * The four stages, as the page's spine.
 *
 * The site sells training and ranks on training, so Train leads and the rest
 * follow as the sequence after it — not as a menu of equals. Sustain and Build
 * link to 2ko.co.za rather than describing themselves here: 2KO owns that
 * content and two sites competing for the same terms would cost both.
 *
 * The existing service list below is kept intact underneath. It carries real
 * body copy and probably real rankings, and with Search Console still
 * unverified there is no way to see what removing it would cost.
 */
const capabilities = [
  {
    stage: "Train",
    title: "Six Sigma certification",
    body:
      "White through Black Belt, internationally accredited through CSSC USA, delivered in classroom, virtual and self-paced formats across South Africa. This is the entry point and the thing most organisations need first.",
    href: "/courses",
    cta: "Browse courses",
    external: false,
  },
  {
    stage: "Measure",
    title: "Sigmafy Statistics",
    body:
      "312 statistical tools that run in the browser, with projects, gates and verified benefit in one place. Green Belt certification includes twelve months and Black Belt twenty-four, at no extra cost — so there is no separate licence to buy to finish a project.",
    href: "/courses",
    cta: "See which courses include it",
    external: false,
  },
  {
    stage: "Sustain",
    title: "Integrated Improvement Partnerships",
    body:
      "For organisations that would rather buy the improvement cadence than build it internally. Run by 2KO on an annual basis, combining senior process consulting, a training allowance for further cohorts, bounded automation capacity and Sigmafy for the benefit evidence.",
    href: "https://www.2ko.co.za/managed-improvement",
    cta: "How the partnerships work",
    external: true,
  },
  {
    stage: "Build",
    title: "Systems and automation",
    body:
      "Sometimes DMAIC concludes that the process cannot improve much further while it runs on spreadsheets and email. Building the system the improved process needs is different work, and 2KO does it separately.",
    href: "https://www.2ko.co.za/systems",
    cta: "Systems and automation",
    external: true,
  },
];

const services = [
  {
    eyebrow: "Strategy",
    title: "Consultancy",
    body:
      "Maximise efficiency and productivity with our expert consultancy. Our team of certified Six Sigma professionals works with your organisation to identify areas for improvement, develop strategies, and implement solutions for long-term success.",
    image: "/images/Consultancy-01.jpg",
    cta: "Enquire now",
    href: "/contact#enquiry-form",
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
      <BreadcrumbsJsonLd
        siteUrl={SITE_URL}
        crumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
      />

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
        <div className="relative z-10 container-wide py-20 md:py-28 lg:py-40 text-center">
          <Eyebrow tone="white" className="mb-6 mx-auto">
            What we do
          </Eyebrow>
          <h1 className="!text-white mx-auto max-w-4xl">
            Services that turn theory into measurable improvement
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-[19px] md:text-[21px] text-white/80 leading-[1.65]">
            From hands-on consultancy to enterprise corporate training. We
            deliver Six Sigma services in{" "}
            <a href="/courses/in/johannesburg" className="!text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
              Johannesburg
            </a>
            ,{" "}
            <a href="/courses/in/cape-town" className="!text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
              Cape Town
            </a>
            ,{" "}
            <a href="/courses/in/durban" className="!text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
              Durban
            </a>
            ,{" "}
            <a href="/courses/in/pretoria" className="!text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
              Pretoria
            </a>{" "}
            and{" "}
            <a href="/courses/in/port-elizabeth" className="!text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
              Port Elizabeth
            </a>
            {" "}
            — plus on-site across the African continent.
          </p>
        </div>
      </section>

      {/* ─── The four stages ─── */}
      <FadeIn>
        <section className="bg-ink-50 py-24 md:py-32">
          <div className="container-wide">
            <Eyebrow className="mb-5">What we do</Eyebrow>
            <h2 className="max-w-3xl">
              Training is the entry point, not the whole job
            </h2>
            <p className="mt-6 max-w-3xl text-[17px] leading-[1.7] text-ink-600">
              Certified people are the start. Keeping the improvement running
              needs somewhere to hold the measurement, and sometimes a partner
              or a system underneath it. Here is the whole sequence, in order.
            </p>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
              {capabilities.map((c) => (
                <div
                  key={c.stage}
                  className="flex flex-col rounded-[24px] border border-ink-100 bg-white p-10 [box-shadow:var(--shadow-md)]"
                >
                  <div className="text-[13px] font-semibold uppercase tracking-[0.1em] text-green-700">
                    {c.stage}
                  </div>
                  <h3 className="mt-3 text-[22px] font-bold tracking-[-0.02em]">
                    {c.title}
                  </h3>
                  <p className="mt-4 flex-1 text-[16px] leading-[1.7] text-ink-600">
                    {c.body}
                  </p>
                  {c.external ? (
                    <a
                      href={c.href}
                      className="mt-6 font-semibold text-green-700 hover:text-green-800"
                    >
                      {c.cta} on 2ko.co.za →
                    </a>
                  ) : (
                    <Link
                      href={c.href}
                      className="mt-6 font-semibold text-green-700 hover:text-green-800"
                    >
                      {c.cta} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

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
        buttonHref="/contact#enquiry-form"
        secondaryHref="/courses"
        secondaryText="View courses"
        variant="dark"
      />
    </>
  );
}
