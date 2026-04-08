import Image from "next/image";
import Marquee from "./Marquee";
import Eyebrow from "./Eyebrow";

const logos = [
  { src: "/images/client-logos/Colour-Logo-Anglo-American.png", alt: "Anglo American" },
  { src: "/images/client-logos/Colour-Logo-WorldNet.png", alt: "WorldNet" },
  { src: "/images/client-logos/Colour-Logo-Transnet.png", alt: "Transnet" },
  { src: "/images/client-logos/Colour-Logo-Toyota.png", alt: "Toyota" },
  { src: "/images/client-logos/Colour-Logo-Standard-Bank.png", alt: "Standard Bank" },
  { src: "/images/client-logos/Colour-Logo-SARS.png", alt: "SARS" },
  { src: "/images/client-logos/Colour-Logo-Nedbank.png", alt: "Nedbank" },
  { src: "/images/client-logos/Colour-Logo-John-Deere.png", alt: "John Deere" },
  { src: "/images/client-logos/Colour-Logo-Airports-Company.png", alt: "Airports Company" },
  { src: "/images/client-logos/Colour-Logo-ABSA.png", alt: "ABSA" },
  { src: "/images/client-logos/Colour-Logo-Valve.png", alt: "Valve" },
];

interface ClientLogoGridProps {
  showHeading?: boolean;
  /** "marquee" = horizontal infinite scroll, "grid" = static grid */
  variant?: "marquee" | "grid";
}

export default function ClientLogoGrid({
  showHeading = true,
  variant = "marquee",
}: ClientLogoGridProps) {
  if (variant === "marquee") {
    return (
      <section className="bg-white py-20 border-y border-ink-100">
        <div className="container-wide">
          {showHeading && (
            <div className="mb-12 text-center">
              <Eyebrow>Trusted by South Africa&rsquo;s leaders</Eyebrow>
              <p className="mt-4 text-[15px] text-ink-500">
                And over 5,000 more organisations across the continent
              </p>
            </div>
          )}
          <Marquee>
            {logos.map((logo) => (
              <div
                key={logo.alt}
                className="logo-item flex h-24 w-[200px] items-center justify-center shrink-0 px-4"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={96}
                  quality={95}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-white">
      <div className="container">
        {showHeading && (
          <div className="text-center mb-12">
            <Eyebrow>Trusted partners</Eyebrow>
            <h2 className="mt-4">Some of the organisations who train with us</h2>
          </div>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-12 items-center justify-items-center py-6">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="logo-item w-full max-w-[120px] flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={130}
                height={130}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
