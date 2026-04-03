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
          <div className="text-center mb-8">
            <h2 className="text-heading font-semibold">Client List</h2>
            <p className="mt-4 text-body text-[21px] max-w-3xl mx-auto leading-relaxed">
              Discover some of the esteemed organizations that have chosen us as
              their training and consultancy partner:
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 items-center justify-items-center py-6">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="w-full max-w-[130px] aspect-square flex items-center justify-center p-3 hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={130}
                height={130}
                className="object-contain grayscale contrast-[1.2] brightness-[0.85]"
              />
            </div>
          ))}
        </div>

        {showHeading && (
          <p className="text-center text-[24px] font-semibold text-heading mt-6">
            And over 5,000 more!
          </p>
        )}
      </div>
    </section>
  );
}
