"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  allCourses,
  getCourseBySlug,
  type Mode,
  type BeltLevel,
} from "@/data/courses";

type EnquiryType = "course" | "general";
type NonShortBelt = Exclude<BeltLevel, "short">;
type Track = "LEAN" | "DMAIC";
type DelegateCount = "1" | "2-5" | "6-10" | "10+";
type TrainingType = "Public course" | "In-house / Corporate";

const MODES: Mode[] = ["Online", "Virtual", "Classroom"];
const BELTS: { value: NonShortBelt; label: string }[] = [
  { value: "white", label: "White (total beginner level)" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "black", label: "Black (most advanced)" },
];
const TRACKS: Track[] = ["LEAN", "DMAIC"];
const DELEGATE_COUNTS: DelegateCount[] = ["1", "2-5", "6-10", "10+"];
const TRAINING_TYPES: TrainingType[] = ["Public course", "In-house / Corporate"];

function inferTrackFromSlug(slug: string | undefined): Track | "" {
  if (!slug) return "";
  if (slug.includes("lean")) return "LEAN";
  if (slug.includes("dmaic")) return "DMAIC";
  return "";
}

function getInitialState(searchParams: URLSearchParams) {
  const courseSlug = searchParams.get("course") ?? "";
  const course = courseSlug ? getCourseBySlug(courseSlug) : undefined;

  const rawMode = searchParams.get("mode");
  const modeParam = MODES.find((m) => m === rawMode) ?? "";

  const rawBelt = searchParams.get("belt");
  const beltParam =
    rawBelt && rawBelt !== "short"
      ? (BELTS.find((b) => b.value === rawBelt)?.value ?? "")
      : "";

  const rawTrack = searchParams.get("track");
  const trackParam =
    rawTrack === "LEAN" || rawTrack === "DMAIC" ? (rawTrack as Track) : "";

  const resolvedBelt: NonShortBelt | "" =
    course && course.beltLevel !== "short"
      ? (course.beltLevel as NonShortBelt)
      : (beltParam as NonShortBelt | "");

  const resolvedTrack: Track | "" =
    trackParam || inferTrackFromSlug(course?.slug);

  const hasCourseContext = !!course || !!modeParam || !!beltParam;

  return {
    enquiryType: (hasCourseContext ? "course" : "general") as EnquiryType,
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: hasCourseContext ? "course-enquiry" : "",
    message: course
      ? `I'd like to enquire about the ${course.title} course.`
      : "",
    courseSlug: course?.slug ?? "",
    trainingMode: (course?.mode ?? modeParam) as Mode | "",
    beltLevel: resolvedBelt,
    track: resolvedTrack,
    preferredStartDate: "",
    numberOfDelegates: "" as DelegateCount | "",
    trainingType: "" as TrainingType | "",
  };
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState(() => getInitialState(searchParams));

  const update = <K extends keyof ReturnType<typeof getInitialState>>(
    field: K,
    value: ReturnType<typeof getInitialState>[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your enquiry. We will be in touch shortly.");
  };

  const isCourseMode = formData.enquiryType === "course";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-10 space-y-5">
      {/* Enquiry-type toggle */}
      <div>
        <span className="block text-[16px] text-heading font-medium mb-2">
          What is your enquiry about?
        </span>
        <div
          role="radiogroup"
          aria-label="Enquiry type"
          className="grid sm:grid-cols-2 gap-3"
        >
          {(
            [
              { value: "course", label: "I'm enquiring about a course" },
              { value: "general", label: "I have a general question" },
            ] as const
          ).map((opt) => {
            const active = formData.enquiryType === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => update("enquiryType", opt.value)}
                className={`px-4 py-3 rounded-[5px] border-2 text-[15px] font-semibold transition-colors text-left ${
                  active
                    ? "border-green bg-green/5 text-heading"
                    : "border-border-grey bg-white text-body hover:border-green/60"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Personal details */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-[16px] text-heading font-medium mb-1.5"
          >
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full px-4 py-3.5 text-[18px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-[16px] text-heading font-medium mb-1.5"
          >
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full px-4 py-3.5 text-[18px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
            placeholder="you@company.co.za"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="phone"
            className="block text-[16px] text-heading font-medium mb-1.5"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full px-4 py-3.5 text-[18px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
            placeholder="021 000 0000"
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-[16px] text-heading font-medium mb-1.5"
          >
            Company
          </label>
          <input
            id="company"
            type="text"
            value={formData.company}
            onChange={(e) => update("company", e.target.value)}
            className="w-full px-4 py-3.5 text-[18px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
            placeholder="Your company name"
          />
        </div>
      </div>

      {/* Course-specific training fields */}
      {isCourseMode && (
        <div className="space-y-5 rounded-[5px] border border-border-grey/60 bg-light-grey/40 p-5">
          <p className="text-heading font-semibold text-[15px]">
            Training Details
          </p>

          <div>
            <label
              htmlFor="courseSlug"
              className="block text-[16px] text-heading font-medium mb-1.5"
            >
              Course of Interest
            </label>
            <select
              id="courseSlug"
              value={formData.courseSlug}
              onChange={(e) => {
                const slug = e.target.value;
                const course = slug ? getCourseBySlug(slug) : undefined;
                setFormData((prev) => ({
                  ...prev,
                  courseSlug: slug,
                  trainingMode: course?.mode ?? prev.trainingMode,
                  beltLevel:
                    course && course.beltLevel !== "short"
                      ? (course.beltLevel as NonShortBelt)
                      : prev.beltLevel,
                  track: inferTrackFromSlug(course?.slug) || prev.track,
                }));
              }}
              className="w-full px-4 py-3.5 text-[18px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
            >
              <option value="">Select a course (optional)</option>
              {allCourses.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="trainingMode"
                className="block text-[16px] text-heading font-medium mb-1.5"
              >
                Training Mode
              </label>
              <select
                id="trainingMode"
                value={formData.trainingMode}
                onChange={(e) =>
                  update("trainingMode", e.target.value as Mode | "")
                }
                className="w-full px-4 py-3.5 text-[18px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
              >
                <option value="">Select training mode</option>
                {MODES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="beltLevel"
                className="block text-[16px] text-heading font-medium mb-1.5"
              >
                Belt Level
              </label>
              <select
                id="beltLevel"
                value={formData.beltLevel}
                onChange={(e) =>
                  update("beltLevel", e.target.value as NonShortBelt | "")
                }
                className="w-full px-4 py-3.5 text-[18px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
              >
                <option value="">Select belt level</option>
                {BELTS.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="track"
                className="block text-[16px] text-heading font-medium mb-1.5"
              >
                Six Sigma Track
              </label>
              <select
                id="track"
                value={formData.track}
                onChange={(e) => update("track", e.target.value as Track | "")}
                className="w-full px-4 py-3.5 text-[18px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
              >
                <option value="">Select track (optional)</option>
                {TRACKS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="trainingType"
                className="block text-[16px] text-heading font-medium mb-1.5"
              >
                Training Type
              </label>
              <select
                id="trainingType"
                value={formData.trainingType}
                onChange={(e) =>
                  update("trainingType", e.target.value as TrainingType | "")
                }
                className="w-full px-4 py-3.5 text-[18px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
              >
                <option value="">Select training type (optional)</option>
                {TRAINING_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="preferredStartDate"
                className="block text-[16px] text-heading font-medium mb-1.5"
              >
                Preferred Start Date
              </label>
              <input
                id="preferredStartDate"
                type="date"
                value={formData.preferredStartDate}
                onChange={(e) => update("preferredStartDate", e.target.value)}
                className="w-full px-4 py-3.5 text-[18px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="numberOfDelegates"
                className="block text-[16px] text-heading font-medium mb-1.5"
              >
                Number of Delegates
              </label>
              <select
                id="numberOfDelegates"
                value={formData.numberOfDelegates}
                onChange={(e) =>
                  update(
                    "numberOfDelegates",
                    e.target.value as DelegateCount | "",
                  )
                }
                className="w-full px-4 py-3.5 text-[18px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
              >
                <option value="">Select number (optional)</option>
                {DELEGATE_COUNTS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Subject (general only — course mode auto-sets subject) */}
      {!isCourseMode && (
        <div>
          <label
            htmlFor="subject"
            className="block text-[16px] text-heading font-medium mb-1.5"
          >
            Subject *
          </label>
          <select
            id="subject"
            required
            value={formData.subject}
            onChange={(e) => update("subject", e.target.value)}
            className="w-full px-4 py-3.5 text-[18px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
          >
            <option value="">Select a subject</option>
            <option value="corporate-training">Corporate Training</option>
            <option value="consultancy">Consultancy Services</option>
            <option value="partnership">Partnership</option>
            <option value="general">General Enquiry</option>
          </select>
        </div>
      )}

      <div>
        <label
          htmlFor="message"
          className="block text-[16px] text-heading font-medium mb-1.5"
        >
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full px-4 py-3.5 text-[18px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors resize-vertical"
          placeholder="How can we help you?"
        />
      </div>

      <div className="text-center pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center font-semibold rounded-[5px] transition-all duration-200 text-center px-10 py-4 text-[22px] bg-green text-inverse border-2 border-green hover:bg-green-hover hover:border-green-hover cursor-pointer"
        >
          Send Enquiry
        </button>
      </div>
    </form>
  );
}
