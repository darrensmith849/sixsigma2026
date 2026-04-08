import Image from "next/image";
import Eyebrow from "./Eyebrow";

interface HeroSectionProps {
  heading: string;
  children: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  actions?: React.ReactNode;
  eyebrow?: string;
  /** Floating stat card overlapping the hero image */
  badge?: { value: string; label: string };
}

export default function HeroSection({
  heading,
  children,
  imageSrc,
  imageAlt = "",
  actions,
  eyebrow = "Internationally accredited · CSSC USA",
  badge,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-green-900 text-white pt-[80px]">
      {/* Background dot grid + radial vignette */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(22,178,74,.32), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(22,178,74,.20), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-28 lg:py-40">
          {/* Text column */}
          <div className="lg:col-span-7">
            <Eyebrow tone="white" className="mb-6">
              {eyebrow}
            </Eyebrow>
            <h1 className="!text-white mb-8">{heading}</h1>
            <div className="text-[19px] md:text-[21px] text-white/80 leading-[1.65] space-y-5 max-w-[640px]">
              {children}
            </div>
            {actions && (
              <div className="flex flex-wrap gap-4 mt-10">{actions}</div>
            )}
          </div>

          {/* Image column */}
          {imageSrc && (
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] border border-white/10 [box-shadow:var(--shadow-xl)]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-transparent"
                  aria-hidden="true"
                />
              </div>
              {badge && (
                <div className="absolute -bottom-6 -left-6 max-w-[260px] rounded-[20px] border border-white/10 bg-white p-6 [box-shadow:var(--shadow-xl)]">
                  <div className="text-[40px] font-extrabold leading-none tracking-[-0.025em] text-ink-900">
                    {badge.value}
                  </div>
                  <div className="mt-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-500">
                    {badge.label}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
