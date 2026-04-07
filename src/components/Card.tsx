import Link from "next/link";

type Variant = "default" | "elevated" | "outlined" | "dark";

interface CardProps {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  className?: string;
  padding?: "sm" | "md" | "lg" | "none";
}

const variantClasses: Record<Variant, string> = {
  default:
    "bg-white border border-ink-100 [box-shadow:var(--shadow-md)]",
  elevated: "bg-white [box-shadow:var(--shadow-lg)]",
  outlined: "bg-white border border-ink-100",
  dark: "bg-green-900 text-white border border-white/10 bg-dots",
};

const paddingClasses = {
  none: "",
  sm: "p-6",
  md: "p-8",
  lg: "p-10 md:p-12",
};

export default function Card({
  children,
  variant = "default",
  href,
  className = "",
  padding = "md",
}: CardProps) {
  const base = `relative overflow-hidden rounded-[20px] transition-all duration-[var(--dur)] ease-[var(--ease)] ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`;

  const hoverable = href
    ? "hover:[box-shadow:var(--shadow-xl)] hover:-translate-y-1 group"
    : "";

  if (href) {
    return (
      <Link href={href} className={`${base} ${hoverable} block`}>
        {children}
      </Link>
    );
  }

  return <div className={base}>{children}</div>;
}
