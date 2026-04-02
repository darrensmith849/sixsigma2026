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
  children?: SubMenuItem[];
}

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
            label: "5s",
            href: "#",
            children: [
              { label: "Classroom", href: "/six-sigma-classroom-5s-course-in-south-africa" },
              { label: "Virtual", href: "/six-sigma-online-5s-course-in-south-africa" },
              { label: "Online", href: "/six-sigma-virtual-5s-course-in-south-africa" },
            ],
          },
          {
            label: "Kaizen",
            href: "#",
            children: [
              { label: "Classroom", href: "/six-sigma-classroom-kaizen-course-in-south-africa" },
              { label: "Virtual", href: "/six-sigma-virtual-kaizen-course-in-south-africa" },
              { label: "Online", href: "/six-sigma-online-kaizen-course-in-south-africa" },
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
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="#16b24a" />
                <path d="M12 20C12 15.6 15.6 12 20 12C22.4 12 24.5 13.1 26 14.8L24 16.8C23 15.7 21.6 15 20 15C17.2 15 15 17.2 15 20C15 22.8 17.2 25 20 25C21.6 25 23 24.3 24 23.2L26 25.2C24.5 26.9 22.4 28 20 28C15.6 28 12 24.4 12 20Z" fill="white"/>
              </svg>
              <div className="leading-tight">
                <span className="text-[20px] font-bold tracking-tight text-display block">
                  SIX SIGMA
                </span>
                <span className="text-[11px] font-medium tracking-[0.15em] text-muted block">
                  SOUTH AFRICA
                </span>
              </div>
            </div>
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

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="px-4 py-2 text-[15px] font-medium text-heading hover:text-link transition-colors"
      >
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
        className="flex items-center gap-1 px-4 py-2 text-[15px] font-medium text-heading hover:text-link transition-colors"
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
        <div className="absolute top-full left-0 pt-1 min-w-[200px]">
          <div className="bg-white rounded-md shadow-lg border border-border-grey py-2">
            {item.children.map((child) => (
              <DropdownItem key={child.label} item={child} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DropdownItem({ item }: { item: SubMenuItem }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="block px-4 py-2 text-[14px] text-body hover:text-link hover:bg-light-grey transition-colors"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-[14px] text-body hover:text-link hover:bg-light-grey transition-colors"
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
          <path d="M5 3L8 6L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-full top-0 ml-1 min-w-[180px]">
          <div className="bg-white rounded-md shadow-lg border border-border-grey py-2">
            {item.children.map((child) => (
              <DropdownItem key={child.label} item={child} />
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
        className="block py-3 text-[16px] font-medium text-heading border-b border-border-grey"
        onClick={onClose}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-border-grey">
      <button
        className="flex items-center justify-between w-full py-3 text-[16px] font-medium text-heading"
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
        className="block py-2 text-[15px] text-body"
        onClick={onClose}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        className="flex items-center justify-between w-full py-2 text-[15px] text-body"
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
