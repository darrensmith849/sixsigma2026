import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  logo?: string;
  logoAlt?: string;
}

export default function TestimonialCard({
  quote,
  name,
  role,
  logo,
  logoAlt,
}: TestimonialCardProps) {
  return (
    <figure className="relative flex h-full flex-col justify-between rounded-[20px] border border-ink-100 bg-white p-10 [box-shadow:var(--shadow-md)]">
      <svg
        className="absolute right-10 top-10 h-12 w-12 text-green-100"
        viewBox="0 0 48 48"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M14 10c-4 0-8 3-8 8v14h12V20h-6c0-3 2-6 6-6V10zm20 0c-4 0-8 3-8 8v14h12V20h-6c0-3 2-6 6-6V10z" />
      </svg>
      <blockquote className="relative z-10 font-serif text-[22px] leading-[1.5] text-ink-900">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-8 flex items-center justify-between">
        <div>
          <div className="text-[16px] font-semibold text-ink-900">{name}</div>
          <div className="text-[14px] text-ink-500">{role}</div>
        </div>
        {logo && (
          <div className="relative h-8 w-24 opacity-70">
            <Image
              src={logo}
              alt={logoAlt ?? ""}
              fill
              className="object-contain"
              sizes="96px"
            />
          </div>
        )}
      </figcaption>
    </figure>
  );
}
