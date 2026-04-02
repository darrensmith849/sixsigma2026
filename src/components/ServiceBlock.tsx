import Image from "next/image";
import Button from "./Button";

interface ServiceBlockProps {
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  /** Layout variant */
  layout: "text-left" | "text-right" | "centered" | "fullwidth-bg";
  /** Image for 2-column layouts (cover image shown beside text) */
  imageSrc?: string;
  imageAlt?: string;
  /** Icon for centered layout (small green icon above heading) */
  iconSrc?: string;
  iconAlt?: string;
  /** Full-width background image for centered or fullwidth-bg layouts */
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
      <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center overflow-hidden">
        {backgroundSrc && (
          <div className="absolute inset-0">
            <Image
              src={backgroundSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}
        <div className="relative z-10 container-wide py-12 lg:py-16">
          <div className="lg:max-w-[40%]">
            <h2 className="font-semibold text-inverse mb-4">{heading}</h2>
            <p className="text-[18px] text-inverse/90 leading-relaxed mb-8">
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
      <section className={`section relative overflow-hidden ${hasBg ? "" : "bg-white"}`}>
        {hasBg && (
          <>
            <div className="absolute inset-0">
              <Image
                src={backgroundSrc}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-black/70" />
          </>
        )}
        <div className="container text-center relative z-10">
          {iconSrc && (
            <div className="mb-6 flex justify-center">
              <Image
                src={iconSrc}
                alt={iconAlt}
                width={80}
                height={80}
                className="rounded-lg"
              />
            </div>
          )}
          <h2 className={`font-semibold mb-4 ${hasBg ? "text-inverse" : "text-heading"}`}>
            {heading}
          </h2>
          <p className={`text-[18px] max-w-2xl mx-auto leading-relaxed mb-8 ${hasBg ? "text-inverse/90" : "text-body"}`}>
            {description}
          </p>
          <Button href={buttonHref} variant="filled" size="large">
            {buttonText}
          </Button>
        </div>
      </section>
    );
  }

  /* ─── Two-column layout ─── */
  const textFirst = layout === "text-left";

  const textBlock = (
    <div className="flex-1 flex flex-col justify-center">
      <h2 className="font-semibold text-heading mb-4">{heading}</h2>
      <p className="text-[18px] text-body leading-relaxed mb-8">
        {description}
      </p>
      <div>
        <Button href={buttonHref} variant="filled" size="large">
          {buttonText}
        </Button>
      </div>
    </div>
  );

  const imageBlock = imageSrc ? (
    <div className="flex-1 w-full">
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  ) : (
    <div className="flex-1 w-full">
      <div className="aspect-[4/3] rounded-lg bg-green/10" />
    </div>
  );

  return (
    <section className="section">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
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
        </div>
      </div>
    </section>
  );
}
