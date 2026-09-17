export interface CourseDetail {
  slug: string;
  title: string;
  shortTitle: string;
  topic: string;
  topicSlug: string;
  mode: "Classroom" | "Virtual" | "Online";
  modeSlug: "classroom" | "virtual" | "online";
  image: string;
  description: string;
  duration: string;
  summary: string;
  outline: string[];
  /** Schema.org `educationalCredentialAwarded`. */
  credentialAwarded: string;
  /** Schema.org `coursePrerequisites`. Empty string for no prerequisites. */
  prerequisites: string;
  /** Schema.org `educationalLevel`. */
  level: "Beginner" | "Intermediate" | "Advanced";
}

interface TopicSpec {
  slug: string;
  name: string;
  summary: string;
  outline: string[];
  duration: { classroom: string; virtual: string; online: string };
  credentialAwarded: string;
  prerequisites: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

const topics: TopicSpec[] = [
  {
    slug: "5s",
    name: "5S",
    summary:
      "5S is a foundational Lean methodology for organising the workplace so that work can be performed efficiently, effectively and safely. You will learn the five pillars — Sort, Set in Order, Shine, Standardise and Sustain — and how to apply them on the shop floor or in the office.",
    outline: [
      "Introduction to Lean and the 5S philosophy",
      "Sort (Seiri) — identifying and removing what is not needed",
      "Set in Order (Seiton) — organising remaining items for easy use",
      "Shine (Seiso) — cleaning and inspecting the workplace",
      "Standardise (Seiketsu) — the rules that sustain the first three",
      "Sustain (Shitsuke) — habits that keep 5S alive",
      "Auditing and measuring a 5S programme",
    ],
    duration: { classroom: "1 day", virtual: "1 day (live online)", online: "Self-paced (approx 4 hours)" },
    credentialAwarded:
      "5S Foundations certificate issued by Six Sigma South Africa",
    prerequisites: "",
    level: "Beginner",
  },
  {
    slug: "kaizen",
    name: "Kaizen",
    summary:
      "Kaizen is the Japanese philosophy of continuous improvement through small, incremental changes. You will learn how to plan, run and sustain a Kaizen event and how to build a workplace culture where every team member contributes improvement ideas.",
    outline: [
      "The Kaizen philosophy and its Lean roots",
      "Types of Kaizen — daily, event-based and breakthrough",
      "Running a Kaizen event step by step",
      "Root cause analysis tools (5 Whys, fishbone)",
      "Standard work and visual management",
      "Sustaining improvements and measuring impact",
    ],
    duration: { classroom: "1 day", virtual: "1 day (live online)", online: "Self-paced (approx 4 hours)" },
    credentialAwarded:
      "Kaizen Practitioner certificate issued by Six Sigma South Africa",
    prerequisites: "",
    level: "Beginner",
  },
  {
    slug: "white-belt",
    name: "White Belt",
    summary:
      "The Six Sigma White Belt is your entry point into Lean Six Sigma. You will build a solid understanding of the language, concepts and history of Six Sigma, and learn how process improvement benefits any business.",
    outline: [
      "Introduction to Six Sigma and Lean",
      "Key concepts and vocabulary",
      "The DMAIC improvement cycle at a high level",
      "How Six Sigma fits into a business",
      "Roles on a Six Sigma team",
      "Next steps in your Six Sigma journey",
    ],
    duration: { classroom: "Half day", virtual: "Half day (live online)", online: "Self-paced (approx 2 hours)" },
    credentialAwarded:
      "Six Sigma White Belt certificate accredited by the Council for Six Sigma Certification (CSSC, USA)",
    prerequisites: "",
    level: "Beginner",
  },
  {
    slug: "yellow-belt",
    name: "Yellow Belt",
    summary:
      "Yellow Belt is the foundational Six Sigma qualification for team members who will participate in improvement projects. You will leave with a working knowledge of DMAIC and the most commonly used Six Sigma tools.",
    outline: [
      "Six Sigma history, principles and benefits",
      "The DMAIC methodology in depth",
      "Process mapping and value stream mapping",
      "Basic statistics for Six Sigma",
      "Root cause analysis tools",
      "Supporting a Green or Black Belt project",
    ],
    duration: { classroom: "2 days", virtual: "2 days (live online)", online: "Self-paced (approx 10 hours)" },
    credentialAwarded:
      "Six Sigma Yellow Belt certificate accredited by the Council for Six Sigma Certification (CSSC, USA)",
    prerequisites:
      "None — White Belt awareness recommended but not required.",
    level: "Beginner",
  },
  {
    slug: "core-green-belt",
    name: "Core Green Belt",
    summary:
      "Core Green Belt is our full Green Belt curriculum — the gold-standard qualification for professionals who will lead small to medium improvement projects. You will gain the statistical, analytical and leadership tools to run a DMAIC project end to end.",
    outline: [
      "Define — project charters, voice of customer, SIPOC",
      "Measure — data collection, MSA, process capability",
      "Analyse — hypothesis testing, regression, root cause",
      "Improve — solution generation and selection, piloting",
      "Control — control plans, SPC, project handover",
      "Leading an improvement project",
    ],
    duration: { classroom: "5 days", virtual: "5 days (live online)", online: "Self-paced (approx 40 hours)" },
    credentialAwarded:
      "Six Sigma Green Belt (Core) certificate accredited by the Council for Six Sigma Certification (CSSC, USA)",
    prerequisites:
      "Yellow Belt or equivalent working knowledge of Six Sigma recommended.",
    level: "Intermediate",
  },
  {
    slug: "dmaic-green-belt",
    name: "DMAIC Green Belt",
    summary:
      "The DMAIC Green Belt focuses on the classic Six Sigma problem-solving methodology. You will apply Define, Measure, Analyse, Improve and Control to real-world process problems and leave ready to lead your first improvement project.",
    outline: [
      "The DMAIC roadmap",
      "Define phase — charter, stakeholders, scope",
      "Measure phase — metrics and baseline",
      "Analyse phase — finding the true root cause",
      "Improve phase — designing and piloting solutions",
      "Control phase — sustaining the gains",
    ],
    duration: { classroom: "5 days", virtual: "5 days (live online)", online: "Self-paced (approx 40 hours)" },
    credentialAwarded:
      "Six Sigma Green Belt (DMAIC) certificate accredited by the Council for Six Sigma Certification (CSSC, USA)",
    prerequisites:
      "Yellow Belt or equivalent working knowledge of Six Sigma recommended.",
    level: "Intermediate",
  },
  {
    slug: "lean-green-belt",
    name: "Lean Green Belt",
    summary:
      "Lean Green Belt blends Lean thinking with Six Sigma rigour. You will learn to identify and remove waste, streamline flow, and use the Lean toolkit to deliver measurable improvement.",
    outline: [
      "Lean principles and the 8 wastes",
      "Value stream mapping",
      "Pull systems and kanban",
      "5S, visual management and standard work",
      "Kaizen events in a Lean programme",
      "Combining Lean with DMAIC",
    ],
    duration: { classroom: "5 days", virtual: "5 days (live online)", online: "Self-paced (approx 40 hours)" },
    credentialAwarded:
      "Lean Six Sigma Green Belt certificate accredited by the Council for Six Sigma Certification (CSSC, USA)",
    prerequisites:
      "Yellow Belt or equivalent working knowledge of Lean / Six Sigma recommended.",
    level: "Intermediate",
  },
  {
    slug: "dmaic-black-belt",
    name: "DMAIC Black Belt",
    summary:
      "The DMAIC Black Belt is the advanced Six Sigma qualification for professionals who will lead large, cross-functional improvement initiatives. It builds on Green Belt with deeper statistical tools and leadership content.",
    outline: [
      "Advanced DMAIC methodology",
      "Advanced statistics — ANOVA, DOE, multiple regression",
      "Minitab / statistical software for Black Belts",
      "Managing large-scale improvement projects",
      "Change management and stakeholder leadership",
      "Coaching Green Belts",
    ],
    duration: { classroom: "10 days", virtual: "10 days (live online)", online: "Self-paced (approx 80 hours)" },
    credentialAwarded:
      "Six Sigma Black Belt (DMAIC) certificate accredited by the Council for Six Sigma Certification (CSSC, USA)",
    prerequisites:
      "Green Belt or equivalent demonstrable Six Sigma project experience.",
    level: "Advanced",
  },
  {
    slug: "lean-black-belt",
    name: "Lean Black Belt",
    summary:
      "Lean Black Belt prepares senior Lean practitioners to lead enterprise-wide transformation programmes. You will master advanced Lean tools and the leadership skills to embed a continuous improvement culture.",
    outline: [
      "Lean strategy and policy deployment (Hoshin Kanri)",
      "Value stream transformation",
      "Advanced kaizen and A3 problem solving",
      "Building a Lean management system",
      "Coaching and developing Lean talent",
      "Sustaining Lean at scale",
    ],
    duration: { classroom: "10 days", virtual: "10 days (live online)", online: "Self-paced (approx 80 hours)" },
    credentialAwarded:
      "Lean Six Sigma Black Belt certificate accredited by the Council for Six Sigma Certification (CSSC, USA)",
    prerequisites:
      "Green Belt or equivalent demonstrable Lean / Six Sigma experience.",
    level: "Advanced",
  },
  {
    slug: "root-cause-analysis",
    name: "Root Cause Analysis",
    summary:
      "A focused short course on finding and fixing the true root cause of a problem. You will learn the most widely used RCA tools and leave able to run a structured investigation in your own workplace.",
    outline: [
      "What is root cause analysis?",
      "The 5 Whys technique",
      "Fishbone (Ishikawa) diagrams",
      "Fault tree analysis",
      "Pareto analysis",
      "Running an RCA investigation end to end",
    ],
    duration: { classroom: "1 day", virtual: "1 day (live online)", online: "Self-paced (approx 4 hours)" },
    credentialAwarded:
      "Root Cause Analysis Practitioner certificate issued by Six Sigma South Africa",
    prerequisites: "",
    level: "Beginner",
  },
];

const modeDetails = [
  {
    slug: "classroom" as const,
    name: "Classroom" as const,
    deliveryBlurb:
      "Instructor-led training delivered at our venues in Johannesburg, Cape Town, Durban, Pretoria and Port Elizabeth — or on-site at your workplace anywhere in South Africa.",
  },
  {
    slug: "virtual" as const,
    name: "Virtual" as const,
    deliveryBlurb:
      "Live instructor-led training delivered virtually across South Africa. Interactive sessions with real-time Q&A and practical exercises you can apply immediately.",
  },
  {
    slug: "online" as const,
    name: "Online" as const,
    deliveryBlurb:
      "Self-paced online training with video lessons, downloadable resources and knowledge checks. Study on your schedule, from anywhere in South Africa.",
  },
];

// Image pools per mode (cycled so every course gets a relevant image)
const imagePools = {
  classroom: [
    "/images/courses/Classroom-1.jpg",
    "/images/courses/Classroom-2.jpg",
    "/images/courses/Classroom-3.jpg",
    "/images/courses/Classroom-4.jpg",
    "/images/courses/Classroom-5.jpg",
  ],
  virtual: [
    "/images/courses/Virtual-1.jpg",
    "/images/courses/Virtual-2.jpg",
    "/images/courses/Virtual-3.jpg",
    "/images/courses/Virtual-4.jpg",
    "/images/courses/Virtual-5.jpg",
  ],
  online: [
    "/images/courses/Online-1.jpg",
    "/images/courses/Online-2.jpg",
    "/images/courses/Online-3.jpg",
    "/images/courses/Online-4.jpg",
    "/images/courses/Online-5.jpg",
    "/images/courses/Online-6.jpg",
  ],
};

export const courses: CourseDetail[] = topics.flatMap((topic, tIdx) =>
  modeDetails.map((mode) => {
    const pool = imagePools[mode.slug];
    const image = pool[tIdx % pool.length];
    const fullTitle = `${topic.name} ${mode.name} Course in South Africa`;
    return {
      slug: `${topic.slug}-${mode.slug}`,
      title: fullTitle,
      shortTitle: `${topic.name} · ${mode.name}`,
      topic: topic.name,
      topicSlug: topic.slug,
      mode: mode.name,
      modeSlug: mode.slug,
      image,
      description: `${mode.deliveryBlurb} Master ${topic.name} and earn an internationally accredited Six Sigma certification from the Council for Six Sigma Certification (CSSC).`,
      duration: topic.duration[mode.slug],
      summary: topic.summary,
      outline: topic.outline,
      credentialAwarded: topic.credentialAwarded,
      prerequisites: topic.prerequisites,
      level: topic.level,
    };
  })
);

export function getCourse(slug: string): CourseDetail | undefined {
  return courses.find((c) => c.slug === slug);
}

export const TOPIC_SLUGS = topics.map((t) => t.slug);
export const MODE_SLUGS = ["classroom", "virtual", "online"] as const;
export const MODES = modeDetails.map((m) => ({ slug: m.slug, name: m.name }));

/**
 * Sigmafy Statistics access bundled with a course.
 *
 * Green Belt delegates get twelve months, Black Belt twenty-four. At the
 * product's list price of $50 per person per month that is $600 and $1,200 of
 * software included in the course fee — and until 2026-09-17 no page selling
 * these belts mentioned it at all.
 *
 * Keyed off the topic slug rather than a per-course flag so a new delivery
 * mode of an existing belt inherits it automatically and cannot be forgotten.
 */
export type ToolsBundle = {
  months: number;
  /** List price of the same access, bought separately. */
  worthUsd: number;
  /** Thousands-separated, so it reads as money rather than a part number. */
  worthLabel: string;
};

const TOOLS_MONTHLY_USD = 50;

export function toolsBundleFor(slug: string): ToolsBundle | null {
  const bundle = (months: number): ToolsBundle => {
    const worthUsd = months * TOOLS_MONTHLY_USD;
    return { months, worthUsd, // en-US, not en-ZA: this is a dollar figure, and en-ZA separates
    // thousands with a space — "$1 200" reads like a typo.
    worthLabel: worthUsd.toLocaleString("en-US") };
  };
  if (/black-belt/.test(slug)) return bundle(24);
  if (/green-belt/.test(slug)) return bundle(12);
  return null;
}
