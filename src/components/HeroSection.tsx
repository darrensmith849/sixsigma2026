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
        <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            priority
            sizes="55vw"
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-[120px]">
        <div className="py-14 lg:py-24">
          {/* Text Side — overlaps the image slightly */}
          <div className="lg:max-w-[52%]">
            <h1 className="mb-8">{heading}</h1>
            <div className="text-[21px] text-body leading-[1.55] space-y-6">
              {children}
            </div>
            {actions && (
              <div className="flex flex-wrap gap-4 mt-10">{actions}</div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile image — shown below text on small screens */}
      {imageSrc && (
        <div className="relative lg:hidden w-full h-[300px]">
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
