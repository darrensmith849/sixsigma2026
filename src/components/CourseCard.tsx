import Image from "next/image";
import Button from "./Button";

interface CourseCardProps {
  title: string;
  description: string;
  includes: string[];
  modes: string[];
  imageSrc?: string;
  imageAlt?: string;
  href: string;
}

export default function CourseCard({
  title,
  description,
  includes,
  modes,
  imageSrc,
  imageAlt = "",
  href,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg border border-border-grey overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Image or placeholder */}
      <div className="relative aspect-[16/9] bg-light-grey">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-green/10">
            <span className="text-[16px] font-semibold text-green">{title}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-heading font-semibold mb-3">{title}</h3>
        <p className="text-body text-[16px] leading-relaxed mb-4">
          {description}
        </p>

        {/* Delivery modes */}
        <div className="flex flex-wrap gap-2 mb-4">
          {modes.map((mode) => (
            <span
              key={mode}
              className="inline-block px-3 py-1 text-[13px] font-medium rounded-full bg-green/10 text-green"
            >
              {mode}
            </span>
          ))}
        </div>

        {/* What's included */}
        {includes.length > 0 && (
          <div className="mb-5">
            <p className="text-[14px] font-semibold text-heading mb-2">
              What&apos;s included:
            </p>
            <ul className="space-y-1">
              {includes.map((item) => (
                <li
                  key={item}
                  className="text-[14px] text-body flex items-start gap-2"
                >
                  <span className="text-green mt-0.5 shrink-0">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button href={href} variant="filled" size="default">
          Learn More
        </Button>
      </div>
    </div>
  );
}
