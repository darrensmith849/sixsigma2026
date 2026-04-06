import type { Metadata } from "next";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Course Brochure | Six Sigma South Africa",
  description:
    "Request the Six Sigma South Africa course brochure with all pricing, course details, and pre-requisites.",
};

export default function BrochurePage() {
  return (
    <div className="pt-[80px]">
      {/* Hero */}
      <section className="bg-green py-16 md:py-20">
        <div className="container text-center">
          <h1 className="!text-inverse mb-4">Course Brochure</h1>
          <p className="text-inverse/90 text-[18px] md:text-[22px] leading-relaxed max-w-3xl mx-auto">
            Request our latest course brochure with all pricing and
            pre-requisites for every Six Sigma course we offer.
          </p>
        </div>
      </section>

      {/* Brochure Request */}
      <FadeIn>
        <section className="section">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-light-grey rounded-xl p-8 md:p-10">
                <svg
                  className="w-16 h-16 text-green mx-auto mb-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>

                <h2 className="text-heading text-[24px] font-bold mb-4">
                  Request a Brochure
                </h2>
                <p className="text-body text-[17px] leading-relaxed mb-6">
                  Contact us to request the latest course brochure with all
                  pricing and pre-requisites. Our brochure covers all courses
                  from White Belt through to Black Belt, including Lean, DMAIC,
                  and our short courses.
                </p>

                <div className="space-y-3">
                  <Button href="/contact" size="large" className="w-full">
                    Enquire Now
                  </Button>
                  <p className="text-muted text-[14px]">
                    Or email us directly at{" "}
                    <a
                      href="mailto:info@sixsigmasouthafrica.co.za"
                      className="text-link hover:text-link-hover"
                    >
                      info@sixsigmasouthafrica.co.za
                    </a>
                  </p>
                </div>
              </div>

              <div className="mt-10 grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-heading font-semibold text-[16px] mb-1">
                    All Courses
                  </p>
                  <p className="text-muted text-[14px]">
                    White Belt to Black Belt
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-heading font-semibold text-[16px] mb-1">
                    Full Pricing
                  </p>
                  <p className="text-muted text-[14px]">
                    Current rates and discounts
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-heading font-semibold text-[16px] mb-1">
                    Pre-requisites
                  </p>
                  <p className="text-muted text-[14px]">
                    Entry requirements per course
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
