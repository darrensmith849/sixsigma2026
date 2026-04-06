import type { Metadata } from "next";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book a Course | Six Sigma South Africa",
  description:
    "Book your Six Sigma course with Six Sigma South Africa. Choose from White Belt, Yellow Belt, Green Belt, and Black Belt courses in Online, Virtual, and Classroom formats.",
};

const policies = [
  {
    icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z",
    title: "Booking",
    text: "A provisional booking is considered binding. Payment is required within 2 weeks of booking confirmation.",
  },
  {
    icon: "M6 18L18 6M6 6l12 12",
    title: "Cancellation",
    text: "Cancellations made more than 14 days before the course start date incur no penalty. Cancellations within 10 working days are subject to a 60% course fee. Cancellations within 7 days are subject to the full course fee.",
  },
  {
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
    title: "Refund",
    text: "Refunds for cancellations made 14+ days before the course are processed less a registration fee. Cancellations 7\u201314 days before the course are 80% refundable. Cancellations within 7 days are non-refundable. Refunds are processed within 15 working days.",
  },
  {
    icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
    title: "Attendance",
    text: "A minimum of 80% attendance is required to qualify for a certificate of completion.",
  },
];

export default function BookACoursePage() {
  return (
    <div className="pt-[80px]">
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/focused-man-working-with-laptop.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-green/90" />
        </div>
        <div className="container text-center relative z-10 py-14 md:py-16">
          <h1 className="!text-inverse mb-3 text-[32px] md:text-[38px]">
            Book a Course
          </h1>
          <p className="text-inverse/85 text-[16px] md:text-[18px] leading-relaxed max-w-xl mx-auto mb-6">
            Ready to start your Six Sigma journey? Complete the booking form
            below to enrol on one of our internationally accredited courses.
          </p>
          <Button href="#booking-form" variant="white" size="large">
            Start Booking
          </Button>
        </div>
      </section>

      {/* ───── How to Book ───── */}
      <FadeIn>
        <section className="py-12 md:py-14">
          <div className="container">
            <div className="text-center mb-8">
              <p className="text-green text-[12px] font-bold uppercase tracking-[0.15em] mb-2">
                Simple Process
              </p>
              <h2 className="text-heading font-bold text-[24px] md:text-[28px]">
                How to Book
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[920px] mx-auto">
              {[
                { step: "1", title: "Choose Your Course", text: "Select your belt level and training method below." },
                { step: "2", title: "Complete the Form", text: "Fill in your personal and course details." },
                { step: "3", title: "Receive Your Quote", text: "We\u2019ll send you a formal quote with pricing." },
                { step: "4", title: "Start Training", text: "Receive materials and begin your course." },
              ].map(({ step, title, text }, i) => (
                <div key={step} className="stagger-child relative bg-white rounded-xl border border-border-grey/60 p-5 text-center shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-green flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-[14px]">{step}</span>
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
        <section id="booking-form" className="py-12 md:py-14 bg-light-grey scroll-mt-[80px]">
          <div className="container">
            <div className="max-w-[680px] mx-auto bg-white rounded-xl border border-border-grey/60 p-6 md:p-8 shadow-sm">
              <h2 className="text-heading font-bold text-[22px] md:text-[26px] mb-6">
                Booking Form
              </h2>
              <BookingForm />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Booking Terms — Structured Cards ───── */}
      <FadeIn>
        <section className="py-12 md:py-14">
          <div className="container">
            <div className="max-w-[780px] mx-auto">
              <div className="text-center mb-8">
                <p className="text-green text-[12px] font-bold uppercase tracking-[0.15em] mb-2">
                  Important
                </p>
                <h2 className="text-heading font-bold text-[24px] md:text-[28px]">
                  Booking Terms
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {policies.map((p) => (
                  <div
                    key={p.title}
                    className="bg-light-grey rounded-xl p-5 border border-border-grey/40"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green/10 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d={p.icon} />
                        </svg>
                      </div>
                      <h3 className="text-heading font-semibold text-[15px]">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-body text-[13px] md:text-[14px] leading-relaxed">
                      {p.text}
                    </p>
                  </div>
                ))}
              </div>
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
              Need help choosing?
            </h2>
            <p className="text-[16px] md:text-[17px] max-w-xl mx-auto mb-6 leading-relaxed text-inverse/85">
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
