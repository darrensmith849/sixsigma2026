import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "filled" | "outline" | "white";
  size?: "default" | "large";
  className?: string;
}

export default function Button({
  href,
  children,
  variant = "filled",
  size = "default",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-[5px] transition-all duration-200 text-center";

  const sizeClass =
    size === "large"
      ? "px-8 py-3 text-[18px]"
      : "px-6 py-2.5 text-[16px]";

  const variantClass = {
    filled:
      "bg-green text-white border-2 border-green hover:bg-green-hover hover:border-green-hover",
    outline:
      "bg-transparent text-green border-2 border-green hover:bg-green hover:text-white",
    white:
      "bg-white text-green border-2 border-white hover:bg-light-grey",
  }[variant];

  return (
    <Link
      href={href}
      className={`${base} ${sizeClass} ${variantClass} ${className}`}
    >
      {children}
    </Link>
  );
}
