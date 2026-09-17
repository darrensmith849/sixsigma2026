import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Eyebrow from "@/components/Eyebrow";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import {
  buildMetadata,
  LASTMOD_CACHE,
  PUBLISHER_ORG,
  SITE_LAUNCH_DATE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import BreadcrumbsJsonLd from "@/seo-kit/schema/breadcrumbs";
import { buildArticleSchema } from "@/seo-kit/schema/article";

/**
 * The page that answers what happens when the course ends.
 *
 * Deliberately not on the course pages. Someone searching "green belt
 * johannesburg" wants a course, and consultancy messaging on that page costs
 * conversion and dilutes the topical focus the site ranks on. This sits at the
 * end of the journey instead, where the question is genuinely being asked —
 * and where the person asking is the employer rather than the delegate.
 *
 * It links to 2ko.co.za rather than reproducing it. 2KO owns the retainer and
 * systems content; two sites competing for the same terms would cost both.
 */

const DESCRIPTION =
  "Certification gives you capable people, not a running programme. What usually stalls after the first cohort, how to keep improvement going yourself, and when it is worth bringing in a partner.";

const articleJsonLd = buildArticleSchema({
  headline: "After your Six Sigma certification",
  description: DESCRIPTION,
  url: `${SITE_URL}/after-certification`,
  image: `${SITE_URL}/og-image.jpg`,
  datePublished: LASTMOD_CACHE["/after-certification"] ?? SITE_LAUNCH_DATE,
  dateModified: LASTMOD_CACHE["/after-certification"] ?? SITE_LAUNCH_DATE,
  author: PUBLISHER_ORG,
  publisher: PUBLISHER_ORG,
});

export const metadata: Metadata = buildMetadata({
  title: `After Your Six Sigma Certification | ${SITE_NAME}`,
  description: DESCRIPTION,
  path: "/after-certification",
});

/** The honest failure modes. Naming them is what makes the rest credible. */
const stalls = [
  {
    title: "The project stops at Define",
    body:
      "A belt returns to a full-time job with a project attached to it. Without a named sponsor, a deadline and time actually protected in the diary, the charter gets written and nothing moves. This is the single most common outcome, and it is a scheduling failure rather than a training one.",
  },
  {
    title: "Nobody owns the measurement",
    body:
      "Improvements that were never baselined cannot be verified, so the saving becomes a matter of opinion. Six months later finance asks what the programme returned and no one can answer with evidence — which is usually the moment the budget goes.",
  },
  {
    title: "The next cohort starts from zero",
    body:
      "The first group's work lives in their laptops. New delegates repeat the same analysis on the same processes because nothing was written down in a place the next person would look.",
  },
];

export default function AfterCertificationPage() {
  return (
    <>
      <JsonLd data={articleJsonLd} />
      <BreadcrumbsJsonLd
        siteUrl={SITE_URL}
        crumbs={[
          { name: "Home", url: "/" },
          { name: "After Your Certification", url: "/after-certification" },
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
            After the course
          </Eyebrow>
          <h1 className="!text-white mx-auto max-w-4xl">
            Your people are certified. Now what?
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-[19px] md:text-[21px] text-white/80 leading-[1.65]">
            Certification gives you capable people. It does not, on its own,
            give you a running improvement programme — and the gap between the
            two is where most Six Sigma rollouts quietly stop.
          </p>
        </div>
      </section>

      {/* ─── What usually stalls ─── */}
      <FadeIn>
        <section className="bg-white py-24 md:py-32">
          <div className="container-wide">
            <Eyebrow className="mb-5">The honest part</Eyebrow>
            <h2 className="max-w-3xl">What usually stalls</h2>
            <p className="mt-6 max-w-3xl text-[17px] leading-[1.7] text-ink-600">
              We would rather tell you this before you book than after. Three
              things account for most of it, and none of them are about the
              quality of the training.
            </p>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
              {stalls.map((s) => (
                <div
                  key={s.title}
                  className="rounded-[24px] border border-ink-100 bg-white p-10 [box-shadow:var(--shadow-md)]"
                >
                  <h3 className="text-[20px] font-bold tracking-[-0.018em]">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-[16px] leading-[1.7] text-ink-600">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── Three ways forward ─── */}
      <FadeIn>
        <section className="bg-ink-50 py-24 md:py-32">
          <div className="container-wide">
            <Eyebrow className="mb-5">Three ways forward</Eyebrow>
            <h2 className="max-w-3xl">
              In ascending order of commitment
            </h2>

            <div className="mt-14 space-y-8">
              {/* 1 — do it yourself. Genuinely free advice. */}
              <div className="rounded-[24px] border border-ink-100 bg-white p-10 md:p-12">
                <div className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-400">
                  01 — Run it yourself
                </div>
                <h3 className="mt-3 text-[24px] font-bold tracking-[-0.02em]">
                  Most organisations can, and should, try this first
                </h3>
                <p className="mt-5 max-w-3xl text-[16px] leading-[1.7] text-ink-600">
                  Nothing here needs us. Give every certified belt a named
                  sponsor at executive level and a project with a deadline.
                  Protect time in the diary — half a day a week, in the
                  calendar, is the difference between a project that finishes
                  and one that does not. Baseline before you change anything,
                  so the improvement can be proved rather than argued.
                  Review progress on a fixed monthly cadence that survives
                  someone being on leave. And keep the analysis somewhere the
                  next cohort will find it.
                </p>
                <p className="mt-4 max-w-3xl text-[16px] leading-[1.7] text-ink-600">
                  If you do only one of those, make it the protected time. It
                  is the constraint far more often than capability is.
                </p>
              </div>

              {/* 2 — the tool they already have. */}
              <div className="rounded-[24px] border border-ink-100 bg-white p-10 md:p-12">
                <div className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-400">
                  02 — Keep the measurement in one place
                </div>
                <h3 className="mt-3 text-[24px] font-bold tracking-[-0.02em]">
                  You already have Sigmafy
                </h3>
                <p className="mt-5 max-w-3xl text-[16px] leading-[1.7] text-ink-600">
                  Green Belt certification includes twelve months of Sigmafy
                  Statistics and Black Belt twenty-four — 312 statistical tools
                  that run in the browser, with projects, gates and verified
                  benefit held in one place rather than across a dozen
                  spreadsheets. Most of the second failure above disappears if
                  the baseline and the result live somewhere finance can see
                  them.
                </p>
                <Link
                  href="/courses"
                  className="mt-6 inline-block font-semibold text-green-700 hover:text-green-800"
                >
                  See which courses include it →
                </Link>
              </div>

              {/* 3 — the partner option, owned by 2ko.co.za. */}
              <div className="rounded-[24px] border border-green-200 bg-white p-10 md:p-12">
                <div className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-400">
                  03 — Bring in a partner
                </div>
                <h3 className="mt-3 text-[24px] font-bold tracking-[-0.02em]">
                  When you need the cadence guaranteed
                </h3>
                <p className="mt-5 max-w-3xl text-[16px] leading-[1.7] text-ink-600">
                  Some organisations do not have the bandwidth to hold a
                  programme together internally, and would rather buy the
                  cadence than build it. 2KO runs Integrated Improvement
                  Partnerships on an annual basis, combining senior process
                  consulting, a training allowance for further cohorts,
                  bounded automation capacity and Sigmafy for the benefit
                  evidence — under one monthly commitment rather than four
                  separate engagements.
                </p>
                <p className="mt-4 max-w-3xl text-[16px] leading-[1.7] text-ink-600">
                  It is a serious commitment and it is not for everyone. If
                  option 01 is working for you, stay there.
                </p>
                <a
                  href="https://www.2ko.co.za/managed-improvement"
                  className="mt-6 inline-block font-semibold text-green-700 hover:text-green-800"
                >
                  How the partnerships work, on 2ko.co.za →
                </a>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── When the process itself is the problem ─── */}
      <FadeIn>
        <section className="bg-white py-24 md:py-32">
          <div className="container-wide max-w-3xl">
            <Eyebrow className="mb-5">One other case</Eyebrow>
            <h2>When the process itself is the constraint</h2>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink-600">
              Occasionally a team finishes DMAIC and the honest conclusion is
              that the process cannot be improved much further while it runs on
              spreadsheets and email. At that point the answer is not more
              training or a longer engagement — it is building the system the
              improved process needs. That is a different kind of work, and 2KO
              does it separately.
            </p>
            <a
              href="https://www.2ko.co.za/systems"
              className="mt-6 inline-block font-semibold text-green-700 hover:text-green-800"
            >
              Systems and automation, on 2ko.co.za →
            </a>
          </div>
        </section>
      </FadeIn>

      <CTASection
        heading="Not sure which of the three you need?"
        description="Tell us where the programme is now and we will say plainly whether you need us or not."
        buttonText="Talk to us"
        buttonHref="/contact"
      />
    </>
  );
}
