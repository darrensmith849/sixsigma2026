import Button from "./Button";
import Eyebrow from "./Eyebrow";

interface CTASectionProps {
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  eyebrow?: string;
  variant?: "dark" | "light";
  secondaryHref?: string;
  secondaryText?: string;
}

export default function CTASection({
  heading,
  description,
  buttonText,
  buttonHref,
  eyebrow = "Ready to start?",
  variant = "dark",
  secondaryHref,
  secondaryText,
}: CTASectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`relative overflow-hidden py-24 md:py-32 ${
        isDark ? "bg-green-900 text-white" : "bg-ink-50"
      }`}
    >
      {isDark && (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(22,178,74,.30), transparent 60%)",
            }}
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative z-10 container-wide text-center">
        <Eyebrow tone={isDark ? "white" : "green"} className="mb-6">
          {eyebrow}
        </Eyebrow>
        <h2
          className={`mx-auto max-w-3xl ${isDark ? "!text-white" : ""}`}
        >
          {heading}
        </h2>
        <p
          className={`mx-auto mt-6 max-w-2xl text-[19px] leading-[1.6] ${
            isDark ? "text-white/80" : "text-ink-500"
          }`}
        >
          {description}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            href={buttonHref}
            variant={isDark ? "white" : "filled"}
            size="large"
            trailingArrow
          >
            {buttonText}
          </Button>
          {secondaryHref && secondaryText && (
            <Button
              href={secondaryHref}
              variant={isDark ? "ghost-white" : "outline"}
              size="large"
            >
              {secondaryText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
