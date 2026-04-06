import Image from "next/image";
import Button from "./Button";

interface CTASectionProps {
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  variant?: "green" | "light";
  iconSrc?: string;
  iconAlt?: string;
  backgroundSrc?: string;
}

export default function CTASection({
  heading,
  description,
  buttonText,
  buttonHref,
  variant = "green",
  iconSrc,
  iconAlt = "",
  backgroundSrc,
}: CTASectionProps) {
  const isGreen = variant === "green";

  return (
    <section
      className={`section relative ${isGreen ? "bg-green" : "bg-light-grey"}`}
      style={
        backgroundSrc
          ? {
              backgroundImage: `url(${backgroundSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {backgroundSrc && (
        <div
          className={`absolute inset-0 ${
            isGreen ? "bg-green/85" : "bg-light-grey/85"
          }`}
        />
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
        <h2
          className={`font-semibold text-[26px] md:text-[30px] mb-3 ${
            isGreen ? "text-inverse" : "text-heading"
          }`}
        >
          {heading}
        </h2>
        <p
          className={`text-[17px] md:text-[18px] max-w-2xl mx-auto mb-6 leading-relaxed ${
            isGreen ? "text-inverse/90" : "text-body"
          }`}
        >
          {description}
        </p>
        <Button
          href={buttonHref}
          variant={isGreen ? "white" : "filled"}
          size="large"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
