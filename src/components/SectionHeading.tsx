import Eyebrow from "./Eyebrow";

interface SectionHeadingProps {
  children: React.ReactNode;
  eyebrow?: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  children,
  eyebrow,
  subtitle,
  align = "center",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`mb-14 max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <Eyebrow tone={light ? "white" : "green"} className="mb-5">
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className={light ? "!text-white" : ""}>{children}</h2>
      {subtitle && (
        <p
          className={`mt-6 text-[20px] leading-[1.6] ${
            light ? "text-white/80" : "text-ink-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
