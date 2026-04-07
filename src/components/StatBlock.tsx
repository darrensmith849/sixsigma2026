interface StatBlockProps {
  value: string;
  label: string;
  tone?: "light" | "dark";
}

export default function StatBlock({
  value,
  label,
  tone = "light",
}: StatBlockProps) {
  const valueColour = tone === "dark" ? "text-white" : "text-ink-900";
  const labelColour = tone === "dark" ? "text-white/70" : "text-ink-500";
  return (
    <div>
      <div
        className={`text-[clamp(48px,4.5vw,72px)] font-extrabold tracking-[-0.03em] leading-none ${valueColour}`}
      >
        {value}
      </div>
      <div
        className={`mt-3 text-[13px] font-semibold uppercase tracking-[0.14em] ${labelColour}`}
      >
        {label}
      </div>
    </div>
  );
}
