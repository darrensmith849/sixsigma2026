import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Book a Course | Six Sigma South Africa",
  description:
    "Book your Six Sigma course with Six Sigma South Africa. Choose from White Belt, Yellow Belt, Green Belt, and Black Belt courses in Online, Virtual, and Classroom formats.",
};

export default function BookACoursePage() {
  return (
    <div className="pt-[80px]">
      <FadeIn>
        <section className="section">
          <div className="container text-center">
            <h1 className="mb-6">Book a Course</h1>
            <p className="text-body text-[21px] leading-relaxed max-w-3xl mx-auto mb-10">
              Ready to start your Six Sigma journey? Contact us to book your
              course. We offer flexible scheduling and training options to suit
              your needs.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="section bg-light-grey">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-heading font-semibold mb-6 text-center">
              How to Book
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Choose Your Course",
                  text: "Browse our courses page to find the right belt level (White, Yellow, Green, or Black Belt) and training mode (Online, Virtual, or Classroom).",
                },
                {
                  step: "2",
                  title: "Request a Quote",
                  text: "Contact us via the enquiry form or email to receive a formal quote with pricing, dates, and course details.",
                },
                {
                  step: "3",
                  title: "Complete Your Booking",
                  text: "Once you have accepted the quote, complete the booking form with your personal and company details. Payment is required within 2 weeks of booking.",
                },
                {
                  step: "4",
                  title: "Start Training",
                  text: "You will receive all course materials, login details (for online/virtual), or venue information (for classroom) before your course start date.",
                },
              ].map(({ step, title, text }) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-green flex items-center justify-center">
                    <span className="text-white font-bold text-[18px]">
                      {step}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-heading font-semibold mb-1">
                      {title}
                    </h3>
                    <p className="text-body text-[18px] leading-relaxed">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button href="/contact" variant="filled" size="large">
                Enquire Now
              </Button>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="section">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-heading font-semibold mb-6 text-center">
              Booking Terms
            </h2>
            <div className="space-y-4 text-body text-[16px] leading-relaxed">
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
        </section>
      </FadeIn>
    </div>
  );
}
