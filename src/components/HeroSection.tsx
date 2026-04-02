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
    <section className="bg-white pt-[80px]">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0 py-10 lg:py-0">
          {/* Text Side */}
          <div className="flex-1 lg:max-w-[55%] lg:py-14 lg:pr-16">
            <h1 className="mb-6 leading-[1.15]">{heading}</h1>
            <div className="text-[18px] text-body-text leading-[1.7] space-y-4">
              {children}
            </div>
            {actions && (
              <div className="flex flex-wrap gap-4 mt-8">{actions}</div>
            )}
          </div>

          {/* Image Side */}
          {imageSrc && (
            <div className="relative flex-1 w-full lg:max-w-[45%] min-h-[350px] lg:min-h-0 overflow-hidden">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
