import Image from "next/image";

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
}

export default function ClientLogoGrid({ showHeading = true }: ClientLogoGridProps) {
  return (
    <section className="section bg-white">
      <div className="container">
        {showHeading && (
          <div className="text-center mb-6">
            <h2 className="text-heading-text font-semibold">Client List</h2>
            <p className="mt-4 text-body-text text-[18px]">
              Discover some of the esteemed organizations that have chosen us as
              their training and consultancy partner:
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 items-center justify-items-center py-8">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="w-full max-w-[120px] aspect-square flex items-center justify-center p-2 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {showHeading && (
          <p className="text-center text-[18px] font-semibold text-heading-text mt-4">
            And over 5,000 more!
          </p>
        )}
      </div>
    </section>
  );
}
