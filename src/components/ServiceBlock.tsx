import Image from "next/image";
import Button from "./Button";

interface ServiceBlockProps {
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  /** Layout variant */
  layout: "text-left" | "text-right" | "centered";
  /** Image for 2-column layouts (cover image shown beside text) */
  imageSrc?: string;
  imageAlt?: string;
  /** Icon for centered layout (small green icon above heading) */
  iconSrc?: string;
  iconAlt?: string;
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
}: ServiceBlockProps) {
  /* ─── Centered / icon layout ─── */
  if (layout === "centered") {
    return (
      <section className="section bg-white">
        <div className="container text-center">
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
          <h2 className="font-semibold text-heading-text mb-4">{heading}</h2>
          <p className="text-[18px] text-body-text max-w-2xl mx-auto leading-relaxed mb-8">
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
      <h2 className="font-semibold text-heading-text mb-4">{heading}</h2>
      <p className="text-[18px] text-body-text leading-relaxed mb-8">
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
    /* Decorative green block when no image is provided */
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
