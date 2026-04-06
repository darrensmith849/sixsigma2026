import Image from "next/image";
import Button from "./Button";

interface ServiceBlockProps {
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  layout: "text-left" | "text-right" | "centered" | "fullwidth-bg";
  imageSrc?: string;
  imageAlt?: string;
  iconSrc?: string;
  iconAlt?: string;
  backgroundSrc?: string;
}

export default function ServiceBlock({
  heading,
  description,
  buttonText,
  buttonHref,
  layout,
  imageSrc,
  imageAlt = "",
  iconSrc,
  iconAlt = "",
  backgroundSrc,
}: ServiceBlockProps) {
  /* ─── Full-width background with text overlay on left ─── */
  if (layout === "fullwidth-bg") {
    return (
      <section className="relative min-h-[400px] lg:min-h-[460px] flex items-center overflow-hidden">
        {backgroundSrc && (
          <>
            <div className="absolute inset-0">
              <Image
                src={backgroundSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-black/60" />
          </>
        )}
        <div className="relative z-10 container py-10 lg:py-14">
          <div className="lg:max-w-[44%]">
            <h2 className="font-semibold text-inverse text-[26px] md:text-[30px] mb-3">
              {heading}
            </h2>
            <p className="text-[17px] md:text-[18px] text-inverse/90 leading-relaxed mb-6">
              {description}
            </p>
            <Button href={buttonHref} variant="filled" size="large">
              {buttonText}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  /* ─── Centered / icon layout (with optional dark background image) ─── */
  if (layout === "centered") {
    const hasBg = !!backgroundSrc;

    return (
      <section
        className={`relative overflow-hidden py-14 md:py-16 ${hasBg ? "" : "bg-white"}`}
      >
        {hasBg && (
          <>
            <div className="absolute inset-0">
              <Image src={backgroundSrc} alt="" fill className="object-cover" sizes="100vw" />
            </div>
            <div className="absolute inset-0 bg-black/70" />
          </>
        )}
        <div className="container text-center relative z-10">
          {iconSrc && (
            <div className="mb-5 flex justify-center">
              <Image
                src={iconSrc}
                alt={iconAlt}
                width={64}
                height={64}
                className="rounded-lg"
              />
            </div>
          )}
          <h2
            className={`font-semibold text-[26px] md:text-[30px] mb-3 ${
              hasBg ? "text-inverse" : "text-heading"
            }`}
          >
            {heading}
          </h2>
          <p
            className={`text-[17px] md:text-[18px] max-w-2xl mx-auto leading-relaxed mb-6 ${
              hasBg ? "text-inverse/90" : "text-body"
            }`}
          >
            {description}
          </p>
          <Button href={buttonHref} variant="filled" size="large">
            {buttonText}
          </Button>
        </div>
      </section>
    );
  }

  /* ─── Two-column split band (full-bleed image) ─── */
  const textFirst = layout === "text-left";

  const textBlock = (
    <div className="w-full lg:w-1/2 flex items-center">
      <div
        className={`px-8 md:px-10 lg:px-14 py-10 lg:py-12 max-w-[520px] ${
          textFirst ? "" : "lg:ml-auto"
        }`}
      >
        <h2 className="font-semibold text-heading text-[26px] md:text-[30px] mb-3">
          {heading}
        </h2>
        <p className="text-[17px] md:text-[18px] text-body leading-relaxed mb-6">
          {description}
        </p>
        <Button href={buttonHref} variant="filled" size="large">
          {buttonText}
        </Button>
      </div>
    </div>
  );

  const imageBlock = (
    <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[400px]">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      )}
    </div>
  );

  return (
    <section className="flex flex-col lg:flex-row">
      {textFirst ? (
        <>
          {textBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {textBlock}
        </>
      )}
    </section>
  );
}
