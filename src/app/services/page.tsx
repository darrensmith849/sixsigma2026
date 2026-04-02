import type { Metadata } from "next";
import ServiceBlock from "@/components/ServiceBlock";

export const metadata: Metadata = {
  title:
    "Our Services | Six Sigma South Africa Consulting Services & Training",
  description:
    "Discover services offered in the Six Sigma space through world-leading experts. Consultancy, process improvement, quality management, project management, eLearning and corporate training.",
};

export default function ServicesPage() {
  return (
    <div className="pt-[80px]">
      {/* ───── Green Hero ───── */}
      <section className="bg-green py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-white mb-6 !text-white">Our Services</h1>
          <p className="text-white/90 text-[18px] md:text-[20px] leading-relaxed max-w-3xl mx-auto">
            At Six Sigma South Africa, we offer a comprehensive range of
            services tailored to help businesses of all sizes achieve their
            process improvement, quality management, and project management
            goals. Certification training is available in{" "}
            <a
              href="/courses"
              className="!text-white underline underline-offset-2 hover:!text-white/80"
            >
              Johannesburg
            </a>
            ,{" "}
            <a
              href="/courses"
              className="!text-white underline underline-offset-2 hover:!text-white/80"
            >
              Cape Town
            </a>
            ,{" "}
            <a
              href="/courses"
              className="!text-white underline underline-offset-2 hover:!text-white/80"
            >
              Port Elizabeth
            </a>
            ,{" "}
            <a
              href="/courses"
              className="!text-white underline underline-offset-2 hover:!text-white/80"
            >
              Durban
            </a>
            ,{" "}
            <a
              href="/courses"
              className="!text-white underline underline-offset-2 hover:!text-white/80"
            >
              Pretoria
            </a>{" "}
            plus on-site. Explore our services below.
          </p>
        </div>
      </section>

      {/* ───── 1. Consultancy (text left, image right) ───── */}
      <ServiceBlock
        heading="Consultancy"
        description="Maximize efficiency and productivity with our expert consultancy services. Our team of certified Six Sigma professionals will work with your organization to identify areas for improvement, develop strategies, and implement solutions for long-term success."
        buttonText="Enquire Now"
        buttonHref="/contact"
        layout="text-left"
        imageSrc="/images/Consultancy-01.jpg"
        imageAlt="Six Sigma consultancy session"
      />

      {/* ───── 2. Process Improvement (centered with icon) ───── */}
      <ServiceBlock
        heading="Process Improvement"
        description="Unlock your organization's potential with our process improvement services. We apply Six Sigma methodologies to analyze and optimize your business processes, reducing waste, and increasing profitability while maintaining high-quality standards."
        buttonText="Learn More"
        buttonHref="/about"
        layout="centered"
        iconSrc="/images/Services-01.png"
        iconAlt="Process improvement icon"
      />

      {/* ───── 3. Quality Management (image left, text right) ───── */}
      <ServiceBlock
        heading="Quality Management"
        description="Ensure your organization meets the highest quality standards with our quality management services. We'll help you establish and maintain a robust quality management system, develop quality policies, and conduct audits and assessments to monitor performance."
        buttonText="View our courses"
        buttonHref="/courses"
        layout="text-right"
        imageSrc="/images/Quality-management.jpg"
        imageAlt="Quality management research and analysis"
      />

      {/* ───── 4. Project Management (centered with icon) ───── */}
      <ServiceBlock
        heading="Project Management"
        description="Unlock your organization's potential with our process improvement services. We apply Six Sigma methodologies to analyze and optimize your business processes, reducing waste, and increasing profitability while maintaining high-quality standards."
        buttonText="View Our Courses"
        buttonHref="/courses"
        layout="centered"
        iconSrc="/images/Services-03.png"
        iconAlt="Project management icon"
      />

      {/* ───── 5. eLearning Solutions (text left, image right) ───── */}
      <ServiceBlock
        heading="eLearning Solutions"
        description="Gain access to flexible and cost-effective learning options with our e-learning solutions. Our online courses are designed to accommodate various learning styles, allowing your team to learn at their own pace and from anywhere."
        buttonText="View Our Courses"
        buttonHref="/courses"
        layout="text-left"
        imageSrc="/images/focused-man-working-with-laptop.jpg"
        imageAlt="eLearning solutions"
      />

      {/* ───── 6. Corporate Training (centered with icon) ───── */}
      <ServiceBlock
        heading="Corporate Training"
        description="Empower your workforce with our customized corporate training programs. We offer a wide range of Six Sigma and Lean Management courses, tailored to your organization's needs, to help your employees develop the skills and knowledge necessary for continuous improvement."
        buttonText="View Our Courses"
        buttonHref="/courses"
        layout="centered"
        iconSrc="/images/Services-02.png"
        iconAlt="Corporate training icon"
      />

      {/* ───── 7. Industry-Specific Solutions (image left, text right) ───── */}
      <ServiceBlock
        heading="Industry-Specific Solutions"
        description="Discover targeted solutions designed for your industry. We understand the unique challenges faced by different sectors and offer tailored services to address the specific needs of industries such as manufacturing, healthcare, finance, and more."
        buttonText="View our courses"
        buttonHref="/courses"
        layout="text-right"
        imageSrc="/images/Industry-specific-solutions.jpg"
        imageAlt="Industry-specific solutions"
      />
    </div>
  );
}
