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
}: CourseCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-ink-100 bg-white [box-shadow:var(--shadow-md)] transition-all duration-[var(--dur)] ease-[var(--ease)] hover:-translate-y-1 hover:[box-shadow:var(--shadow-xl)]"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt || title}
          fill
          className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease)] group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-transparent to-transparent"
          aria-hidden="true"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-900 backdrop-blur-sm [box-shadow:var(--shadow-sm)]">
            {mode}
          </span>
          {isFree && (
            <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-900 [box-shadow:var(--shadow-sm)]">
              Free
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-[22px] font-bold leading-[1.2] text-ink-900 mb-3">
          {title}
        </h3>
        <p className="text-[15px] leading-[1.6] text-ink-500 mb-6 line-clamp-3">
          {description}
        </p>

        {includes.length > 0 && (
          <ul className="mb-7 space-y-2.5">
            {includes.slice(0, 3).map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[14px] text-ink-700"
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Footer with arrow */}
        <div className="mt-auto flex items-center justify-between border-t border-ink-100 pt-5">
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-500">
            View course
          </span>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-700 transition-all duration-[var(--dur)] ease-[var(--ease)] group-hover:bg-green-500 group-hover:text-white">
            <svg
              className="h-4 w-4 transition-transform duration-[var(--dur)] ease-[var(--ease)] group-hover:translate-x-0.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
