"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";

export interface FaqItem {
  q: string;
  a: ReactNode;
}

function FaqCard({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const getHeight = useCallback(() => {
    return contentRef.current?.scrollHeight ?? 0;
  }, []);

  return (
    <div className="bg-white rounded-lg border border-border-grey overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <span className="text-heading font-semibold text-[15px] md:text-[16px] leading-snug">
          {item.q}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
            open ? "bg-green border-green text-white" : "border-border-grey text-muted"
          }`}
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 14 14"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path strokeLinecap="round" d="M2 7h10" />
            ) : (
              <>
                <path strokeLinecap="round" d="M7 2v10" />
                <path strokeLinecap="round" d="M2 7h10" />
              </>
            )}
          </svg>
        </span>
      </button>

      <div
        ref={contentRef}
        className="accordion-content"
        style={{
          maxHeight: open ? `${getHeight()}px` : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="px-6 pb-5 text-body text-[14px] md:text-[15px] leading-relaxed space-y-3">
          {item.a}
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);

  return (
    <div className="grid md:grid-cols-2 gap-3 md:gap-5">
      <div className="space-y-3">
        {left.map((item) => (
          <FaqCard key={item.q} item={item} />
        ))}
      </div>
      <div className="space-y-3">
        {right.map((item) => (
          <FaqCard key={item.q} item={item} />
        ))}
      </div>
    </div>
  );
}
