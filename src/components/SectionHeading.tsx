interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  children,
  subtitle,
  centered = true,
  light = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? "text-center" : ""} mb-8 ${className}`}>
      <h2
        className={`font-semibold ${
          light ? "text-inverse" : "text-heading"
        }`}
      >
        {children}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-[21px] leading-relaxed max-w-3xl ${
            centered ? "mx-auto" : ""
          } ${light ? "text-inverse/90" : "text-body"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
