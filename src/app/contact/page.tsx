import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ClientLogoGrid from "@/components/ClientLogoGrid";
import ContactForm from "@/components/ContactForm";
import FadeIn from "@/components/FadeIn";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";

/* eslint-disable react/jsx-key */
const faqItems: FaqItem[] = [
  {
    q: "Where should beginners/newbies begin?",
    a: (
      <p>
        If you are completely new to six sigma, you could potentially start with
        white, yellow or green belt. We recommend beginning with yellow belt,
        because the yellow belt covers the full content of the white belt anyway.
        If you have project management experience, we recommend starting with
        green belt or you may make use of our self-service tool that will guide
        you in choosing the correct course for you, please use the link{" "}
        <a href="/which-course" className="text-link hover:text-link-hover">
          https://sixsigmasouthafrica.co.za/which-course
        </a>
      </p>
    ),
  },
  {
    q: "Do I have to begin with white belt?",
    a: (
      <p>
        No, you can begin with yellow or green, even if you are new to six
        sigma. See the question Where should beginners/newbies begin.
      </p>
    ),
  },
  {
    q: "I am an engineer. Can I begin with green belt?",
    a: (
      <p>
        Yes, it is possible. If you have some solid project management
        experience and you are an engineer, you can skip yellow belt, and begin
        with green belt.
      </p>
    ),
  },
  {
    q: "I have a master\u2019s degree, with excellent stats and lots of project management experience. Can I go direct to black belt?",
    a: (
      <p>
        In theory yes, and we do have some delegates who choose this path. We do
        not recommend skipping green belt, because as a black belt you will need
        to manage a team of green belt practitioners, and if you have never been
        through the process of understanding and experiencing green belt, you
        will possibly be ill-equipped for the task. If however, you insist, we
        will permit it at your own risk.
      </p>
    ),
  },
  {
    q: "Who should sign up for Six Sigma?",
    a: (
      <p>
        Six Sigma Certification can be applied to many aspects of business, and
        therefore can benefit almost all companies. By signing up your employees,
        Six Sigma can drastically improve your organization, and at the same time
        help your employees climb the corporate ladder. Six Sigma has become the
        flagship method for separating your organization from its competition.
      </p>
    ),
  },
  {
    q: "Why Six Sigma?",
    a: (
      <p>
        Six Sigma is a highly disciplined approach that allows us to focus on
        creating and delivering nearly perfect products and services. The
        underlying idea being that if you can measure how many &ldquo;defects&rdquo; you
        have in a process, you can systematically figure out a way to eliminate
        them and get as close to &ldquo;zero defects&rdquo; as possible. This concept is
        the motivating factor why employers today are increasingly searching for
        candidates with this type of certification.
      </p>
    ),
  },
  {
    q: "What is the difference between Virtual and Online training?",
    a: (
      <>
        <p>
          We classify &ldquo;Online&rdquo; training as self-study, self-paced eLearning
          over the internet. This is where you can study your course anywhere,
          any time by using the internet. Your course comprises pre-recorded
          video lectures, quizzes and tests.
        </p>
        <p>
          We classify &ldquo;Virtual&rdquo; training as live instructor-led training that
          takes place on specific, scheduled dates. You need to login to MS
          Teams (we will send you the link), to join the class, during class
          times. Although you are learning via the internet, you can ask
          questions of the lecturer, and you can interact with classmates.
        </p>
      </>
    ),
  },
  {
    q: "What is the difference between Lean and DMAIC?",
    a: (
      <>
        <p>
          Lean uses tools and techniques to improve efficiency. Major
          improvements can be achieved by working on the value provided to
          customers. DMAIC focuses on reducing variation by finding and fixing
          the root cause. This improves effectiveness and focuses on doing things
          right the first time.
        </p>
        <p>
          Both Lean Six Sigma and DMAIC Six Sigma use the same DMAIC framework
          for solving complex process issues. The primary focus areas are
          different though. Lean Six Sigma focus on identifying and eliminating
          the sources of waste, and thus improving process flow. Six Sigma focus
          on identifying and eliminating sources of variation and defects, and
          thus improving quality and capability.
        </p>
      </>
    ),
  },
  {
    q: "Is 2KO Africa certification internationally recognised?",
    a: (
      <p>
        2KO Africa is the most recognised certification body for Africa. We are
        the only company that is authorised by MICT SETA in South Africa for six
        sigma certifications. We are a member of CSSC (Council for Six Sigma
        Certification), which is USA based. Typically, however, six sigma
        accreditation is dependent on the black belt trainer who certifies you.
        Our trainers are IASSC and CSSC certified.{" "}
        <a href="/accreditation" className="text-link hover:text-link-hover">
          See here
        </a>
        .
      </p>
    ),
  },
  {
    q: "Why is 2KO not aligned with IASSC?",
    a: (
      <>
        <p>
          We spent many years aligned with IASSC, and recently decided that we
          prefer CSSC. The IASSC Certification is exam based, where industry
          primarily requires experience-based certifications. 2KO Africa students
          actually apply the learning and the 6+ month journey of certification
          is the evidence-based part of the training and certification.
        </p>
        <p>
          If 2KO Africa students want to sit the IASSC exam, they are welcome,
          but it will require extensive preparation as it is a closed book 4-hour
          exam with a strong focus on advanced statistical analysis. It will give
          them an additional certificate, but only evidence of ability to study
          and memorize material, not the ability to apply. 2KO Africa students
          will not be certified by our master trainers, unless they prove
          themselves capable of implementing the stats and tools gained in their
          training, by means of actual evidence-based project, which they can
          prove will have a massive impact on waste reduction and impact on
          bottom line.
        </p>
      </>
    ),
  },
  {
    q: "Is there a brochure which covers all courses and pricing with pre-requisites and course outlines?",
    a: (
      <p>
        Yes there is.{" "}
        <a href="/brochure" className="text-link hover:text-link-hover">
          Click here
        </a>{" "}
        to request the latest course brochure
      </p>
    ),
  },
  {
    q: "What are the prerequisites/do I have to take the \u201cbelts\u201d in order?",
    a: (
      <p>
        You can request our brochure which will give you pre-requisites for each
        course. See Q11. You do not need to start from white belt &ndash; see Q1
        and Q2.
      </p>
    ),
  },
  {
    q: "Do I get a certificate after I complete this course?",
    a: (
      <p>
        When you complete a course of any kind with us, you will receive a
        certificate of completion.
      </p>
    ),
  },
  {
    q: "Are there any hidden costs?",
    a: (
      <p>
        The price you see when we send you a formal quote, is the price which
        includes course, manuals, logistics, and certification. There are no
        additional costs.
      </p>
    ),
  },
  {
    q: "I work full time and cannot take time off for courses. Can I study after hours?",
    a: (
      <p>
        The only type of course which accommodates any time learning are our
        &ldquo;online&rdquo; courses &ndash; see Q7. We would however schedule weekend or
        after-hours courses for groups.
      </p>
    ),
  },
  {
    q: "How long will it take me to complete the course?",
    a: (
      <>
        <p>
          Virtual courses and Instructor led courses have the same duration.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Yellow belt courses (virtual and instructor led) are 2 days full time</li>
          <li>Green belt courses (virtual and instructor led) are 5 days full time</li>
          <li>Black belt courses (virtual and instructor led) are 10 days full time (2 non-consecutive weeks)</li>
        </ul>
        <p>Online self-study courses have the following duration</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>White belt &ndash; 30 days access</li>
          <li>Yellow belt &ndash; 90 days access</li>
          <li>Green belt &ndash; 1 year access</li>
          <li>Black belt &ndash; 1 year access</li>
        </ul>
      </>
    ),
  },
  {
    q: "What is the difference between SigmaXL and Minitab for online green and black belt courses?",
    a: (
      <p>
        All six sigma courses contain sections on stats. To do these stats, you
        will need statistical software. SigmaXL and Minitab are the two
        different types of statistical software packages that the online courses
        use.
      </p>
    ),
  },
  {
    q: "Is the software included in your online course fee? Or do I need to purchase the statistical software?",
    a: (
      <p>
        If you choose for an online course with SigmaXL, we include a perpetual
        license for SigmaXL with your course purchase. If you choose a course
        with Minitab, you will get a 30-day free trial for Minitab software.
        Thereafter you will need to purchase the software yourself. An annual
        Minitab license for an individual costs around R25,000. We do not
        include the cost of Minitab software in the online minitab course, but
        this is made clear in our quotes and invoices.
      </p>
    ),
  },
  {
    q: "How long do I have to complete a project for green or black belt?",
    a: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Green belt students are given 3 months to submit their project.</li>
        <li>Black belt students are given 6 months to submit their project.</li>
      </ul>
    ),
  },
  {
    q: "What happens if I run out of time to complete my project?",
    a: (
      <p>
        If you run out of time, and need additional time, you may contact our
        staff who will request an extension for you from the instructor. This is
        usually given for a few weeks, when requested. A subsequent extension
        will require some direct correspondence with the instructor before
        given.
      </p>
    ),
  },
  {
    q: "What happens if I run out of time to complete my online course?",
    a: (
      <p>
        If you run out of time, and need additional time, you will need to
        purchase an extension. Extensions can be 3 months or 6 months.
      </p>
    ),
  },
  {
    q: "Can I pay off my course in instalments?",
    a: (
      <p>
        We have payment terms for individuals who are funding their own courses.
        To qualify, the invoice will need to be made in your personal name. You
        may request payment terms from any of our staff. We allow all courses to
        be paid off in 3 or 6 months usually, but we are flexible and will try
        to accommodate students where possible.
      </p>
    ),
  },
  {
    q: "Do you offer free courses?",
    a: (
      <p>
        Yes, follow the link by clicking{" "}
        <a
          href="/courses/online-white-belt"
          className="text-link hover:text-link-hover"
        >
          here
        </a>{" "}
        to our free white belt course, found on this page
      </p>
    ),
  },
  {
    q: "Do I require to do Green Belt in order to do Black Belt?",
    a: (
      <p>
        We judge each delegate on their own experience before deciding about
        whether they should attend green belt before the black belt or go
        straight to black belt. In rare cases where there has been vast
        pre-requisite experience in the project and engineering field, we will
        enrol a student directly on Black belt. Usually, a student is required
        to attend green belt before the black belt. No specific six sigma
        experience is required before enrolling for green belt, if a delegate
        has stats and project management experience.
      </p>
    ),
  },
  {
    q: "Do I have to take an exam with six sigma courses?",
    a: (
      <p>
        No exam is necessary for a course completion certificate. Simply
        completing the course whether online, virtual, or face-to-face,
        qualifies you for a course completion certificate. To obtain
        certification, you will need to take an exam.
      </p>
    ),
  },
  {
    q: "Where can I see your course schedule?",
    a: (
      <p>
        Our course schedule is available on our website for all our instructor
        led and virtual training courses. See link:{" "}
        <a href="/schedule" className="text-link hover:text-link-hover">
          https://sixsigmasouthafrica.co.za/google-calendar
        </a>
      </p>
    ),
  },
];
/* eslint-enable react/jsx-key */

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

      {/* ───── Two-Office Contact Blocks with Maps ───── */}
      <FadeIn>
        <section className="section">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* South Africa */}
              <div className="bg-light-grey rounded-xl overflow-hidden">
                <div className="p-8">
                  <h2 className="text-heading text-[24px] md:text-[28px] font-bold mb-4">
                    Contact Six Sigma South Africa
                  </h2>
                  <p className="text-body text-[16px] leading-relaxed mb-6">
                    Questions, inquiries, or concerns? We train mostly in Joburg
                    and Tshwane, but also nationally and internationally. Fill
                    out the contact form below.
                  </p>

                  <a
                    href="#enquiry-form"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-green text-inverse font-semibold rounded-lg hover:brightness-110 transition mb-6 text-[16px]"
                  >
                    Enquire Now
                  </a>

                  <p className="text-[13px] text-muted font-semibold uppercase tracking-wider mb-4">
                    General Inquiries
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href="tel:+27215270065" className="text-body text-[17px] hover:text-link transition-colors">
                        +27 21 527 0065
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:info@sixsigmasouthafrica.co.za" className="text-body text-[17px] hover:text-link transition-colors break-all">
                        info@sixsigmasouthafrica.co.za
                      </a>
                    </div>
                  </div>
                </div>

                {/* SA Map */}
                <div className="w-full h-[240px] bg-border-grey">
                  <iframe
                    src="https://maps.google.com/maps?q=The+Colosseum,+Century+Way,+Century+City,+Cape+Town,+7441&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Six Sigma South Africa Office — The Colosseum, Century Way, Century City, Cape Town 7441"
                  />
                </div>
                <div className="px-8 py-4 border-t border-border-grey">
                  <p className="text-[14px] text-muted leading-relaxed">
                    2KO Africa / Six Sigma South Africa<br />
                    1st Floor, Foyer 3, The Colosseum<br />
                    Century Way, Century City<br />
                    Cape Town, 7441
                  </p>
                </div>
              </div>

              {/* United Kingdom */}
              <div className="bg-light-grey rounded-xl overflow-hidden">
                <div className="p-8">
                  <h2 className="text-heading text-[24px] md:text-[28px] font-bold mb-4">
                    Contact Six Sigma United Kingdom
                  </h2>
                  <p className="text-body text-[16px] leading-relaxed mb-6">
                    Use this form to enquire about training in the United
                    Kingdom, or Europe. Fill out the contact form below.
                  </p>

                  <a
                    href="#enquiry-form"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-green text-inverse font-semibold rounded-lg hover:brightness-110 transition mb-6 text-[16px]"
                  >
                    Enquire Now
                  </a>

                  <p className="text-[13px] text-muted font-semibold uppercase tracking-wider mb-4">
                    General Inquiries
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href="tel:+27215270065" className="text-body text-[17px] hover:text-link transition-colors">
                        +27 21 527 0065
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:info@sixsigmauk.com" className="text-body text-[17px] hover:text-link transition-colors">
                        info@sixsigmauk.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* UK Map */}
                <div className="w-full h-[240px] bg-border-grey">
                  <iframe
                    src="https://maps.google.com/maps?q=51.5265,-0.0983+(Six+Sigma+UK,+London+EC1V+2PD)&z=16&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Six Sigma United Kingdom Office — London EC1V 2PD"
                  />
                </div>
                <div className="px-8 py-4 border-t border-border-grey">
                  <p className="text-[14px] text-muted leading-relaxed">
                    London<br />
                    EC1V 2PD
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ───── Enquiry Form ───── */}
      <FadeIn>
        <section id="enquiry-form" className="section bg-light-grey scroll-mt-[80px]">
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
        <section id="faqs" className="section bg-light-grey scroll-mt-[80px]">
          <div className="container">
            <h2 className="text-heading text-[28px] md:text-[34px] font-bold text-center mb-10">
              FAQ&rsquo;s
            </h2>

            <div className="max-w-6xl mx-auto">
              <FaqAccordion items={faqItems} />
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
