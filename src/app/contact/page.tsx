"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import ClientLogoGrid from "@/components/ClientLogoGrid";
import FadeIn from "@/components/FadeIn";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission will be wired up in a later phase
    alert("Thank you for your enquiry. We will be in touch shortly.");
  };

  return (
    <div className="pt-[80px]">
      {/* ───── Green Hero ───── */}
      <section className="bg-green py-16 md:py-24">
        <div className="container text-center">
          <h1 className="!text-inverse mb-6">Contact / Resources</h1>
          <p className="text-inverse/90 text-[18px] md:text-[20px] leading-relaxed max-w-3xl mx-auto">
            Get in touch with our team for course enquiries, consultancy
            requests, partnership opportunities, or general questions about
            Six Sigma training in South Africa.
          </p>
        </div>
      </section>

      {/* ───── Contact Details ───── */}
      <FadeIn>
        <section className="section">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {/* South Africa */}
              <div className="bg-light-grey rounded-lg p-8">
                <h2 className="text-heading font-semibold mb-6">
                  South Africa
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-[14px] text-muted font-medium mb-1">
                      Company
                    </p>
                    <p className="text-body text-[16px]">
                      Six Sigma South Africa&trade; &mdash; 2KO Africa CC
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px] text-muted font-medium mb-1">
                      Phone
                    </p>
                    <p className="text-body text-[16px]">
                      <a
                        href="tel:+27214265300"
                        className="text-link hover:text-link-hover"
                      >
                        021 426 5300
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px] text-muted font-medium mb-1">
                      Email
                    </p>
                    <p className="text-body text-[16px]">
                      <a
                        href="mailto:info@2ko.co.za"
                        className="text-link hover:text-link-hover"
                      >
                        info@2ko.co.za
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px] text-muted font-medium mb-1">
                      Training Locations
                    </p>
                    <p className="text-body text-[16px]">
                      Johannesburg, Cape Town, Durban, Pretoria, Port
                      Elizabeth &amp; on-site nationwide
                    </p>
                  </div>
                </div>
              </div>

              {/* United Kingdom */}
              <div className="bg-light-grey rounded-lg p-8">
                <h2 className="text-heading font-semibold mb-6">
                  United Kingdom
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-[14px] text-muted font-medium mb-1">
                      Company
                    </p>
                    <p className="text-body text-[16px]">2KO International</p>
                  </div>
                  <div>
                    <p className="text-[14px] text-muted font-medium mb-1">
                      Email
                    </p>
                    <p className="text-body text-[16px]">
                      <a
                        href="mailto:info@2ko.co.za"
                        className="text-link hover:text-link-hover"
                      >
                        info@2ko.co.za
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px] text-muted font-medium mb-1">
                      Services
                    </p>
                    <p className="text-body text-[16px]">
                      Virtual and online Six Sigma training for UK-based
                      professionals and organisations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Enquiry Form ───── */}
      <FadeIn>
        <section className="section bg-light-grey">
          <div className="container">
            <SectionHeading subtitle="Fill in the form below and our team will get back to you within 24 hours.">
              Send Us an Enquiry
            </SectionHeading>

            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto mt-10 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[14px] text-heading font-medium mb-1.5"
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 text-[16px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[14px] text-heading font-medium mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 text-[16px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
                    placeholder="you@company.co.za"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[14px] text-heading font-medium mb-1.5"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 text-[16px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
                    placeholder="021 000 0000"
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-[14px] text-heading font-medium mb-1.5"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-4 py-3 text-[16px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-[14px] text-heading font-medium mb-1.5"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 text-[16px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="course-enquiry">Course Enquiry</option>
                  <option value="corporate-training">Corporate Training</option>
                  <option value="consultancy">Consultancy Services</option>
                  <option value="partnership">Partnership</option>
                  <option value="general">General Enquiry</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[14px] text-heading font-medium mb-1.5"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 text-[16px] text-body bg-white border border-border-grey rounded-[5px] focus:outline-none focus:border-green transition-colors resize-vertical"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center font-medium rounded-[5px] transition-all duration-200 text-center px-8 py-3 text-[18px] bg-green text-inverse border-2 border-green hover:bg-green-hover hover:border-green-hover cursor-pointer"
                >
                  Send Enquiry
                </button>
              </div>
            </form>
          </div>
        </section>
      </FadeIn>

      {/* ───── Become a Trainer ───── */}
      <FadeIn>
        <section className="section">
          <div className="container text-center max-w-3xl mx-auto">
            <SectionHeading subtitle="Are you a certified Six Sigma Black Belt or Master Black Belt looking for training opportunities? We are always looking for experienced trainers to join our network.">
              Become a Trainer
            </SectionHeading>
            <p className="text-body text-[16px] leading-relaxed mt-4">
              If you are interested in becoming a Six Sigma trainer with us,
              please send your CV and a brief cover letter to{" "}
              <a
                href="mailto:info@2ko.co.za"
                className="text-link hover:text-link-hover"
              >
                info@2ko.co.za
              </a>{" "}
              with the subject line &ldquo;Trainer Application&rdquo;.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* ───── FAQ Section ───── */}
      <FadeIn>
        <section className="section bg-light-grey">
          <div className="container">
            <SectionHeading>Frequently Asked Questions</SectionHeading>

            <div className="max-w-3xl mx-auto mt-10 space-y-6">
              {[
                {
                  q: "What is Six Sigma?",
                  a: "Six Sigma is a data-driven methodology for eliminating defects and reducing variation in any process. It uses statistical tools and techniques to improve quality, efficiency, and customer satisfaction.",
                },
                {
                  q: "Are your certifications internationally recognised?",
                  a: "Yes. All our certifications are accredited through the Council for Six Sigma Certification (CSSC) based in the USA. We also hold MICT SETA accreditation locally in South Africa.",
                },
                {
                  q: "What is the difference between Lean and DMAIC?",
                  a: "Lean Six Sigma focuses on waste reduction using 5S and visual factory methods, best suited for manufacturing. DMAIC Six Sigma focuses on variation reduction using statistical methods, best suited for process environments.",
                },
                {
                  q: "Which belt level should I start with?",
                  a: "If you are new to Six Sigma, we recommend starting with the free White Belt online course. For those with some process improvement experience, Yellow Belt is a good starting point. Green Belt is ideal for project team members.",
                },
                {
                  q: "Do you offer in-house or on-site training?",
                  a: "Yes, we offer customised corporate training at your premises anywhere in South Africa. Contact us for a tailored quote based on your team size and requirements.",
                },
                {
                  q: "How long does each course take?",
                  a: "Course duration varies by belt level and delivery mode. Online courses are self-paced. Virtual and classroom courses typically range from 1 day (Yellow Belt) to 5 days (Black Belt). Contact us for specific schedules.",
                },
                {
                  q: "What software is used in training?",
                  a: "For Green Belt and Black Belt courses, we use SigmaXL, a statistical analysis add-in for Microsoft Excel. A trial version is included with these courses.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="bg-white rounded-lg p-6">
                  <h3 className="text-[18px] text-heading font-semibold mb-2">
                    {q}
                  </h3>
                  <p className="text-body text-[16px] leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Client Logos ───── */}
      <FadeIn>
        <ClientLogoGrid />
      </FadeIn>
    </div>
  );
}
