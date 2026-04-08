"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SubMenuItem {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: SubMenuItem[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "All Courses", href: "/courses", description: "Browse the full belt catalogue" },
      { label: "White Belt", href: "/courses/white-belt-classroom", description: "Foundation introduction · free" },
      { label: "Yellow Belt", href: "/courses/yellow-belt-classroom", description: "Team-member fundamentals" },
      { label: "Lean Green Belt", href: "/courses/lean-green-belt-classroom", description: "Lean tools and waste reduction" },
      { label: "DMAIC Green Belt", href: "/courses/dmaic-green-belt-classroom", description: "Lead small to medium projects" },
      { label: "Lean Black Belt", href: "/courses/lean-black-belt-classroom", description: "Enterprise Lean leadership" },
      { label: "DMAIC Black Belt", href: "/courses/dmaic-black-belt-classroom", description: "Advanced statistics & leadership" },
      { label: "5S", href: "/courses/5s-classroom", description: "Workplace organisation" },
      { label: "Kaizen", href: "/courses/kaizen-classroom", description: "Continuous improvement events" },
      { label: "Root Cause Analysis", href: "/courses/root-cause-analysis-classroom", description: "Find and fix true root causes" },
    ],
  },
  { label: "About", href: "/about" },
  {
    label: "Locations",
    href: "/courses/in/johannesburg",
    children: [
      { label: "Johannesburg", href: "/courses/in/johannesburg", description: "Gauteng \u00b7 Sandton, Rosebank, Midrand" },
      { label: "Cape Town", href: "/courses/in/cape-town", description: "Western Cape \u00b7 CBD, Bellville, Stellenbosch" },
      { label: "Durban", href: "/courses/in/durban", description: "KwaZulu-Natal \u00b7 Umhlanga, Pinetown" },
      { label: "Pretoria", href: "/courses/in/pretoria", description: "Gauteng \u00b7 Tshwane region" },
      { label: "Port Elizabeth", href: "/courses/in/port-elizabeth", description: "Eastern Cape \u00b7 Gqeberha, Coega" },
    ],
  },
  {
    label: "Resources",
    href: "/contact",
    children: [
      { label: "Contact", href: "/contact", description: "Talk to our team" },
      { label: "Schedule", href: "/schedule", description: "Upcoming course dates" },
      { label: "Training Benefits", href: "/training-benefits", description: "Why invest in Six Sigma" },
      { label: "Accreditation", href: "/accreditation", description: "Our CSSC credentials" },
      { label: "Brochure", href: "/brochure", description: "Get the course catalogue" },
      { label: "FAQs", href: "/faqs", description: "Common questions answered" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--dur)] ease-[var(--ease)] ${
        scrolled
          ? "bg-white/90 backdrop-blur-md [box-shadow:var(--shadow-md)]"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="container-wide">
        <div className={`flex items-center justify-between transition-all duration-[var(--dur)] ${scrolled ? "h-[68px]" : "h-[80px]"}`}>
          {/* Logo */}
          <Link href="/" className="shrink-0 transition-opacity hover:opacity-80">
            <Image
              src="/images/sssa-logo-full.png"
              alt="Six Sigma South Africa"
              width={280}
              height={70}
              className="h-[44px] w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavItemDesktop key={item.label} item={item} pathname={pathname} />
            ))}
            <Link
              href="/contact"
              className="ml-4 inline-flex items-center justify-center rounded-[12px] bg-green-500 px-5 py-2.5 text-[14px] font-semibold text-white transition-all duration-[var(--dur)] ease-[var(--ease)] [box-shadow:var(--shadow-md),inset_0_1px_0_rgba(255,255,255,.18)] hover:-translate-y-[1px] hover:bg-green-600"
            >
              Enquire now
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <span className={`block w-6 h-[2px] bg-ink-900 transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-[2px] bg-ink-900 transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[2px] bg-ink-900 transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed inset-0 top-[68px] bg-white z-40 overflow-y-auto transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="p-6">
          {navItems.map((item) => (
            <MobileNavItem
              key={item.label}
              item={item}
              onClose={() => setMobileOpen(false)}
            />
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-6 block w-full rounded-[12px] bg-green-500 px-6 py-4 text-center text-[16px] font-semibold text-white"
          >
            Enquire now
          </Link>
        </nav>
      </div>
    </header>
  );
}

function NavItemDesktop({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href) && item.href !== "/contact";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={`relative px-4 py-2 text-[15px] font-medium transition-colors ${
          isActive ? "text-green-700" : "text-ink-700 hover:text-green-700"
        }`}
      >
        {item.label}
        <span
          className={`absolute left-4 right-4 -bottom-0.5 h-0.5 origin-left bg-green-500 transition-transform duration-[var(--dur)] ease-[var(--ease)] ${
            isActive ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`inline-flex items-center gap-1.5 px-4 py-2 text-[15px] font-medium transition-colors ${
          isActive || open ? "text-green-700" : "text-ink-700 hover:text-green-700"
        }`}
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <svg
          className={`w-3 h-3 transition-transform duration-[var(--dur)] ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 12 12"
        >
          <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span
          className={`absolute left-4 right-7 -bottom-0.5 h-0.5 origin-left bg-green-500 transition-transform duration-[var(--dur)] ${
            isActive ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
          <div className="w-[420px] rounded-[20px] border border-ink-100 bg-white p-3 [box-shadow:var(--shadow-xl)]">
            {item.children.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                className="group flex items-start gap-3 rounded-[12px] px-4 py-3 transition-colors hover:bg-ink-50"
              >
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-green-500 transition-transform group-hover:scale-150" />
                <span className="flex-1">
                  <span className="block text-[15px] font-semibold text-ink-900 group-hover:text-green-700">
                    {child.label}
                  </span>
                  {child.description && (
                    <span className="block text-[13px] text-ink-500 mt-0.5">
                      {child.description}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNavItem({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="block py-4 text-[20px] font-semibold text-ink-900 border-b border-ink-100"
        onClick={onClose}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-ink-100">
      <button
        className="flex items-center justify-between w-full py-4 text-[20px] font-semibold text-ink-900"
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 12 12"
        >
          <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="pl-4 pb-4 space-y-1">
          {item.children.map((child) => (
            <Link
              key={child.label}
              href={child.href}
              className="block py-2 text-[16px] text-ink-700"
              onClick={onClose}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
