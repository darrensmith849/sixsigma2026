import Image from "next/image";

interface HeroSectionProps {
  heading: string;
  children: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  actions?: React.ReactNode;
}

export default function HeroSection({
  heading,
  children,
  imageSrc,
  imageAlt = "",
  actions,
}: HeroSectionProps) {
  return (
    <section className="relative bg-white pt-[80px] overflow-hidden">
      {/* Background image — right-aligned, sits behind everything */}
      {imageSrc && (
        <div className="hidden lg:block absolute top-0 right-0 w-[50%] h-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            priority
            sizes="50vw"
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-16 xl:px-24">
        <div className="py-8 lg:py-10">
          {/* Text Side */}
          <div className="lg:max-w-[46%]">
            <h1 className="text-[32px] md:text-[38px] lg:text-[42px] leading-[1.15] mb-4">
              {heading}
            </h1>
            <div className="text-[17px] md:text-[18px] text-body leading-[1.6] space-y-3">
              {children}
            </div>
            {actions && (
              <div className="flex flex-wrap gap-3 mt-6">{actions}</div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile image — shown below text on small screens */}
      {imageSrc && (
        <div className="relative lg:hidden w-full h-[260px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}
    </section>
  );
}
