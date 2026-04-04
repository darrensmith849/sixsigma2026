import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Training Benefits | Six Sigma South Africa",
  description:
    "Discover the benefits of Six Sigma training for your organisation. Improve efficiency, reduce waste, and drive measurable results.",
};

export default function TrainingBenefitsPage() {
  return (
    <div className="pt-[80px]">
      <FadeIn>
        <section className="section">
          <div className="container">
            <SectionHeading
              subtitle="Six Sigma training delivers measurable business results. Here are the key benefits your organisation can expect from investing in Six Sigma certification."
            >
              Training Benefits
            </SectionHeading>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="section bg-light-grey">
          <div className="container">
            <h2 className="text-heading font-semibold text-center mb-8">
              Results Your Company Can Expect
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                "Improved Customer Service Loyalty",
                "Time Management and efficiency",
                "Reduced Cycle Time",
                "Employee Motivation and development of staff skills",
                "Strategic Planning",
                "Supply Chain Management",
                "Bottom line cost savings (5%\u201320% of turnover per annum)",
                "Improved quality of product or service as perceived by the customer",
                "Common language throughout the organisation",
                "World class standard",
                "Creates a competitive edge",
                "Improve ROI",
                "Drive sales growth",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-white rounded-lg p-4"
                >
                  <span className="text-green text-[18px] mt-0.5 shrink-0">
                    &#10003;
                  </span>
                  <span className="text-body text-[18px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="section">
          <div className="container">
            <h2 className="text-heading font-semibold text-center mb-8">
              What You Can Expect
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                "Improved knowledge and skills",
                "Ability to use a wide range of tools and techniques",
                "A status that is recognised world wide",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-light-grey rounded-lg p-5"
                >
                  <span className="text-green text-[18px] mt-0.5 shrink-0">
                    &#10003;
                  </span>
                  <span className="text-body text-[18px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="section bg-green">
          <div className="container text-center">
            <h2 className="font-semibold text-inverse mb-4">
              Ready to get started?
            </h2>
            <p className="text-[21px] max-w-3xl mx-auto mb-8 leading-relaxed text-inverse/90">
              Browse our courses and find the right Six Sigma training for your
              team.
            </p>
            <Button href="/courses" variant="white" size="large">
              View Courses
            </Button>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
