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
          light ? "text-white" : "text-heading-text"
        }`}
      >
        {children}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-[18px] max-w-2xl ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/90" : "text-body-text"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
