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
}

export default function CTASection({
  heading,
  description,
  buttonText,
  buttonHref,
  variant = "green",
  iconSrc,
  iconAlt = "",
}: CTASectionProps) {
  const isGreen = variant === "green";

  return (
    <section
      className={`section ${isGreen ? "bg-green" : "bg-light-grey"}`}
    >
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
        <h2
          className={`font-semibold mb-4 ${
            isGreen ? "text-white" : "text-heading-text"
          }`}
        >
          {heading}
        </h2>
        <p
          className={`text-[18px] max-w-2xl mx-auto mb-8 leading-relaxed ${
            isGreen ? "text-white/90" : "text-body-text"
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
