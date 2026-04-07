import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Benefits of Six Sigma Training | ${SITE_NAME}`,
  description:
    "Discover the business and career benefits of Six Sigma training — from reduced costs and improved quality to higher employability and faster promotion.",
  path: "/training-benefits",
});

const benefits = [
  {
    title: "Reduce waste and cost",
    body: "Six Sigma gives your teams the tools to identify waste, remove it, and lock in the improvement. The result is lower operating costs and healthier margins.",
  },
  {
    title: "Improve quality and consistency",
    body: "By reducing process variation you improve the customer experience, cut rework, and build a reputation for reliability.",
  },
  {
    title: "Data-driven decision making",
    body: "Six Sigma gives your teams a common statistical language and a structured way to make decisions based on evidence rather than opinion.",
  },
  {
    title: "Career advancement",
    body: "Six Sigma certification is recognised globally and is one of the most in-demand skills on hiring managers' shortlists for operations, quality and continuous improvement roles.",
  },
  {
    title: "Cross-functional leadership",
    body: "Green and Black Belt training prepares you to lead improvement projects that span departments, giving you exposure and credibility across the business.",
  },
  {
    title: "Culture of continuous improvement",
    body: "Training a critical mass of staff in Six Sigma seeds a culture where everyone is looking for ways to work smarter — the compounding effect over years is transformative.",
  },
];

export default function TrainingBenefitsPage() {
  return (
    <div className="pt-[80px]">
      <FadeIn>
        <section className="bg-green py-16 md:py-24">
          <div className="container text-center">
            <h1 className="!text-inverse mb-6">
              Benefits of Six Sigma training
            </h1>
            <p className="text-inverse/90 text-[20px] md:text-[24px] leading-relaxed max-w-3xl mx-auto">
              Why invest in Six Sigma training for yourself or your team?
              Here are the outcomes our clients see most often.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="container py-16 md:py-24 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10">
            {benefits.map((b) => (
              <div key={b.title}>
                <h2 className="text-[26px] md:text-[30px] font-semibold mb-3">
                  {b.title}
                </h2>
                <p className="text-body text-[20px] leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap gap-4">
            <Button href="/courses" variant="filled" size="large">
              Browse courses
            </Button>
            <Button href="/contact" variant="outline" size="large">
              Talk to us
            </Button>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
