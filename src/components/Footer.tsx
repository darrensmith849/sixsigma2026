import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Courses", href: "/courses" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const courseLinks = [
  { label: "White Belt", href: "/courses/white-belt-classroom" },
  { label: "Yellow Belt", href: "/courses/yellow-belt-classroom" },
  { label: "Lean Green Belt", href: "/courses/lean-green-belt-classroom" },
  { label: "DMAIC Green Belt", href: "/courses/dmaic-green-belt-classroom" },
  { label: "Lean Black Belt", href: "/courses/lean-black-belt-classroom" },
  { label: "DMAIC Black Belt", href: "/courses/dmaic-black-belt-classroom" },
  { label: "Root Cause Analysis", href: "/courses/root-cause-analysis-classroom" },
];

const resourceLinks = [
  { label: "Schedule", href: "/schedule" },
  { label: "Training Benefits", href: "/training-benefits" },
  { label: "Accreditation", href: "/accreditation" },
  { label: "Brochure", href: "/brochure" },
  { label: "FAQs", href: "/faqs" },
];

const cityLinks = [
  { label: "Johannesburg", href: "/courses/in/johannesburg" },
  { label: "Cape Town", href: "/courses/in/cape-town" },
  { label: "Durban", href: "/courses/in/durban" },
  { label: "Pretoria", href: "/courses/in/pretoria" },
  { label: "Port Elizabeth", href: "/courses/in/port-elizabeth" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-green-900 text-white border-t-2 border-green-500">
      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container-wide py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/sssa-logo-full-dark.png"
                alt="Six Sigma South Africa"
                width={280}
                height={70}
                className="h-[44px] w-auto object-contain"
              />
            </Link>
            <p className="mt-6 text-[15px] text-white/70 leading-relaxed max-w-[320px]">
              The premier provider of internationally accredited Six Sigma
              training and certification on the African continent.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="inline-flex h-9 items-center rounded-full bg-white/10 px-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/85">
                CSSC Accredited · USA
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60 mb-5">
              Site
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[15px] text-white/85 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60 mb-5">
              Courses
            </h4>
            <ul className="space-y-3">
              {courseLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[15px] text-white/85 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60 mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[15px] text-white/85 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mt-10 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60 mb-5">
              Locations
            </h4>
            <ul className="space-y-3">
              {cityLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[15px] text-white/85 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mt-10 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60 mb-5">
              Get in touch
            </h4>
            <ul className="space-y-3 text-[15px] text-white/85">
              <li>
                <a href="tel:+27215270065" className="hover:text-white transition-colors">
                  021 527 0065
                </a>
              </li>
              <li>
                <a href="mailto:info@2ko.co.za" className="hover:text-white transition-colors">
                  info@2ko.co.za
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-white/60">
          <p>&copy; {year} Six Sigma South Africa&trade; — 2KO Africa CC</p>
          <p>Internationally Accredited · CSSC USA</p>
        </div>
      </div>
    </footer>
  );
}
