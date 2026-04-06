import type { Metadata } from "next";
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
      {/* ───── Hero ───── */}
      <section className="relative bg-green py-12 md:py-14 overflow-hidden">
        {/* Subtle depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green via-green to-green-hover opacity-60" />
        <div className="container text-center relative z-10">
          <h1 className="!text-inverse mb-3 text-[32px] md:text-[38px]">
            Training Benefits
          </h1>
          <p className="text-inverse/90 text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto">
            Six Sigma training has improved companies and individuals through
            proven methods. Here are the key benefits your organisation can
            expect.
          </p>
        </div>
      </section>

      {/* ───── Benefit Cards ───── */}
      <FadeIn>
        <section className="py-12 md:py-14">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[960px] mx-auto">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="bg-white rounded-lg border border-border-grey p-5 shadow-sm"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-2 h-2 rounded-full bg-green shrink-0" />
                    <h3 className="text-heading font-semibold text-[16px]">
                      {b.title}
                    </h3>
                  </div>
                  <p className="text-body text-[14px] md:text-[15px] leading-relaxed">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Results Your Company Can Expect ───── */}
      <FadeIn>
        <section className="py-12 md:py-14 bg-light-grey">
          <div className="container">
            <h2 className="text-heading font-bold text-[24px] md:text-[28px] text-center mb-6">
              Results Your Company Can Expect
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[880px] mx-auto">
              {companyResults.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 bg-white rounded-lg px-4 py-3"
                >
                  <svg
                    className="w-4 h-4 text-green shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-heading text-[14px] md:text-[15px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── What You Can Expect ───── */}
      <FadeIn>
        <section className="py-12 md:py-14">
          <div className="container">
            <h2 className="text-heading font-bold text-[24px] md:text-[28px] text-center mb-6">
              What You Can Expect
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 max-w-[720px] mx-auto">
              {personalResults.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 bg-light-grey rounded-lg px-4 py-3.5"
                >
                  <svg
                    className="w-4 h-4 text-green shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-heading text-[14px] md:text-[15px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── CTA ───── */}
      <FadeIn>
        <section className="bg-green py-12 md:py-14">
          <div className="container text-center">
            <h2 className="font-semibold text-inverse text-[24px] md:text-[28px] mb-3">
              Ready to get started?
            </h2>
            <p className="text-[16px] md:text-[17px] max-w-2xl mx-auto mb-6 leading-relaxed text-inverse/90">
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
