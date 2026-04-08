import Link from "next/link";

type Variant = "filled" | "outline" | "white" | "ghost" | "ghost-white" | "dark";
type Size = "default" | "large" | "small";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  trailingArrow?: boolean;
  external?: boolean;
}

const sizeClass: Record<Size, string> = {
  small: "px-5 py-2.5 text-[14px]",
  default: "px-6 py-3.5 text-[15px]",
  large: "px-8 py-4 text-[17px]",
};

const variantClass: Record<Variant, string> = {
  filled:
    "bg-green-500 text-white border border-green-500 hover:bg-green-600 hover:border-green-600 [box-shadow:var(--shadow-md),inset_0_1px_0_rgba(255,255,255,.18)] hover:[box-shadow:var(--shadow-lg),inset_0_1px_0_rgba(255,255,255,.18)]",
  outline:
    "bg-white text-ink-900 border border-ink-100 hover:border-green-500 hover:text-green-700 [box-shadow:var(--shadow-sm)]",
  white:
    "bg-white text-ink-900 border border-white hover:bg-ink-50 [box-shadow:var(--shadow-md)]",
  ghost:
    "bg-transparent text-green-700 border border-transparent hover:text-green-800",
  "ghost-white":
    "bg-transparent text-white border border-transparent hover:bg-white/10",
  dark:
    "bg-ink-900 text-white border border-ink-900 hover:bg-green-900 hover:border-green-900 [box-shadow:var(--shadow-md)]",
};

export default function Button({
  href,
  children,
  variant = "filled",
  size = "default",
  className = "",
  trailingArrow = false,
  external = false,
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-[12px] font-semibold transition-all duration-[var(--dur)] ease-[var(--ease)] hover:-translate-y-[1px] focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-glow)]";

  const content = (
    <>
      <span>{children}</span>
      {trailingArrow && (
        <svg
          className="h-4 w-4 transition-transform duration-[var(--dur)] ease-[var(--ease)] group-hover:translate-x-1"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${sizeClass[size]} ${variantClass[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} ${sizeClass[size]} ${variantClass[variant]} ${className}`}
    >
      {content}
    </Link>
  );
}
