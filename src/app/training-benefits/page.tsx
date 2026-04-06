import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Training Benefits | Six Sigma South Africa",
  description:
    "Increased customer satisfaction leads to an increase in sales. Customers are more likely to repeat purchases which results in improved customer loyalty.",
};

const benefitIcons = [
  /* Customer Satisfaction */ "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z",
  /* Time Management */ "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  /* Employee Motivation */ "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  /* Cost Savings */ "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
  /* Organisational Culture */ "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z",
  /* Supply Chain */ "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
];

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
      {/* ───── Hero with Background Image ───── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/kickstart-businessman.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-green/88" />
        </div>
        <div className="container text-center relative z-10 py-14 md:py-18">
          <h1 className="!text-inverse mb-3 text-[32px] md:text-[38px]">
            Training Benefits
          </h1>
          <p className="text-inverse/85 text-[16px] md:text-[18px] leading-relaxed max-w-xl mx-auto">
            Six Sigma training has improved companies and individuals through
            proven methods. Here are the key benefits your organisation can
            expect.
          </p>
        </div>
      </section>

      {/* ───── Benefit Cards with Icons ───── */}
      <FadeIn>
        <section className="py-14 md:py-16">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[980px] mx-auto">
              {benefits.map((b, i) => (
                <div
                  key={b.title}
                  className="bg-white rounded-xl border border-border-grey/60 p-6 shadow-sm card-hover"
                >
                  <div className="w-10 h-10 rounded-lg bg-green/10 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={benefitIcons[i]} />
                    </svg>
                  </div>
                  <h3 className="text-heading font-semibold text-[16px] md:text-[17px] mb-2">
                    {b.title}
                  </h3>
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
        <section className="relative py-14 md:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-light-grey" />
          <div className="container relative z-10">
            <div className="text-center mb-8">
              <p className="text-green text-[13px] font-semibold uppercase tracking-wider mb-2">
                Proven Results
              </p>
              <h2 className="text-heading font-bold text-[24px] md:text-[28px]">
                Results Your Company Can Expect
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[880px] mx-auto">
              {companyResults.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-white rounded-lg px-4 py-3 border border-border-grey/40"
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
        <section className="py-14 md:py-16">
          <div className="container">
            <div className="text-center mb-8">
              <p className="text-green text-[13px] font-semibold uppercase tracking-wider mb-2">
                Personal Growth
              </p>
              <h2 className="text-heading font-bold text-[24px] md:text-[28px]">
                What You Can Expect
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-5 max-w-[780px] mx-auto">
              {personalResults.map((item) => (
                <div
                  key={item}
                  className="bg-light-grey rounded-xl p-5 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-heading text-[14px] md:text-[15px] font-medium leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── CTA ───── */}
      <FadeIn>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/events-certification.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-green/90" />
          </div>
          <div className="container text-center relative z-10 py-14 md:py-16">
            <h2 className="font-semibold text-inverse text-[24px] md:text-[28px] mb-3">
              Ready to get started?
            </h2>
            <p className="text-[16px] md:text-[17px] max-w-xl mx-auto mb-6 leading-relaxed text-inverse/85">
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
