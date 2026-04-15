import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import JsonLd from "@/components/JsonLd";
import Eyebrow from "@/components/Eyebrow";
import StatBlock from "@/components/StatBlock";
import CourseCard from "@/components/CourseCard";
import CTASection from "@/components/CTASection";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { cities, getCity } from "./cityData";
import { courses } from "../../[slug]/courseData";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const found = getCity(city);
  if (!found) return { title: "City not found" };
  return buildMetadata({
    title: `Six Sigma Training in ${found.name} | ${SITE_NAME}`,
    description: `Internationally accredited Six Sigma training and certification in ${found.name}, ${found.province}. White, Yellow, Green and Black Belt courses delivered in classroom, virtual and self-paced online formats.`,
    path: `/courses/in/${found.slug}`,
  });
}

const featuredSlugs = [
  "white-belt-online",
  "dmaic-green-belt-classroom",
  "dmaic-black-belt-classroom",
];

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const found = getCity(city);
  if (!found) notFound();

  const featured = courses.filter((c) => featuredSlugs.includes(c.slug));

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: `${SITE_NAME} — ${found.name}`,
    url: `${SITE_URL}/courses/in/${found.slug}`,
    parentOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    telephone: "+27-21-426-5300",
    email: "info@2ko.co.za",
    areaServed: {
      "@type": "City",
      name: found.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: found.province,
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: found.locality,
      addressRegion: found.region,
      addressCountry: "ZA",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: `${SITE_URL}/courses`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Six Sigma Training in ${found.name}`,
        item: `${SITE_URL}/courses/in/${found.slug}`,
      },
    ],
  };

  const otherCities = cities.filter((c) => c.slug !== found.slug);

  return (
    <>
      <JsonLd data={[localBusinessJsonLd, breadcrumbJsonLd]} />

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
            {found.province} · CSSC accredited
          </Eyebrow>
          <h1 className="!text-white mx-auto max-w-4xl">
            Six Sigma training in {found.name}
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-[19px] md:text-[21px] text-white/80 leading-[1.65]">
            {found.shortIntro}
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact#enquiry-form" variant="filled" size="large" trailingArrow>
              Enquire about {found.name} courses
            </Button>
            <Button href="/courses" variant="ghost-white" size="large">
              View all courses
            </Button>
          </div>
        </div>
      </section>

      {/* ─── City body ─── */}
      <FadeIn>
        <section className="bg-white py-24 md:py-32">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7">
                <Eyebrow className="mb-5">About our {found.name} training</Eyebrow>
                <h2 className="mb-8">
                  Internationally accredited training, on your doorstep
                </h2>
                <p className="text-[18px] text-ink-500 leading-[1.7]">
                  {found.body}
                </p>
                <p className="mt-6 text-[18px] text-ink-500 leading-[1.7]">
                  Every certificate we issue in {found.name} is internationally
                  accredited through the Council for Six Sigma Certification
                  (CSSC) in the United States, and we hold local MICT SETA
                  accreditation as well.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-[24px] border border-ink-100 bg-white p-10 [box-shadow:var(--shadow-lg)]">
                  <Eyebrow className="mb-5">At a glance</Eyebrow>
                  <h3 className="mb-6">{found.name} programme</h3>
                  <dl className="space-y-5 border-t border-b border-ink-100 py-6">
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Location
                      </dt>
                      <dd className="text-[15px] font-semibold text-ink-900 text-right">
                        {found.name}, {found.province}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Delivery
                      </dt>
                      <dd className="text-[15px] font-semibold text-ink-900 text-right">
                        Classroom · Virtual · On-site
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Accreditation
                      </dt>
                      <dd className="text-[15px] font-semibold text-ink-900 text-right">
                        CSSC USA · MICT SETA
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                        Belts
                      </dt>
                      <dd className="text-[15px] font-semibold text-ink-900 text-right">
                        White → Black
                      </dd>
                    </div>
                  </dl>
                  <Button
                    href="/contact#enquiry-form"
                    variant="filled"
                    size="default"
                    trailingArrow
                    className="mt-6 w-full"
                  >
                    Enquire now
                  </Button>
                  <p className="mt-4 text-center text-[13px] text-ink-500">
                    Or call{" "}
                    <a href="tel:+27215270065" className="font-semibold text-green-700">
                      021 527 0065
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── Stats row ─── */}
      <FadeIn>
        <section className="bg-ink-50 py-20">
          <div className="container-wide">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
              <StatBlock value="12,000+" label="Professionals trained" />
              <StatBlock value="20+ yrs" label="Of training experience" />
              <StatBlock value="100%" label="CSSC accredited" />
              <StatBlock value={found.province} label="Province" />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── Featured courses ─── */}
      <FadeIn>
        <section className="bg-white py-24 md:py-32">
          <div className="container-wide">
            <div className="mb-14 max-w-3xl">
              <Eyebrow>Popular courses in {found.name}</Eyebrow>
              <h2 className="mt-5">
                Start with one of our most-booked programmes
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((c) => (
                <CourseCard
                  key={c.slug}
                  title={c.title}
                  description={c.description}
                  includes={[
                    "CSSC accredited certificate",
                    `Available in ${found.name}`,
                    c.duration,
                  ]}
                  mode={c.mode}
                  imageSrc={c.image}
                  href={`/courses/${c.slug}`}
                  isFree={c.slug === "white-belt-online"}
                />
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Button href="/courses" variant="outline" size="large" trailingArrow>
                Browse all 30 courses
              </Button>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── Other cities ─── */}
      <FadeIn>
        <section className="bg-ink-50 py-20">
          <div className="container-wide text-center">
            <Eyebrow className="mx-auto mb-5">Other locations</Eyebrow>
            <h3 className="mb-8">We also train in</h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {otherCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/courses/in/${c.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-white px-5 py-2.5 text-[14px] font-semibold text-ink-900 transition-all duration-[var(--dur)] hover:-translate-y-[1px] hover:border-green-500 hover:text-green-700 [box-shadow:var(--shadow-sm)] hover:[box-shadow:var(--shadow-md)]"
                >
                  Six Sigma {c.name}
                  <span className="text-green-500">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── CTA ─── */}
      <CTASection
        eyebrow="Ready to enquire?"
        heading={`Train your team in ${found.name}`}
        description="Tell us your role, your team size and your preferred dates and we'll come back to you within one business day with available course slots."
        buttonText="Get in touch"
        buttonHref="/contact"
        secondaryHref="/courses"
        secondaryText="Browse courses"
        variant="dark"
      />
    </>
  );
}
