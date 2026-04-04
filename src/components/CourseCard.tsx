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
  buttonLabel = "Learn more",
}: CourseCardProps) {
  return (
    <div className="flex flex-col overflow-hidden" style={{ background: "#ececeb", borderRadius: "6px" }}>
      {/* Image block */}
      <div className="relative">
        <div className="relative h-[240px]">
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Top-right badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <span className="inline-block px-4 py-1.5 text-[14px] font-semibold rounded-full bg-green text-white">
              {mode}
            </span>
            {isFree && (
              <span className="inline-block px-4 py-1.5 text-[14px] font-semibold rounded-full bg-yellow-400 text-gray-900">
                Free
              </span>
            )}
          </div>
        </div>

        {/* Colour strip */}
        <div
          className={`h-[7px] w-full ${
            stripColor === "yellow" ? "bg-yellow-400" : "bg-green"
          }`}
        />
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 px-7 pt-6 pb-7">
        <h3
          className="font-bold mb-3 leading-tight"
          style={{ color: "#5a5a5a", fontSize: "clamp(22px, 1.6vw, 30px)" }}
        >
          {title}
        </h3>

        <p
          className="leading-relaxed mb-5"
          style={{ color: "#5e5e5e", fontSize: "clamp(16px, 1.1vw, 20px)" }}
        >
          {description}
        </p>

        {/* What this includes */}
        {includes.length > 0 && (
          <div className="mb-6">
            <p className="text-green font-bold text-[17px] mb-3">
              What this includes:
            </p>
            <ul className="space-y-2.5">
              {includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[16px]"
                  style={{ color: "#5a5a5a" }}
                >
                  <svg
                    className="w-[18px] h-[18px] text-green shrink-0 mt-0.5"
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
        <div className="mt-auto pt-2">
          <Link
            href={href}
            className="inline-flex items-center justify-center w-full font-semibold rounded-[5px] transition-all duration-200 text-center bg-green text-white border-2 border-green hover:bg-green-hover hover:border-green-hover px-8 py-3.5 text-[18px]"
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
