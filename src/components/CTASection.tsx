import Button from "./Button";

interface CTASectionProps {
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  variant?: "green" | "light";
}

export default function CTASection({
  heading,
  description,
  buttonText,
  buttonHref,
  variant = "green",
}: CTASectionProps) {
  const isGreen = variant === "green";

  return (
    <section
      className={`section ${isGreen ? "bg-green" : "bg-light-grey"}`}
    >
      <div className="container text-center">
        <h2
          className={`font-semibold mb-4 ${
            isGreen ? "text-white" : "text-heading-text"
          }`}
        >
          {heading}
        </h2>
        <p
          className={`text-[18px] max-w-2xl mx-auto mb-8 ${
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
