"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Field, { TextareaField, SelectField } from "./Field";
import { MODES } from "@/app/courses/[slug]/courseData";

const baseInput =
  "w-full rounded-[12px] border border-ink-100 bg-white px-4 py-4 text-[16px] text-ink-900 transition-all duration-[var(--dur)] ease-[var(--ease)] focus:border-green-500 focus:outline-none focus:[box-shadow:var(--shadow-glow)]";

type WindowGtag = Window & {
  gtag?: (...args: unknown[]) => void;
};

const COURSE_OPTIONS = [
  { slug: "yellow-belt", name: "Yellow Belt" },
  { slug: "green-belt", name: "Green Belt" },
  { slug: "black-belt", name: "Black Belt" },
];

const MODE_LABELS: Record<string, string> = {
  classroom: "Classroom (in-person)",
  virtual: "Virtual Classroom (live online)",
  online: "Online (self-paced)",
};

const CITIES = [
  "Johannesburg",
  "Cape Town",
  "Durban",
  "Pretoria",
  "Port Elizabeth",
  "Other",
];

const INDUSTRIES = [
  "Manufacturing",
  "Mining",
  "Financial Services",
  "Healthcare",
  "Retail",
  "Government",
  "Technology",
  "Automotive",
  "FMCG",
  "Logistics",
  "Energy",
  "Telecoms",
  "Other",
];

function collectUtm(): Record<string, string> | undefined {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const utm: Record<string, string> = {};
  for (const k of keys) {
    const v = params.get(k);
    if (v) utm[k] = v;
  }
  return Object.keys(utm).length > 0 ? utm : undefined;
}

/** Map a topicSlug from course pages to the simplified belt option slug. */
function mapTopicToCourse(topicSlug: string): string {
  if (topicSlug.includes("yellow")) return "yellow-belt";
  if (topicSlug.includes("green")) return "green-belt";
  if (topicSlug.includes("black")) return "black-belt";
  return "";
}

export default function ContactForm() {
  const searchParams = useSearchParams();

  const paramSubject = searchParams.get("subject") ?? "";
  const paramCourse = searchParams.get("course") ?? "";
  const paramMode = searchParams.get("mode") ?? "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: paramSubject || "",
    message: "",
    courseTopic: mapTopicToCourse(paramCourse),
    courseMode: paramMode,
    delegates: "",
    preferredCity: "",
    industry: "",
    // Honeypot — real humans never fill this (the input is visually hidden
    // and aria-hidden). Bots that blindly populate every field expose
    // themselves and the server silently drops the submission.
    website: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showCourseFields =
    formData.subject === "course-enquiry" ||
    formData.subject === "corporate-training";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
          industry: formData.industry || undefined,
          ...(showCourseFields && {
            courseTopic: formData.courseTopic || undefined,
            courseMode: formData.courseMode || undefined,
          }),
          ...(formData.subject === "corporate-training" && {
            delegates: formData.delegates || undefined,
          }),
          ...(showCourseFields &&
            formData.courseMode === "classroom" && {
              preferredCity: formData.preferredCity || undefined,
            }),
          sourcePage:
            typeof window !== "undefined"
              ? window.location.pathname + window.location.search
              : undefined,
          utm: collectUtm(),
          website: formData.website,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      // Fire a GA4 conversion event so the enquiry shows up in the funnel.
      const w = window as WindowGtag;
      if (typeof w.gtag === "function") {
        w.gtag("event", "generate_lead", {
          form_subject: formData.subject,
          form_company: formData.company || undefined,
          form_course_topic: formData.courseTopic || undefined,
          form_course_mode: formData.courseMode || undefined,
          form_industry: formData.industry || undefined,
        });
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email info@2ko.co.za directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const set = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [field]: e.target.value });

  if (submitted) {
    return (
      <div className="rounded-[20px] border border-green-100 bg-green-50 p-10 text-center">
        <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-ink-900 mb-3">Thank you</h3>
        <p className="text-ink-500 text-[16px] leading-[1.65]">
          We&rsquo;ve received your enquiry and will be in touch within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/*
        Honeypot field. Hidden from humans (off-screen, no pointer events,
        aria-hidden, tabIndex=-1, autoComplete=off) but present in the DOM
        so naive form-filling bots populate it. The API silently drops any
        submission where this field is non-empty.
      */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label>
          Website (leave blank)
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={set("website")}
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Full name *"
          type="text"
          required
          value={formData.name}
          onChange={set("name")}
          placeholder="Your full name"
        />
        <Field
          label="Email address *"
          type="email"
          required
          value={formData.email}
          onChange={set("email")}
          placeholder="you@company.co.za"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Phone number"
          type="tel"
          value={formData.phone}
          onChange={set("phone")}
          placeholder="021 000 0000"
        />
        <Field
          label="Company"
          type="text"
          value={formData.company}
          onChange={set("company")}
          placeholder="Your company name"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="mb-2 block text-[14px] font-semibold text-ink-700">
            Subject *
          </span>
          <select
            required
            value={formData.subject}
            onChange={set("subject")}
            className={baseInput}
          >
            <option value="">Select a subject</option>
            <option value="course-enquiry">Course Enquiry</option>
            <option value="corporate-training">Corporate Training</option>
            <option value="consultancy">Consultancy Services</option>
            <option value="partnership">Partnership</option>
            <option value="general">General Enquiry</option>
          </select>
        </label>

        <SelectField
          label="Industry"
          value={formData.industry}
          onChange={set("industry")}
        >
          <option value="">Select your industry</option>
          {INDUSTRIES.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </SelectField>
      </div>

      {/* ─── Course-specific fields ─── */}
      {showCourseFields && (
        <>
          <div className="grid sm:grid-cols-2 gap-5">
            <SelectField
              label="Course"
              value={formData.courseTopic}
              onChange={set("courseTopic")}
            >
              <option value="">Select a course</option>
              {COURSE_OPTIONS.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Delivery method"
              value={formData.courseMode}
              onChange={set("courseMode")}
            >
              <option value="">Select delivery method</option>
              {MODES.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {MODE_LABELS[m.slug] ?? m.name}
                </option>
              ))}
            </SelectField>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {formData.subject === "corporate-training" && (
              <Field
                label="Number of delegates"
                type="number"
                min={1}
                value={formData.delegates}
                onChange={set("delegates")}
                placeholder="e.g. 10"
              />
            )}

            {formData.courseMode === "classroom" && (
              <SelectField
                label="Preferred city"
                value={formData.preferredCity}
                onChange={set("preferredCity")}
              >
                <option value="">Select a city</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </SelectField>
            )}
          </div>
        </>
      )}

      <TextareaField
        label="Message *"
        required
        rows={5}
        value={formData.message}
        onChange={set("message")}
        placeholder="How can we help you?"
      />

      {error && (
        <div
          role="alert"
          className="rounded-[12px] border border-red-200 bg-red-50 px-5 py-4 text-[14px] text-red-700"
        >
          {error}
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex items-center justify-center gap-2 rounded-[12px] bg-green-500 px-8 py-4 text-[16px] font-semibold text-white transition-all duration-[var(--dur)] ease-[var(--ease)] hover:-translate-y-[1px] hover:bg-green-600 disabled:opacity-60 [box-shadow:var(--shadow-md),inset_0_1px_0_rgba(255,255,255,.18)] hover:[box-shadow:var(--shadow-lg),inset_0_1px_0_rgba(255,255,255,.18)]"
        >
          {submitting ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <svg
                className="h-4 w-4 transition-transform duration-[var(--dur)] ease-[var(--ease)] group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
