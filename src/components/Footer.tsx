import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer-bg border-t border-border-grey">
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div>
            <h4 className="text-[18px] text-heading font-semibold mb-4">
              Six Sigma South Africa
            </h4>
            <p className="text-[16px] text-body leading-relaxed">
              The premier provider of internationally accredited Six Sigma
              training and certification on the African continent.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[18px] text-heading font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Courses", href: "/courses" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Schedule", href: "/schedule" },
                { label: "Training Benefits", href: "/training-benefits" },
                { label: "Accreditation", href: "/accreditation" },
                { label: "Brochure", href: "/brochure" },
                { label: "FAQs", href: "/faqs" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[16px] text-body leading-relaxed hover:text-link transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-[18px] text-heading font-semibold mb-4">
              Courses
            </h4>
            <ul className="space-y-4">
              {[
                { label: "White Belt", href: "/courses/white-belt-classroom" },
                { label: "Yellow Belt", href: "/courses/yellow-belt-classroom" },
                { label: "Lean Green Belt", href: "/courses/lean-green-belt-classroom" },
                { label: "DMAIC Green Belt", href: "/courses/dmaic-green-belt-classroom" },
                { label: "Lean Black Belt", href: "/courses/lean-black-belt-classroom" },
                { label: "DMAIC Black Belt", href: "/courses/dmaic-black-belt-classroom" },
                { label: "Root Cause Analysis", href: "/courses/root-cause-analysis-classroom" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[16px] text-body leading-relaxed hover:text-link transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[18px] text-heading font-semibold mb-4">
              Contact Us
            </h4>
            <ul className="space-y-4 text-[16px] text-body">
              <li>
                <a
                  href="tel:+27214265300"
                  className="hover:text-link transition-colors"
                >
                  021 426 5300
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@2ko.co.za"
                  className="hover:text-link transition-colors"
                >
                  info@2ko.co.za
                </a>
              </li>
              <li className="pt-2 text-muted leading-relaxed">
                Johannesburg &middot; Cape Town
                <br />
                Durban &middot; Pretoria
                <br />
                Port Elizabeth &middot; On-site
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-grey">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[14px] text-muted">
          <p>&copy; {year} Six Sigma South Africa&trade; &mdash; 2KO Africa CC</p>
          <p>CSSC Internationally Accredited</p>
        </div>
      </div>
    </footer>
  );
}
