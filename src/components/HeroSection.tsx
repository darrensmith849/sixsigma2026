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
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-12 lg:py-16">
          {/* Text Side */}
          <div className="flex-1 max-w-2xl">
            <h1 className="mb-6">{heading}</h1>
            <div className="text-[18px] text-body-text leading-relaxed space-y-4">
              {children}
            </div>
            {actions && <div className="flex flex-wrap gap-4 mt-8">{actions}</div>}
          </div>

          {/* Image Side */}
          {imageSrc && (
            <div className="flex-1 max-w-xl w-full">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
