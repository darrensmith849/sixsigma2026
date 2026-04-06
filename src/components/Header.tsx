"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface SubMenuItem {
  label: string;
  href: string;
  children?: SubMenuItem[];
}

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: SubMenuItem[];
}

const navIcons: Record<string, React.ReactNode> = {
  Home: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
    </svg>
  ),
  Services: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Courses: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  "About Us": (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  "Contact / Resources": (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "All Courses", href: "/courses" },
      {
        label: "Short Courses",
        href: "#",
        children: [
          {
            label: "5S",
            href: "#",
            children: [
              { label: "Classroom", href: "/courses/classroom-5s" },
              { label: "Virtual", href: "/courses/virtual-5s" },
              { label: "Online", href: "/courses/online-5s" },
            ],
          },
          {
            label: "Kaizen",
            href: "#",
            children: [
              { label: "Classroom", href: "/courses/classroom-kaizen" },
              { label: "Virtual", href: "/courses/virtual-kaizen" },
              { label: "Online", href: "/courses/online-kaizen" },
            ],
          },
        ],
      },
      { label: "Schedule", href: "/schedule" },
      { label: "Book a course", href: "/book-a-course" },
      { label: "Which course", href: "/which-course" },
    ],
  },
  { label: "About Us", href: "/about" },
  {
    label: "Contact / Resources",
    href: "/contact",
    children: [
      { label: "General enquiries", href: "/contact" },
      { label: "Calendar", href: "/calendar" },
      { label: "Training Benefits", href: "/training-benefits" },
      { label: "Brochure", href: "/brochure" },
      { label: "Accreditation", href: "/accreditation" },
      { label: "FAQ\u2019s", href: "/faqs" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/sssa-logo-full.jpg"
              alt="Six Sigma South Africa"
              width={280}
              height={70}
              className="h-[50px] w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavItemDesktop key={item.label} item={item} />
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <span
              className={`block w-6 h-[2px] bg-display transition-transform duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-display transition-opacity duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-display transition-transform duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed inset-0 top-[80px] bg-white z-40 overflow-y-auto transition-transform duration-300 ${
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
        </nav>
      </div>
    </header>
  );
}

function NavItemDesktop({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const icon = navIcons[item.label];

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="inline-flex items-center gap-2 px-4 py-2 text-[18px] font-medium text-heading hover:text-link transition-colors"
      >
        {icon}
        {item.label}
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
        className="inline-flex items-center gap-1 px-4 py-2 text-[18px] font-medium text-heading hover:text-link transition-colors"
        onClick={() => setOpen(!open)}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {item.label}
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 12 12"
        >
          <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className={`absolute top-full left-0 pt-2 min-w-[210px] transition-all duration-200 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg border border-border-grey py-1.5">
          {item.children?.map((child) => (
            <DropdownItem key={child.label} item={child} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DropdownItem({ item }: { item: SubMenuItem }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="block px-4 py-2 text-[16px] text-body hover:text-link hover:bg-light-grey transition-colors"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-[16px] text-body hover:text-link hover:bg-light-grey transition-colors"
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
          <path d="M5 3L8 6L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className={`absolute left-full top-0 -ml-1 pl-2 min-w-[180px] transition-all duration-200 ${
          open
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-1 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg border border-border-grey py-1.5">
          {item.children?.map((child) => (
            <DropdownItem key={child.label} item={child} />
          ))}
        </div>
      </div>
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
        className="block py-3 text-[22px] font-semibold text-heading border-b border-border-grey"
        onClick={onClose}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-border-grey">
      <button
        className="flex items-center justify-between w-full py-3 text-[22px] font-semibold text-heading"
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 12 12"
        >
          <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="pl-4 pb-2">
          {item.children.map((child) => (
            <MobileSubItem key={child.label} item={child} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  );
}

function MobileSubItem({
  item,
  onClose,
}: {
  item: SubMenuItem;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="block py-2 text-[18px] text-body"
        onClick={onClose}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        className="flex items-center justify-between w-full py-2 text-[18px] text-body"
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 12 12"
        >
          <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="pl-4">
          {item.children.map((child) => (
            <MobileSubItem key={child.label} item={child} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  );
}
