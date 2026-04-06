import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Training Benefits | Six Sigma South Africa",
  description:
    "Increased customer satisfaction leads to an increase in sales. Customers are more likely to repeat purchases which results in improved customer loyalty.",
};

const benefits = [
  {
    title: "Customer Satisfaction",
    text: "Increased customer satisfaction leads to an increase in sales. Customers are more likely to repeat purchases which results in improved customer loyalty.",
  },
  {
    title: "Time Management",
    text: "Maximising use of your time increases production capacity. Efficient usage of time leads to lowered anxiety and stress which improves decision making and allows better focus on priorities.",
  },
  {
    title: "Employee Motivation",
    text: "Motivated employees are better problem-solvers, have higher levels of innovation and customer-centricity, which results in improved customer service and an increase in profitability.",
  },
  {
    title: "Cost Savings",
    text: "Companies can expect improved cost savings of between 5% \u2013 20% of gross annual turnover, which results in an increase in profit margins, providing a basis for more dividends to shareholders.",
  },
  {
    title: "Organisational Culture",
    text: "Training creates a common language throughout the organisation, aids in developing an organisational business structure that defines internal and external identity, and can transform employees into advocates and help retain top people.",
  },
  {
    title: "Supply Chain Management",
    text: "Better collaboration between parties allows for improved quality control and shipping optimisation, while eliminating procurement costs associated with finding supplies and negotiating terms.",
  },
];

const companyResults = [
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
];

const personalResults = [
  "Improved knowledge and skills",
  "Ability to use a wide range of tools and techniques",
  "A status that is recognised world wide",
];

export default function TrainingBenefitsPage() {
  return (
    <div className="pt-[80px]">
      {/* Hero */}
      <section className="bg-green py-16 md:py-20">
        <div className="container text-center">
          <h1 className="!text-inverse mb-4">Training Benefits</h1>
          <p className="text-inverse/90 text-[18px] md:text-[22px] leading-relaxed max-w-3xl mx-auto">
            Six Sigma training has improved companies and individuals through
            proven methods. Here are the key benefits your organisation can
            expect.
          </p>
        </div>
      </section>

      {/* Benefit Cards */}
      <FadeIn>
        <section className="section">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {benefits.map((b) => (
                <div key={b.title} className="bg-light-grey rounded-xl p-6">
                  <h3 className="text-heading font-semibold text-[18px] mb-3">
                    {b.title}
                  </h3>
                  <p className="text-body text-[16px] leading-relaxed">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Results Your Company Can Expect */}
      <FadeIn>
        <section className="section bg-light-grey">
          <div className="container">
            <SectionHeading>Results Your Company Can Expect</SectionHeading>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
              {companyResults.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-white rounded-lg p-4"
                >
                  <span className="text-green text-[18px] mt-0.5 shrink-0">
                    &#10003;
                  </span>
                  <span className="text-body text-[16px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* What You Can Expect */}
      <FadeIn>
        <section className="section">
          <div className="container">
            <SectionHeading>What You Can Expect</SectionHeading>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-8">
              {personalResults.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-light-grey rounded-lg p-5"
                >
                  <span className="text-green text-[18px] mt-0.5 shrink-0">
                    &#10003;
                  </span>
                  <span className="text-body text-[16px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* CTA */}
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
