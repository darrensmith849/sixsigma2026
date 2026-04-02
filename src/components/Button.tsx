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
    "inline-flex items-center justify-center font-semibold rounded-[5px] transition-all duration-200 text-center";

  const sizeClass =
    size === "large"
      ? "px-10 py-4 text-[22px]"
      : "px-7 py-3 text-[18px]";

  const variantClass = {
    filled:
      "bg-green text-inverse border-2 border-green hover:bg-green-hover hover:border-green-hover",
    outline:
      "bg-transparent text-green border-2 border-green hover:bg-green hover:text-inverse",
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
