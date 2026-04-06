import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type RequirementItem = {
  icon: LucideIcon;
  text: string;
};

type RecertificationSectionProps = {
  badge: string;
  title: string;
  price: string;
  description: string;
  note: string;
  ctaHref: string;
  items: RequirementItem[];
  bgClass?: string;
};

function RequirementTile({
  icon: Icon,
  text,
}: {
  icon: LucideIcon;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white px-5 py-5 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF8EE] text-[#18B64A]">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <p className="text-[15px] font-medium leading-7 text-neutral-900">
          {text}
        </p>
      </div>
    </div>
  );
}

export default function RecertificationSection({
  badge,
  title,
  price,
  description,
  note,
  ctaHref,
  items,
  bgClass = "",
}: RecertificationSectionProps) {
  return (
    <section className={`py-16 lg:py-20 ${bgClass}`}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Intro — above the grid */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-[#18B64A]/25 bg-[#EAF8EE] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#18B64A]">
            <span className="mr-2 h-2 w-2 rounded-full bg-[#18B64A]" />
            {badge}
          </span>

          <h2 className="mt-5 max-w-3xl text-[28px] md:text-[34px] font-semibold tracking-[-0.03em] text-neutral-900">
            {title}
          </h2>
        </div>

        {/* Content row — CTA aligns with first card */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-start">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((item) => (
                <RequirementTile
                  key={item.text}
                  icon={item.icon}
                  text={item.text}
                />
              ))}
            </div>

            <p className="mt-6 max-w-2xl text-[16px] leading-8 text-neutral-600">
              {note}
            </p>
          </div>

          <aside className="self-start">
            <div className="w-full rounded-[28px] bg-[#18B64A] px-8 py-7 text-center text-white shadow-[0_24px_60px_rgba(24,182,74,0.18)]">
              <div className="text-[48px] font-semibold leading-none tracking-[-0.04em]">
                {price}
              </div>

              <div className="mt-2 text-[15px] font-medium text-white/85">
                inc VAT
              </div>

              <p className="mx-auto mt-4 max-w-[230px] text-[15px] leading-7 text-white/90">
                {description}
              </p>

              <Link
                href={ctaHref}
                className="mt-5 inline-flex h-13 w-full items-center justify-center rounded-2xl bg-white px-6 text-[15px] font-semibold text-[#18B64A] transition hover:bg-neutral-50"
              >
                Get Certified
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
