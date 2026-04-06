import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book a Course | Six Sigma South Africa",
  description:
    "Book your Six Sigma course with Six Sigma South Africa. Choose from White Belt, Yellow Belt, Green Belt, and Black Belt courses in Online, Virtual, and Classroom formats.",
};

export default function BookACoursePage() {
  return (
    <div className="pt-[80px]">
      {/* ───── Hero ───── */}
      <section className="bg-green py-10 md:py-12">
        <div className="container text-center">
          <h1 className="!text-inverse mb-3 text-[32px] md:text-[38px]">
            Book a Course
          </h1>
          <p className="text-inverse/90 text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto">
            Ready to start your Six Sigma journey? Complete the booking form
            below to enrol on one of our internationally accredited courses.
          </p>
        </div>
      </section>

      {/* ───── How to Book ───── */}
      <FadeIn>
        <section className="py-10 md:py-12">
          <div className="container">
            <h2 className="text-heading font-bold text-[24px] md:text-[28px] text-center mb-8">
              How to Book
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[960px] mx-auto">
              {[
                { step: "1", title: "Choose Your Course", text: "Select your belt level and training method below." },
                { step: "2", title: "Complete the Form", text: "Fill in your personal and course details." },
                { step: "3", title: "Receive Your Quote", text: "We\u2019ll send you a formal quote with pricing." },
                { step: "4", title: "Start Training", text: "Receive materials and begin your course." },
              ].map(({ step, title, text }) => (
                <div key={step} className="bg-white rounded-lg border border-border-grey p-5 shadow-sm text-center">
                  <div className="w-9 h-9 rounded-full bg-green flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-[15px]">{step}</span>
                  </div>
                  <h3 className="text-heading font-semibold text-[15px] mb-1">{title}</h3>
                  <p className="text-body text-[13px] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Booking Form ───── */}
      <FadeIn>
        <section className="py-10 md:py-12 bg-light-grey">
          <div className="container">
            <div className="max-w-[680px] mx-auto bg-white rounded-xl border border-border-grey p-6 md:p-8 shadow-sm">
              <h2 className="text-heading font-bold text-[22px] md:text-[26px] mb-6">
                Booking Form
              </h2>
              <BookingForm />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Booking Terms Summary ───── */}
      <FadeIn>
        <section className="py-10 md:py-12">
          <div className="container">
            <div className="max-w-[680px] mx-auto">
              <h2 className="text-heading font-bold text-[22px] md:text-[26px] mb-4">
                Booking Terms
              </h2>
              <div className="space-y-3 text-body text-[14px] md:text-[15px] leading-relaxed">
                <p>
                  A provisional booking is considered binding. Payment is
                  required within 2 weeks of booking confirmation.
                </p>
                <p>
                  <strong>Cancellation Policy:</strong> Cancellations made more
                  than 14 days before the course start date incur no penalty.
                  Cancellations within 10 working days are subject to a 60%
                  course fee. Cancellations within 7 days are subject to the
                  full course fee.
                </p>
                <p>
                  <strong>Refund Policy:</strong> Refunds for cancellations
                  made 14+ days before the course are processed less a
                  registration fee. Cancellations 7&ndash;14 days before the
                  course are 80% refundable. Cancellations within 7 days are
                  non-refundable. Refunds are processed within 15 working days.
                </p>
                <p>
                  A minimum of 80% attendance is required to qualify for a
                  certificate of completion.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── CTA ───── */}
      <FadeIn>
        <section className="bg-green py-12 md:py-14">
          <div className="container text-center">
            <h2 className="font-semibold text-inverse text-[24px] md:text-[28px] mb-3">
              Need help choosing?
            </h2>
            <p className="text-[16px] md:text-[17px] max-w-2xl mx-auto mb-6 leading-relaxed text-inverse/90">
              Not sure which course is right for you? Our team can help you
              find the best option for your career goals.
            </p>
            <Button href="/contact" variant="white" size="large">
              Enquire Now
            </Button>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
