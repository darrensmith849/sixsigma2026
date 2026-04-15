"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCourseBySlug } from "@/data/courses";

const STEPS = [
  "Course Details",
  "Personal Details",
  "Company Details",
  "Candidates Details",
  "Booking Terms",
];

const beltOptions = [
  { value: "white", label: "White (total beginner level)" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "black", label: "Black (most advanced \u2013 requires stats or six sigma green belt)" },
];

const methodOptions = ["Online", "Virtual", "Classroom"];
const trackOptions = ["LEAN", "DMAIC"];

function inferTrackFromSlug(slug: string | undefined): string {
  if (!slug) return "";
  if (slug.includes("lean")) return "LEAN";
  if (slug.includes("dmaic")) return "DMAIC";
  return "";
}

function getInitialBookingState(searchParams: URLSearchParams) {
  const courseSlug = searchParams.get("course") ?? "";
  const course = courseSlug ? getCourseBySlug(courseSlug) : undefined;

  const rawMode = searchParams.get("mode");
  const methodParam =
    rawMode && methodOptions.includes(rawMode) ? rawMode : "";

  const rawBelt = searchParams.get("belt");
  const validBelts = beltOptions.map((b) => b.value);
  const beltParam =
    rawBelt && validBelts.includes(rawBelt) && rawBelt !== "short"
      ? rawBelt
      : "";

  const rawTrack = searchParams.get("track");
  const trackParam =
    rawTrack === "LEAN" || rawTrack === "DMAIC" ? rawTrack : "";

  return {
    beltColour:
      course && course.beltLevel !== "short" ? course.beltLevel : beltParam,
    trainingMethod: course?.mode ?? methodParam,
    coupon: "",
    track: trackParam || inferTrackFromSlug(course?.slug),
    location: "",
    courseDate: "",
    dietary: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idNumber: "",
    companyName: "",
    companyVat: "",
    companyAddress: "",
    companyContact: "",
    candidateName: "",
    candidateEmail: "",
    candidatePhone: "",
    candidateId: "",
    bookingTerms: false,
    cancellationPolicy: false,
    onlineTcs: false,
  };
}

