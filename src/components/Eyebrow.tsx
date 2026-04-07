interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  tone?: "green" | "gold" | "white";
}

export default function Eyebrow({
  children,
  className = "",
  tone = "green",
}: EyebrowProps) {
  const colour =
    tone === "gold"
      ? "text-accent"
      : tone === "white"
      ? "text-white/80"
      : "text-green-600";
  return (
    <p
      className={`inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] ${colour} ${className}`}
    >
      <span className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}
