export interface CourseDetail {
  slug: string;
  legacySlug: string;
  title: string;
  shortTitle: string;
  topic: "5s" | "Kaizen";
  mode: "Classroom" | "Virtual" | "Online";
  image: string;
  description: string;
  duration: string;
  summary: string;
  outline: string[];
}

export const courses: CourseDetail[] = [
  {
    slug: "5s-classroom",
    legacySlug: "six-sigma-classroom-5s-course-in-south-africa",
    title: "5S Classroom Course in South Africa",
    shortTitle: "5S · Classroom",
    topic: "5s",
    mode: "Classroom",
    image: "/images/courses/Classroom-1.jpg",
    description:
      "Instructor-led 5S workplace organisation training delivered at our venues in Johannesburg, Cape Town, Durban, Pretoria and Port Elizabeth. Ideal for operations teams driving continuous improvement.",
    duration: "1 day",
    summary:
      "5S is a foundational Lean methodology for organising the workplace so that work can be performed efficiently, effectively and safely. In this classroom course you will learn the five pillars — Sort, Set in Order, Shine, Standardise and Sustain — and how to apply them on the shop floor or in the office.",
    outline: [
      "Introduction to Lean and the 5S philosophy",
      "Sort (Seiri) — identifying and removing what is not needed",
      "Set in Order (Seiton) — organising remaining items for easy use",
      "Shine (Seiso) — cleaning and inspecting the workplace",
      "Standardise (Seiketsu) — creating the rules that sustain the first three",
      "Sustain (Shitsuke) — building habits that keep 5S alive",
      "Auditing and measuring a 5S programme",
    ],
  },
  {
    slug: "5s-virtual",
    legacySlug: "six-sigma-virtual-5s-course-in-south-africa",
    title: "5S Virtual Course in South Africa",
    shortTitle: "5S · Virtual",
    topic: "5s",
    mode: "Virtual",
    image: "/images/courses/Virtual-1.jpg",
    description:
      "Live instructor-led 5S training delivered virtually across South Africa. Interactive sessions with real-time Q&A and workplace exercises you can apply immediately.",
    duration: "1 day (live online)",
    summary:
      "Our virtual 5S course delivers the same expert instruction as our classroom training in a live online format. You will work through practical examples with your facilitator and peers and leave with a clear plan to launch 5S in your own workplace.",
    outline: [
      "5S fundamentals and Lean context",
      "Walking through each of the five pillars",
      "Live case studies and group discussion",
      "Practical tools for implementation",
      "Measuring progress and sustaining gains",
    ],
  },
  {
    slug: "5s-online",
    legacySlug: "six-sigma-online-5s-course-in-south-africa",
    title: "5S Online Course in South Africa",
    shortTitle: "5S · Online",
    topic: "5s",
    mode: "Online",
    image: "/images/courses/Online-1.jpg",
    description:
      "Self-paced 5S online course. Learn the principles of workplace organisation on your schedule, from anywhere in South Africa.",
    duration: "Self-paced (approx 4 hours)",
    summary:
      "Our self-paced 5S online course gives you full flexibility. Video lessons, downloadable resources and knowledge checks let you build your understanding at your own pace and earn a certificate on completion.",
    outline: [
      "The origins and benefits of 5S",
      "Detailed walkthrough of each of the five pillars",
      "Worked examples and downloadable templates",
      "End-of-module quizzes",
      "Final assessment and certificate",
    ],
  },
  {
    slug: "kaizen-classroom",
    legacySlug: "six-sigma-classroom-kaizen-course-in-south-africa",
    title: "Kaizen Classroom Course in South Africa",
    shortTitle: "Kaizen · Classroom",
    topic: "Kaizen",
    mode: "Classroom",
    image: "/images/courses/Classroom-2.jpg",
    description:
      "In-person Kaizen continuous improvement training. Learn how to run a Kaizen event and embed a culture of incremental improvement in your organisation.",
    duration: "1 day",
    summary:
      "Kaizen is the Japanese philosophy of continuous improvement through small, incremental changes. Our classroom course teaches you how to plan, run and sustain a Kaizen event, and how to build a workplace culture where every team member contributes ideas.",
    outline: [
      "The Kaizen philosophy and its roots in Lean",
      "Types of Kaizen — daily, event-based and breakthrough",
      "Running a Kaizen event step by step",
      "Root cause analysis tools",
      "Standard work and visual management",
      "Sustaining improvements and measuring impact",
    ],
  },
  {
    slug: "kaizen-virtual",
    legacySlug: "six-sigma-virtual-kaizen-course-in-south-africa",
    title: "Kaizen Virtual Course in South Africa",
    shortTitle: "Kaizen · Virtual",
    topic: "Kaizen",
    mode: "Virtual",
    image: "/images/courses/Virtual-2.jpg",
    description:
      "Live instructor-led Kaizen training delivered virtually. Interactive, practical and tailored to your workplace.",
    duration: "1 day (live online)",
    summary:
      "The virtual Kaizen course combines expert instruction with live discussion and exercises. You will walk away with a Kaizen toolkit and a draft plan for your first improvement event.",
    outline: [
      "Kaizen fundamentals and the PDCA cycle",
      "Facilitating a Kaizen event remotely",
      "Root cause techniques — 5 Whys, fishbone",
      "Live case studies and breakout rooms",
      "Action planning for your workplace",
    ],
  },
  {
    slug: "kaizen-online",
    legacySlug: "six-sigma-online-kaizen-course-in-south-africa",
    title: "Kaizen Online Course in South Africa",
    shortTitle: "Kaizen · Online",
    topic: "Kaizen",
    mode: "Online",
    image: "/images/courses/Online-2.jpg",
    description:
      "Self-paced Kaizen online course. Build your continuous improvement skills on your schedule.",
    duration: "Self-paced (approx 4 hours)",
    summary:
      "Our self-paced Kaizen course is perfect for busy professionals. Learn the theory and practice of continuous improvement through video modules, worked examples and downloadable templates.",
    outline: [
      "Introduction to Kaizen and Lean thinking",
      "How to identify improvement opportunities",
      "Running small Kaizen events in your team",
      "Root cause analysis tools",
      "Assessment and certificate of completion",
    ],
  },
];

export function getCourse(slug: string): CourseDetail | undefined {
  return courses.find((c) => c.slug === slug);
}
