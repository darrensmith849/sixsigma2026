import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  title: string;
  description: string;
  includes: string[];
  mode: "Online" | "Virtual" | "Classroom";
  imageSrc: string;
  imageAlt?: string;
  href: string;
  isFree?: boolean;
  stripColor?: "green" | "yellow";
  buttonLabel?: string;
}

export default function CourseCard({
  title,
  description,
  includes,
  mode,
  imageSrc,
  imageAlt = "",
  href,
  isFree = false,
  stripColor = "green",
  buttonLabel = "Learn More",
}: CourseCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-md bg-light-grey">
      {/* Image block */}
      <div className="relative">
        <div className="relative h-[200px]">
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Top-right badges */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1 z-10">
            <span className="inline-block px-3.5 py-1 text-[13px] font-semibold rounded-full bg-green text-white leading-tight">
              {mode}
            </span>
            {isFree && (
              <span className="inline-block px-3.5 py-1 text-[13px] font-semibold rounded-full bg-yellow-400 text-gray-900 leading-tight">
                Free
              </span>
            )}
          </div>
        </div>

        {/* Colour strip */}
        <div
          className={`h-[5px] w-full ${
            stripColor === "yellow" ? "bg-yellow-400" : "bg-green"
          }`}
        />
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
        <h3 className="font-bold text-heading text-[20px] md:text-[22px] leading-tight mb-2">
          {title}
        </h3>

        <p className="text-body text-[15px] leading-relaxed mb-4">
          {description}
        </p>

        {/* What this includes */}
        {includes.length > 0 && (
          <div className="mb-4">
            <p className="text-green font-bold text-[15px] mb-2">
              What this includes:
            </p>
            <ul className="space-y-1.5">
              {includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[14px] text-heading"
                >
                  <svg
                    className="w-4 h-4 text-green shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA button — pushed to bottom */}
        <div className="mt-auto pt-1">
          <Link
            href={href}
            className="inline-flex items-center justify-center font-semibold rounded-[5px] transition-all duration-200 text-center bg-green text-white border-2 border-green hover:bg-green-hover hover:border-green-hover px-6 py-2.5 text-[16px]"
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
