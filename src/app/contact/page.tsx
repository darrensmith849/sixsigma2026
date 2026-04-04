import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ClientLogoGrid from "@/components/ClientLogoGrid";
import ContactForm from "@/components/ContactForm";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Contact Six Sigma South Africa | Training Enquiries",
  description:
    "Contact Six Sigma South Africa on 021 426 5300 or info@2ko.co.za for accredited Six Sigma training, consultancy, and corporate training enquiries.",
};

export default function ContactPage() {
  return (
    <div className="pt-[80px]">
      {/* ───── Green Hero ───── */}
      <section className="bg-green py-16 md:py-24">
        <div className="container text-center">
          <h1 className="!text-inverse mb-6">Contact / Resources</h1>
          <p className="text-inverse/90 text-[20px] md:text-[24px] leading-relaxed max-w-4xl mx-auto">
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
                    <p className="text-[15px] text-muted font-medium mb-1">
                      Company
                    </p>
                    <p className="text-body text-[18px]">
                      Six Sigma South Africa&trade; &mdash; 2KO Africa CC
                    </p>
                  </div>
                  <div>
                    <p className="text-[15px] text-muted font-medium mb-1">
                      Phone
                    </p>
                    <p className="text-body text-[18px]">
                      <a
                        href="tel:+27214265300"
                        className="text-link hover:text-link-hover"
                      >
                        021 426 5300
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="text-[15px] text-muted font-medium mb-1">
                      Email
                    </p>
                    <p className="text-body text-[18px]">
                      <a
                        href="mailto:info@2ko.co.za"
                        className="text-link hover:text-link-hover"
                      >
                        info@2ko.co.za
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="text-[15px] text-muted font-medium mb-1">
                      Training Locations
                    </p>
                    <p className="text-body text-[18px]">
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
                    <p className="text-[15px] text-muted font-medium mb-1">
                      Company
                    </p>
                    <p className="text-body text-[18px]">2KO International</p>
                  </div>
                  <div>
                    <p className="text-[15px] text-muted font-medium mb-1">
                      Email
                    </p>
                    <p className="text-body text-[18px]">
                      <a
                        href="mailto:info@2ko.co.za"
                        className="text-link hover:text-link-hover"
                      >
                        info@2ko.co.za
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="text-[15px] text-muted font-medium mb-1">
                      Services
                    </p>
                    <p className="text-body text-[18px]">
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
            <ContactForm />
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
            <p className="text-body text-[18px] leading-relaxed mt-4">
              If you are interested in becoming a Six Sigma trainer with us,
              please send your CV and a brief cover letter to{" "}
              <a
                href="mailto:info@2ko.co.za"
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

            <div id="faqs" className="max-w-3xl mx-auto mt-10 space-y-4">
              {[
                { q: "Where should beginners/newbies begin?", a: "If you are completely new to six sigma, you could potentially start with white, yellow or green belt. We recommend beginning with yellow belt, because the yellow belt covers the full content of the white belt anyway. If you have project management experience, we recommend starting with green belt." },
                { q: "Do I have to begin with white belt?", a: "No, you can begin with yellow or green, even if you are new to six sigma." },
                { q: "I am an engineer. Can I begin with green belt?", a: "Yes, it is possible. If you have some solid project management experience and you are an engineer, you can skip yellow belt, and begin with green belt." },
                { q: "I have a master\u2019s degree, with excellent stats and lots of project management experience. Can I go direct to black belt?", a: "In theory yes, and we do have some delegates who choose this path. We do not recommend skipping green belt, because as a black belt you will need to manage a team of green belt practitioners. If however, you insist, we will permit it at your own risk." },
                { q: "Who should sign up for Six Sigma?", a: "Six Sigma Certification can be applied to many aspects of business, and therefore can benefit almost all companies. By signing up your employees, Six Sigma can drastically improve your organisation, and at the same time help your employees climb the corporate ladder." },
                { q: "Why Six Sigma?", a: "Six Sigma is a highly disciplined approach that allows us to focus on creating and delivering nearly perfect products and services. The underlying idea being that if you can measure how many \u201cdefects\u201d you have in a process, you can systematically figure out a way to eliminate them and get as close to \u201czero defects\u201d as possible." },
                { q: "What is the difference between Virtual and Online training?", a: "We classify \u201cOnline\u201d training as self-study, self-paced eLearning over the internet. Your course comprises pre-recorded video lectures, quizzes and tests. We classify \u201cVirtual\u201d training as live instructor-led training that takes place on specific, scheduled dates via MS Teams." },
                { q: "What is the difference between Lean and DMAIC?", a: "Lean uses tools and techniques to improve efficiency by identifying and eliminating the sources of waste, improving process flow. DMAIC focuses on reducing variation by finding and fixing the root cause, improving effectiveness and focusing on doing things right the first time." },
                { q: "Is 2KO Africa certification internationally recognised?", a: "2KO Africa is the most recognised certification body for Africa. We are the only company that is authorised by MICT SETA in South Africa for six sigma certifications. We are a member of CSSC (Council for Six Sigma Certification), which is USA based. Our trainers are IASSC and CSSC certified." },
                { q: "Why is 2KO not aligned with IASSC?", a: "We spent many years aligned with IASSC, and recently decided that we prefer CSSC. The IASSC Certification is exam based, where industry primarily requires experience-based certifications. 2KO Africa students actually apply the learning and the 6+ month journey of certification is the evidence-based part of the training and certification." },
                { q: "Is there a brochure which covers all courses and pricing?", a: "Yes there is. Contact us to request the latest course brochure with all pricing and pre-requisites." },
                { q: "What are the prerequisites / do I have to take the \u201cbelts\u201d in order?", a: "You do not need to start from white belt. You can request our brochure which will give you pre-requisites for each course." },
                { q: "Do I get a certificate after I complete this course?", a: "When you complete a course of any kind with us, you will receive a certificate of completion." },
                { q: "Are there any hidden costs?", a: "The price you see when we send you a formal quote, is the price which includes course, manuals, logistics, and certification. There are no additional costs." },
                { q: "I work full time and cannot take time off. Can I study after hours?", a: "The only type of course which accommodates any time learning are our \u201conline\u201d courses (self-paced eLearning). We would however schedule weekend or after-hours courses for groups." },
                { q: "How long will it take me to complete the course?", a: "Yellow belt courses are 2 days full time. Green belt courses are 5 days full time. Black belt courses are 10 days full time (2 non-consecutive weeks). Online self-study: White belt \u2013 30 days access, Yellow belt \u2013 90 days access, Green belt \u2013 1 year access, Black belt \u2013 1 year access." },
                { q: "What is the difference between SigmaXL and Minitab?", a: "SigmaXL and Minitab are two different types of statistical software packages that the online courses use for the statistical analysis sections of six sigma training." },
                { q: "Is the software included in your online course fee?", a: "If you choose an online course with SigmaXL, we include a perpetual license with your course purchase. If you choose Minitab, you will get a 30-day free trial. An annual Minitab license costs around R25,000." },
                { q: "How long do I have to complete a project for green or black belt?", a: "Green belt students are given 3 months to submit their project. Black belt students are given 6 months to submit their project." },
                { q: "What happens if I run out of time to complete my project?", a: "If you run out of time, you may contact our staff who will request an extension for you from the instructor. This is usually given for a few weeks when requested." },
                { q: "What happens if I run out of time to complete my online course?", a: "If you run out of time, you will need to purchase an extension. Extensions can be 3 months or 6 months." },
                { q: "Can I pay off my course in instalments?", a: "We have payment terms for individuals who are funding their own courses. We allow all courses to be paid off in 3 or 6 months usually, but we are flexible and will try to accommodate students where possible." },
                { q: "Do you offer free courses?", a: "Yes, we offer a free White Belt course. Visit our courses page to enrol." },
                { q: "Do I require Green Belt in order to do Black Belt?", a: "We judge each delegate on their own experience. In rare cases where there has been vast pre-requisite experience in the project and engineering field, we will enrol a student directly on Black Belt. Usually, a student is required to attend green belt before the black belt." },
                { q: "Do I have to take an exam with six sigma courses?", a: "No exam is necessary for a course completion certificate. Simply completing the course qualifies you for a course completion certificate. To obtain full certification, you will need to take an exam." },
                { q: "Where can I see your course schedule?", a: "Our course schedule is available on our website for all our instructor led and virtual training courses. Visit the Schedule page for details." },
              ].map(({ q, a }) => (
                <details key={q} className="bg-white rounded-lg">
                  <summary className="cursor-pointer px-6 py-4 text-heading font-semibold text-[18px] list-none flex items-center justify-between">
                    {q}
                    <svg className="w-4 h-4 shrink-0 ml-4 transition-transform" fill="none" viewBox="0 0 12 12">
                      <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4">
                    <p className="text-body text-[17px] leading-relaxed">{a}</p>
                  </div>
                </details>
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
