"use client";

import { useState, useRef, useCallback } from "react";
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
        <h2 className="font-bold text-heading text-[24px] md:text-[28px] mb-2">
          {heading}
        </h2>
      )}
      {subheading && (
        <p className="font-semibold text-green text-[16px] md:text-[17px] mb-5">
          {subheading}
        </p>
      )}

      <div className="space-y-2">
        {sections.map((section, i) => (
          <AccordionItem
            key={section.heading}
            section={section}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </div>
  );
}

function AccordionItem({
  section,
  isOpen,
  onToggle,
}: {
  section: CourseContentSection;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  const getHeight = useCallback(() => {
    return contentRef.current?.scrollHeight ?? 0;
  }, []);

  return (
    <div className="rounded-lg overflow-hidden bg-light-grey">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-5 py-3.5 text-left transition-colors hover:bg-border-grey/60"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-heading text-[15px] md:text-[16px]">
          {section.heading}
        </span>

        <span
          className="w-7 h-7 shrink-0 rounded-full bg-green flex items-center justify-center transition-transform duration-300"
          style={{
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg
            className="w-3.5 h-3.5 text-white"
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

      <div
        ref={contentRef}
        className="accordion-content"
        style={{
          maxHeight: isOpen ? `${getHeight()}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-5 pb-4">
          <ul className="space-y-1.5 pt-1">
            {section.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2.5 text-body text-[14px] md:text-[15px]"
              >
                <span className="text-green mt-0.5 shrink-0">&#8226;</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
