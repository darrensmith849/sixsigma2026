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
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 py-10 lg:py-14">
          {/* Text Side */}
          <div className="flex-1 lg:max-w-[55%]">
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
            <div className="flex-1 w-full lg:max-w-[45%]">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