export default function BookingForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(() => getInitialBookingState(searchParams));

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const progress = Math.round((step / (STEPS.length - 1)) * 100);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <svg className="w-16 h-16 text-green mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-heading font-bold text-[24px] mb-2">Booking Submitted</h2>
        <p className="text-body text-[16px]">
          Thank you for your booking. We will be in touch shortly to confirm your enrolment.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <p className="text-muted text-[13px] font-medium mb-2">
          Step {step + 1} of {STEPS.length} &mdash; {STEPS[step]}
        </p>
        <div className="h-2 bg-border-grey rounded-full overflow-hidden">
          <div
            className="h-full bg-green rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step 1: Course Details */}
      {step === 0 && (
        <div className="space-y-5">
          <h3 className="text-heading font-semibold text-[18px]">Course Details:</h3>

          <FormField label="Belt Colour (click to select)">
            <select value={form.beltColour} onChange={(e) => update("beltColour", e.target.value)} className="form-select">
              <option value="">Select belt colour</option>
              {beltOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Training Method">
            <select value={form.trainingMethod} onChange={(e) => update("trainingMethod", e.target.value)} className="form-select">
              <option value="">Select training method</option>
              {methodOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Coupon">
            <input type="text" value={form.coupon} onChange={(e) => update("coupon", e.target.value)} placeholder="Enter coupon code (optional)" className="form-input" />
          </FormField>

          <FormField label="Six Sigma Track (click to select)">
            <select value={form.track} onChange={(e) => update("track", e.target.value)} className="form-select">
              <option value="">Select track</option>
              {trackOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Location">
            <input type="text" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. Johannesburg, Cape Town, Virtual" className="form-input" />
          </FormField>

          <FormField label="Date of Course (Optional)">
            <input type="text" value={form.courseDate} onChange={(e) => update("courseDate", e.target.value)} placeholder="Preferred date" className="form-input" />
          </FormField>

          <FormField label="Dietary requirements">
            <input type="text" value={form.dietary} onChange={(e) => update("dietary", e.target.value)} placeholder="Any dietary requirements" className="form-input" />
          </FormField>
        </div>
      )}

      {/* Step 2: Personal Details */}
      {step === 1 && (
        <div className="space-y-5">
          <h3 className="text-heading font-semibold text-[18px]">Personal Details:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="First Name *">
              <input type="text" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="form-input" required />
            </FormField>
            <FormField label="Last Name *">
              <input type="text" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="form-input" required />
            </FormField>
          </div>
          <FormField label="Email Address *">
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="form-input" required />
          </FormField>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Phone Number *">
              <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="form-input" required />
            </FormField>
            <FormField label="ID / Passport Number">
              <input type="text" value={form.idNumber} onChange={(e) => update("idNumber", e.target.value)} className="form-input" />
            </FormField>
          </div>
        </div>
      )}

      {/* Step 3: Company Details */}
      {step === 2 && (
        <div className="space-y-5">
          <h3 className="text-heading font-semibold text-[18px]">OPTIONAL Company Details:</h3>
          <p className="text-muted text-[14px]">Complete this section if your company is paying for the course.</p>
          <FormField label="Company Name">
            <input type="text" value={form.companyName} onChange={(e) => update("companyName", e.target.value)} className="form-input" />
          </FormField>
          <FormField label="Company VAT Number">
            <input type="text" value={form.companyVat} onChange={(e) => update("companyVat", e.target.value)} className="form-input" />
          </FormField>
          <FormField label="Company Address">
            <input type="text" value={form.companyAddress} onChange={(e) => update("companyAddress", e.target.value)} className="form-input" />
          </FormField>
          <FormField label="Company Contact Person">
            <input type="text" value={form.companyContact} onChange={(e) => update("companyContact", e.target.value)} className="form-input" />
          </FormField>
        </div>
      )}

      {/* Step 4: Candidates Details */}
      {step === 3 && (
        <div className="space-y-5">
          <h3 className="text-heading font-semibold text-[18px]">Candidates Details:</h3>
          <p className="text-muted text-[14px]">If the candidate is different from the person booking.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Candidate Full Name">
              <input type="text" value={form.candidateName} onChange={(e) => update("candidateName", e.target.value)} className="form-input" />
            </FormField>
            <FormField label="Candidate Email">
              <input type="email" value={form.candidateEmail} onChange={(e) => update("candidateEmail", e.target.value)} className="form-input" />
            </FormField>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Candidate Phone">
              <input type="tel" value={form.candidatePhone} onChange={(e) => update("candidatePhone", e.target.value)} className="form-input" />
            </FormField>
            <FormField label="Candidate ID / Passport">
              <input type="text" value={form.candidateId} onChange={(e) => update("candidateId", e.target.value)} className="form-input" />
            </FormField>
          </div>
        </div>
      )}

      {/* Step 5: Booking Terms */}
      {step === 4 && (
        <div className="space-y-6">
          <h3 className="text-heading font-semibold text-[18px]">Booking Terms</h3>

          <div className="bg-light-grey rounded-lg p-4 max-h-[200px] overflow-y-auto text-[13px] text-body leading-relaxed space-y-3">
            <p className="font-semibold text-heading text-[14px]">2KO Africa Booking, Cancellation &amp; Refund Policy</p>
            <p>A provisional booking is considered binding. Payment is required within 2 weeks of booking confirmation.</p>
            <p><strong>Cancellation Policy:</strong> Cancellations made more than 14 days before the course start date incur no penalty. Cancellations within 10 working days are subject to a 60% course fee. Cancellations within 7 days are subject to the full course fee.</p>
            <p><strong>Refund Policy:</strong> Refunds for cancellations made 14+ days before the course are processed less a registration fee. Cancellations 7&ndash;14 days before the course are 80% refundable. Cancellations within 7 days are non-refundable. Refunds are processed within 15 working days.</p>
            <p>A minimum of 80% attendance is required to qualify for a certificate of completion.</p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={form.bookingTerms} onChange={(e) => update("bookingTerms", e.target.checked)} className="mt-1 accent-green w-4 h-4" />
            <span className="text-heading text-[14px]">I accept the Booking Terms</span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={form.cancellationPolicy} onChange={(e) => update("cancellationPolicy", e.target.checked)} className="mt-1 accent-green w-4 h-4" />
            <span className="text-heading text-[14px]">I accept the 2KO Africa Booking, Cancellation &amp; Refund Policy</span>
          </label>

          <div className="bg-light-grey rounded-lg p-4 max-h-[200px] overflow-y-auto text-[13px] text-body leading-relaxed space-y-3">
            <p className="font-semibold text-heading text-[14px]">Online Training T&amp;C&rsquo;s</p>
            <p>Online courses are non-refundable once access has been granted. Course access periods are fixed and extensions are available for purchase.</p>
            <p>Students are responsible for ensuring they have the correct technical requirements (computer, internet, sound) before starting the course.</p>
            <p>Online course materials are for personal use only and may not be shared, distributed, or reproduced.</p>
            <p>Please note there are no refunds once the online program has been started.</p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={form.onlineTcs} onChange={(e) => update("onlineTcs", e.target.checked)} className="mt-1 accent-green w-4 h-4" />
            <span className="text-heading text-[14px]">I accept the Online Training T&amp;C&rsquo;s</span>
          </label>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border-grey">
        {step > 0 ? (
          <button onClick={() => setStep(step - 1)} className="text-heading font-semibold text-[15px] hover:text-green transition-colors">
            &larr; Previous
          </button>
        ) : (
          <span />
        )}

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-green text-white font-semibold rounded-[5px] text-[15px] hover:bg-green-hover transition-colors"
          >
            Next Step &rarr;
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!form.bookingTerms || !form.cancellationPolicy}
            className="inline-flex items-center justify-center px-8 py-3 bg-green text-white font-semibold rounded-[5px] text-[16px] hover:bg-green-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Booking
          </button>
        )}
      </div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-heading font-medium text-[14px] mb-1.5">{label}</label>
      {children}
    </div>
  );
}
