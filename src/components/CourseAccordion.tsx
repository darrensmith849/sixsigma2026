"use client";

import { useState } from "react";
import type { CourseContentSection } from "@/data/courses";

interface CourseAccordionProps {
  heading?: string;
  subheading?: string;
  sections: CourseContentSection[];
}

export default function CourseAccordion({
  heading,
  subheading,
  sections,
}: CourseAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div>
      {heading && (
        <h2
          className="font-bold mb-2"
          style={{ color: "#5a5a5a", fontSize: "clamp(24px, 2vw, 32px)" }}
        >
          {heading}
        </h2>
      )}
      {subheading && (
        <p
          className="font-semibold mb-6"
          style={{ color: "#16b24a", fontSize: "clamp(17px, 1.2vw, 20px)" }}
        >
          {subheading}
        </p>
      )}

      <div className="space-y-3">
        {sections.map((section, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={section.heading}
              className="rounded-lg overflow-hidden"
              style={{ background: "#f3f3f3" }}
            >
              <button
                onClick={() => toggle(i)}
                className="flex items-center justify-between w-full px-5 py-4 text-left transition-colors hover:bg-gray-200/60"
                aria-expanded={isOpen}
              >
                <span
                  className="font-semibold"
                  style={{
                    color: "#3a3a3a",
                    fontSize: "clamp(16px, 1.1vw, 19px)",
                  }}
                >
                  {section.heading}
                </span>

                {/* Green circle +/- */}
                <span
                  className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-transform"
                  style={{
                    background: "#16b24a",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v14m7-7H5"
                    />
                  </svg>
                </span>
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div className="px-5 pb-5">
                  <ul className="space-y-2 pt-1">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-[15px]"
                        style={{ color: "#5e5e5e" }}
                      >
                        <span className="text-green mt-0.5 shrink-0">
                          &#8226;
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
