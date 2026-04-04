import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About Six Sigma South Africa | 2KO Africa CC",
  description:
    "Six Sigma South Africa is the leading Six Sigma training provider on the African continent. Founded in 1999, SETA accredited and internationally accredited courses.",
};

export default function AboutPage() {
  return (
    <div className="pt-[80px]">
      {/* ───── 1. Hero Split Section ───── */}
      <FadeIn>
        <section className="flex flex-col lg:flex-row">
          <div
            className="flex-1 flex items-center"
            style={{ padding: "64px 48px", background: "#f5f5f5" }}
          >
            <div style={{ maxWidth: "560px", margin: "0 auto" }}>
              <h1
                className="font-bold mb-6"
                style={{
                  fontSize: "clamp(32px, 3vw, 52px)",
                  lineHeight: 1.1,
                  color: "#5a5a5a",
                }}
              >
                About Six Sigma South Africa&trade;
              </h1>
              <p
                className="leading-relaxed mb-4"
                style={{ color: "#5e5e5e", fontSize: "clamp(17px, 1.2vw, 20px)" }}
              >
                Founded in 1999, 2KO Africa developed local six sigma training
                across the country. Six Sigma South Africa&trade; grew from 2010
                to become the largest Six Sigma training provider on the African
                continent. Our commitment to excellence and continuous
                improvement has helped businesses across various industries
                achieve enhanced operational efficiency and increased
                profitability. Our courses are both SETA accredited and
                internationally accredited.
              </p>
              <p
                className="leading-relaxed mb-1"
                style={{ color: "#5e5e5e", fontSize: "clamp(17px, 1.2vw, 20px)" }}
              >
                Our UK Office is now open.
              </p>
              <p style={{ fontSize: "clamp(17px, 1.2vw, 20px)" }}>
                Click{" "}
                <Link
                  href="/contact"
                  className="text-green font-semibold hover:text-green-hover transition-colors"
                >
                  here
                </Link>{" "}
                to visit.
              </p>
            </div>
          </div>
          <div className="flex-1 relative min-h-[400px] lg:min-h-[560px]">
            <Image
              src="/images/Consultancy-01.jpg"
              alt="Six Sigma South Africa team"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </section>
      </FadeIn>

      {/* ───── 2. Green Mission & Vision Banner ───── */}
      <FadeIn>
        <section className="bg-green" style={{ padding: "80px 0" }}>
          <div className="container text-center">
            <h2
              className="font-semibold text-inverse mb-6"
              style={{ fontSize: "clamp(32px, 3vw, 48px)" }}
            >
              Mission &amp; Vision
            </h2>
            <p className="text-[21px] max-w-3xl mx-auto leading-relaxed text-inverse/90 mb-4">
              Our mission is to empower organizations with the knowledge and
              tools required to implement Six Sigma methodologies, enabling them
              to achieve sustainable business growth.
            </p>
            <p className="text-[21px] max-w-3xl mx-auto leading-relaxed text-inverse/90">
              Our vision is to become the leading provider of Six Sigma education
              and consultancy services in Africa and beyond, driving a culture of
              continuous improvement.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* ───── 3. Two-Column: Accreditations & Careers ───── */}
      <FadeIn>
        <section className="section">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
              <div>
                <h2
                  className="text-heading font-semibold mb-5"
                  style={{ fontSize: "clamp(26px, 2.2vw, 36px)" }}
                >
                  Accreditations &amp; Certifications
                </h2>
                <p className="text-body text-[18px] leading-relaxed">
                  As a testament to our commitment to quality, Six Sigma South
                  Africa has earned multiple accreditations and certifications
                  from reputable industry bodies. Our courses and training
                  programs meet rigorous global standards, ensuring that our
                  clients receive world-class education and support.
                </p>
              </div>
              <div>
                <h2
                  className="text-heading font-semibold mb-5"
                  style={{ fontSize: "clamp(26px, 2.2vw, 36px)" }}
                >
                  Careers
                </h2>
                <p className="text-body text-[18px] leading-relaxed">
                  Join our team of passionate professionals and make a difference
                  in the world of process improvement. At Six Sigma South Africa,
                  we offer a supportive work environment, competitive
                  compensation, and opportunities for growth and development.
                  Explore our current openings and take the first step towards a
                  rewarding career.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── 4. Dark Overlay: Team & Partners ───── */}
      <FadeIn>
        <section className="relative" style={{ minHeight: "420px" }}>
          <Image
            src="/images/hero-presentation.jpg"
            alt="Six Sigma training session"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 flex flex-col lg:flex-row">
            {/* Left green panel */}
            <div
              className="lg:w-1/2 flex items-center bg-green"
              style={{ padding: "64px 48px" }}
            >
              <div style={{ maxWidth: "480px", margin: "0 auto" }}>
                <h2
                  className="font-semibold text-inverse mb-5"
                  style={{ fontSize: "clamp(26px, 2.2vw, 36px)" }}
                >
                  Our Team
                </h2>
                <p className="text-inverse/90 text-[18px] leading-relaxed">
                  The Six Sigma South Africa team comprises experienced and
                  certified professionals who are passionate about helping
                  businesses optimize their processes. Our trainers and
                  consultants hold industry-recognized certifications and have an
                  extensive background in applying Six Sigma principles to a wide
                  range of industries.
                </p>
              </div>
            </div>
            {/* Right side on dark overlay */}
            <div
              className="lg:w-1/2 flex items-center"
              style={{ padding: "64px 48px" }}
            >
              <div style={{ maxWidth: "480px", margin: "0 auto" }}>
                <h2
                  className="font-semibold text-inverse mb-5"
                  style={{ fontSize: "clamp(26px, 2.2vw, 36px)" }}
                >
                  Partners &amp; Affiliations
                </h2>
                <p className="text-inverse/90 text-[18px] leading-relaxed">
                  We have built strategic partnerships with renowned
                  organizations and industry leaders to ensure the quality of our
                  training and services. These collaborations also enable us to
                  stay updated with the latest trends and best practices in Six
                  Sigma and Lean Management.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── 5. Industry Impact ───── */}
      <FadeIn>
        <section className="section">
          <div className="container text-center">
            <h2
              className="text-heading font-semibold mb-4"
              style={{ fontSize: "clamp(32px, 3vw, 48px)" }}
            >
              Industry Impact
            </h2>
            <p className="text-body text-[21px] leading-relaxed max-w-3xl mx-auto mb-12">
              Learn how Six Sigma South Africa has made a difference across
              various industries through our comprehensive training and
              consulting services.
            </p>

            <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {[
                {
                  icon: "/images/Services-01.png",
                  title: "Manufacturing",
                  body: "Improved efficiency, reduced defects, and increased profitability.",
                },
                {
                  icon: "/images/Services-02.png",
                  title: "IT",
                  body: "Boosted project success rates, increased productivity, and reduced costs.",
                },
                {
                  icon: "/images/Services-03.png",
                  title: "Finance",
                  body: "Optimized risk management, increased operational efficiency, and improved customer satisfaction.",
                },
              ].map((item) => (
                <div key={item.title} className="flex flex-col items-center">
                  <div className="w-[80px] h-[80px] rounded-lg bg-green/10 flex items-center justify-center mb-5">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-heading font-semibold text-[22px] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-body text-[17px] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── 6. Success Stories Split Section ───── */}
      <FadeIn>
        <section className="flex flex-col lg:flex-row">
          {/* Left green card */}
          <div
            className="lg:w-1/2 bg-green flex items-center"
            style={{ padding: "64px 48px" }}
          >
            <div style={{ maxWidth: "480px", margin: "0 auto" }}>
              <h2
                className="font-semibold text-inverse mb-5"
                style={{ fontSize: "clamp(26px, 2.2vw, 36px)" }}
              >
                Success Stories
              </h2>
              <p className="text-inverse/90 text-[18px] leading-relaxed mb-6">
                We&rsquo;d love to hear from you! Please feel free to reach out
                with any questions, inquiries, or concerns. You can use the
                following information to get in touch with us or fill out the
                contact form below.
              </p>
              <h3 className="text-inverse font-semibold text-[20px] mb-4">
                General Inquiries
              </h3>
              <div className="space-y-2 mb-6">
                <p className="text-inverse/90 text-[18px]">
                  <a href="tel:+27215270065" className="text-inverse hover:underline">
                    +27 21 527 0065
                  </a>
                </p>
                <p className="text-inverse/90 text-[18px]">
                  <a
                    href="mailto:info@sixsigmasouthafrica.co.za"
                    className="text-inverse hover:underline"
                  >
                    info@sixsigmasouthafrica.co.za
                  </a>
                </p>
              </div>
              <Button href="/book-a-course" variant="white" size="large">
                Book a course
              </Button>
            </div>
          </div>
          {/* Right map/image area */}
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-[500px] bg-light-grey">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.8!2d18.503423!3d-33.893524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDUzJzM2LjciUyAxOMKwMzAnMTIuMyJF!5e0!3m2!1sen!2sza!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, position: "absolute", inset: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Six Sigma South Africa Office Location"
            />
          </div>
        </section>
      </FadeIn>

      {/* ───── 7. Bottom Inquiry Grid ───── */}
      <FadeIn>
        <section className="section">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <h3 className="text-heading font-semibold text-[22px] mb-3">
                  General Inquiries
                </h3>
                <p className="text-body text-[18px] leading-relaxed">
                  Interested in our Six Sigma courses or need help deciding which
                  one is right for you? Our dedicated team is ready to assist
                  you. Send us an email at:{" "}
                  <a
                    href="mailto:courses@sixsigmasouthafrica.co.za"
                    className="text-green font-semibold hover:text-green-hover transition-colors"
                  >
                    courses@sixsigmasouthafrica.co.za
                  </a>
                  , and we&rsquo;ll get back to you as soon as possible.
                </p>
              </div>
              <div>
                <h3 className="text-heading font-semibold text-[22px] mb-3">
                  Partnership opportunities
                </h3>
                <p className="text-body text-[18px] leading-relaxed">
                  We&rsquo;re always open to collaborating with like-minded
                  organizations. If you&rsquo;re interested in partnering with
                  us, please contact our partnership team at:{" "}
                  <a
                    href="mailto:partnerships@sixsigmasouthafrica.co.za"
                    className="text-green font-semibold hover:text-green-hover transition-colors"
                  >
                    partnerships@sixsigmasouthafrica.co.za
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="text-heading font-semibold text-[22px] mb-3">
                  Service inquiries
                </h3>
                <p className="text-body text-[18px] leading-relaxed">
                  If you have any questions about our consultancy, corporate
                  training, or other services, please feel free to reach out to
                  our service team at :{" "}
                  <a
                    href="mailto:services@sixsigmasouthafrica.co.za"
                    className="text-green font-semibold hover:text-green-hover transition-colors"
                  >
                    services@sixsigmasouthafrica.co.za
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="text-heading font-semibold text-[22px] mb-3">
                  General inquiries
                </h3>
                <p className="text-body text-[18px] leading-relaxed">
                  For any other questions or concerns, please don&rsquo;t
                  hesitate to reach out to our support team at:{" "}
                  <a
                    href="mailto:support@sixsigmasouthafrica.co.za"
                    className="text-green font-semibold hover:text-green-hover transition-colors"
                  >
                    support@sixsigmasouthafrica.co.za
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
