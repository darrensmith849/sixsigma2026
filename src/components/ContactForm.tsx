"use client";

import { useState } from "react";

export default function ContactForm() {
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
    alert("Thank you for your enquiry. We will be in touch shortly.");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-10 space-y-5">
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
  );
}
