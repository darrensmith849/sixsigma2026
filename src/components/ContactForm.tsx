"use client";

import { useState } from "react";
import Field, { TextareaField } from "./Field";

const baseInput =
  "w-full rounded-[12px] border border-ink-100 bg-white px-4 py-4 text-[16px] text-ink-900 transition-all duration-[var(--dur)] ease-[var(--ease)] focus:border-green-500 focus:outline-none focus:[box-shadow:var(--shadow-glow)]";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  };

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
      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Full name *"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your full name"
        />
        <Field
          label="Email address *"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@company.co.za"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Phone number"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="021 000 0000"
        />
        <Field
          label="Company"
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          placeholder="Your company name"
        />
      </div>

      <label className="block">
        <span className="mb-2 block text-[14px] font-semibold text-ink-700">
          Subject *
        </span>
        <select
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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

      <TextareaField
        label="Message *"
        required
        rows={5}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        placeholder="How can we help you?"
      />

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
