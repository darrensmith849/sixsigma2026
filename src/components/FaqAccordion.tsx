"use client";

import { useState, type ReactNode } from "react";

export interface FaqItem {
  q: string;
  a: ReactNode;
}

function FaqCard({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-border-grey overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-heading font-semibold text-[16px] md:text-[17px] leading-snug">
          {item.q}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full border border-border-grey flex items-center justify-center text-muted transition-colors ${
            open ? "bg-green border-green text-white" : ""
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

      {open && (
        <div className="px-6 pb-5 text-body text-[15px] md:text-[16px] leading-relaxed space-y-3">
          {item.a}
        </div>
      )}
    </div>
  );
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  // Split into two columns for desktop
  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);

  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
      <div className="space-y-4">
        {left.map((item) => (
          <FaqCard key={item.q} item={item} />
        ))}
      </div>
      <div className="space-y-4">
        {right.map((item) => (
          <FaqCard key={item.q} item={item} />
        ))}
      </div>
    </div>
  );
}
