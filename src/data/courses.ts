export type Mode = "Online" | "Virtual" | "Classroom";
export type BeltLevel = "white" | "yellow" | "green" | "black" | "short";

export interface CourseData {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  includes: string[];
  mode: Mode;
  beltLevel: BeltLevel;
  imageSrc: string;
  isFree?: boolean;
  stripColor?: "green" | "yellow";
  buttonLabel?: string;
  price: string;
  duration: string;
}

// ─── Online Courses ─────────────────────────────────────────────

const onlineCourses: CourseData[] = [
  {
    slug: "online-white-belt",
    title: "Six Sigma White Belt training in South Africa",
    shortTitle: "White Belt",
    description:
      "Self-paced course introducing Six Sigma basics. Ideal for understanding fundamental concepts and improving workplace efficiency. No prior experience required.",
    includes: ["6 hours of content", "No Exam", "No Project"],
    mode: "Online",
    beltLevel: "white",
    imageSrc: "/images/courses/Online-1.jpg",
    isFree: true,
    stripColor: "yellow",
    buttonLabel: "Learn More",
    price: "Free",
    duration: "6 hours of content",
  },
  {
    slug: "online-yellow-belt",
    title: "Six Sigma Yellow Belt training in South Africa",
    shortTitle: "Yellow Belt",
    description:
      "Course focusing on basic project management within Six Sigma. Excellent for team members seeking to support and participate in improvement projects.",
    includes: ["14 hours of content", "1 x 90-minute Exam", "No Project"],
    mode: "Online",
    beltLevel: "yellow",
    imageSrc: "/images/courses/Online-2.jpg",
    buttonLabel: "Learn More",
    price: "From R4,998",
    duration: "14 hours of content",
  },
  {
    slug: "online-lean-green-belt",
    title: "Six Sigma LEAN Green Belt training in South Africa",
    shortTitle: "LEAN Green Belt",
    description:
      "Comprehensive course introducing Lean principles and tools. Learn to eliminate waste and improve efficiency in your organisation's processes. Suitable for aspiring Lean practitioners.",
    includes: [
      "35 hours of content",
      "1 x 90-minute Exam",
      "3 Months to write a project",
    ],
    mode: "Online",
    beltLevel: "green",
    imageSrc: "/images/courses/Online-3.jpg",
    buttonLabel: "Learn More",
    price: "From R16,995",
    duration: "35 hours of content",
  },
  {
    slug: "online-dmaic-green-belt",
    title: "Six Sigma DMAIC Green Belt training in South Africa",
    shortTitle: "DMAIC Green Belt",
    description:
      "In-depth online course teaching DMAIC (Define, Measure, Analyze, Improve, Control) process. Ideal for professionals seeking to implement this structured problem-solving methodology in their projects.",
    includes: [
      "35 hours of content",
      "1 x 90-minute Exam",
      "3 Months to write a project",
    ],
    mode: "Online",
    beltLevel: "green",
    imageSrc: "/images/courses/Online-4.jpg",
    buttonLabel: "Learn More",
    price: "From R16,995",
    duration: "35 hours of content",
  },
  {
    slug: "online-lean-black-belt",
    title: "Six Sigma LEAN Black Belt training in South Africa",
    shortTitle: "LEAN Black Belt",
    description:
      "Advanced course providing mastery in Lean methodologies. Learn to lead and drive Lean transformations in large-scale projects. Perfect for professionals desiring Lean leadership roles.",
    includes: [
      "70 hours of content",
      "2 x 90-minute Exams",
      "6 Months to write a project",
    ],
    mode: "Online",
    beltLevel: "black",
    imageSrc: "/images/courses/Online-5.jpg",
    buttonLabel: "Learn More",
    price: "From R26,000",
    duration: "70 hours of content",
  },
  {
    slug: "online-dmaic-black-belt",
    title: "Six Sigma DMAIC Black Belt training in South Africa",
    shortTitle: "DMAIC Black Belt",
    description:
      "Expert-level online course in DMAIC, focusing on deep statistical analysis and strategic project leadership. Ideal for leaders seeking to drive process improvement using DMAIC.",
    includes: [
      "70 hours of content",
      "2 x 90-minute Exams",
      "6 Months to write a project",
    ],
    mode: "Online",
    beltLevel: "black",
    imageSrc: "/images/courses/Online-6.jpg",
    buttonLabel: "Learn More",
    price: "From R26,000",
    duration: "70 hours of content",
  },
];

// ─── Virtual Courses ────────────────────────────────────────────

const virtualCourses: CourseData[] = [
  {
    slug: "virtual-root-cause-analysis",
    title: "Six Sigma Root Cause Analysis training in South Africa",
    shortTitle: "Root Cause Analysis",
    description:
      "Interactive course focusing on identifying and understanding the primary cause of a problem or issue. Ideal for problem-solvers and process improvers.",
    includes: ["2 Days", "No Exam", "No Project"],
    mode: "Virtual",
    beltLevel: "short",
    imageSrc: "/images/courses/Virtual-1.jpg",
    buttonLabel: "Learn More",
    price: "R6,995",
    duration: "2 Days",
  },
  {
    slug: "virtual-yellow-belt",
    title: "Six Sigma Yellow Belt training in South Africa",
    shortTitle: "Yellow Belt",
    description:
      "Course teaching project participation and process management skills. Ideal for professionals seeking to optimize team performance.",
    includes: ["2 Days", "1 x 90-minute Exam", "No Project"],
    mode: "Virtual",
    beltLevel: "yellow",
    imageSrc: "/images/courses/Virtual-2.jpg",
    buttonLabel: "Learn More",
    price: "From R4,998",
    duration: "2 Days",
  },
  {
    slug: "virtual-lean-green-belt",
    title: "Six Sigma LEAN Green Belt training in South Africa",
    shortTitle: "LEAN Green Belt",
    description:
      "Interactive course focusing on Lean principles and tools. Learn to streamline processes and eliminate waste in your organisation. Ideal for professionals seeking hands-on Lean training.",
    includes: [
      "5 Days",
      "1 x 90-minute Exam",
      "3 Months to write a project",
    ],
    mode: "Virtual",
    beltLevel: "green",
    imageSrc: "/images/courses/Virtual-3.jpg",
    buttonLabel: "Learn More",
    price: "From R16,995",
    duration: "5 Days",
  },
  {
    slug: "virtual-dmaic-green-belt",
    title: "Six Sigma DMAIC Green Belt training in South Africa",
    shortTitle: "DMAIC Green Belt",
    description:
      "Comprehensive virtual course on DMAIC process. Ideal for professionals seeking to effectively define, measure, analyze, improve, and control their business processes.",
    includes: [
      "5 Days",
      "1 x 90-minute Exam",
      "3 Months to write a project",
    ],
    mode: "Virtual",
    beltLevel: "green",
    imageSrc: "/images/courses/Virtual-4.jpg",
    buttonLabel: "Learn More",
    price: "From R16,995",
    duration: "5 Days",
  },
  {
    slug: "virtual-lean-black-belt",
    title: "Six Sigma LEAN Black Belt training in South Africa",
    shortTitle: "LEAN Black Belt",
    description:
      "Advanced virtual training in Lean methodologies. Learn to lead Lean transformations and enhance organisational efficiency. Perfect for professionals aspiring to Lean leadership roles.",
    includes: [
      "10 Days",
      "2 x 90-minute Exams",
      "6 Months to write a project",
    ],
    mode: "Virtual",
    beltLevel: "black",
    imageSrc: "/images/courses/Virtual-5.jpg",
    buttonLabel: "Learn More",
    price: "From R26,000",
    duration: "10 Days",
  },
  {
    slug: "virtual-dmaic-black-belt",
    title: "Six Sigma DMAIC Black Belt training in South Africa",
    shortTitle: "DMAIC Black Belt",
    description:
      "Advanced virtual training in DMAIC. Learn to implement this proven problem-solving methodology in large-scale projects, driving process improvement and organisational excellence.",
    includes: [
      "10 Days",
      "2 x 90-minute Exams",
      "6 Months to write a project",
    ],
    mode: "Virtual",
    beltLevel: "black",
    imageSrc: "/images/courses/Virtual-6.jpg",
    buttonLabel: "Learn More",
    price: "From R26,000",
    duration: "10 Days",
  },
];

// ─── Classroom Courses ──────────────────────────────────────────

const classroomCourses: CourseData[] = [
  {
    slug: "classroom-root-cause-analysis",
    title: "Six Sigma Root Cause Analysis training in South Africa",
    shortTitle: "Root Cause Analysis",
    description:
      "In-person, hands-on training on uncovering the primary cause of a problem, using structured problem-solving techniques. Perfect for proactive learners.",
    includes: ["2 Days", "No Exam", "No Project"],
    mode: "Classroom",
    beltLevel: "short",
    imageSrc: "/images/courses/Classroom-1.jpg",
    buttonLabel: "Learn More",
    price: "R6,995",
    duration: "2 Days",
  },
  {
    slug: "classroom-yellow-belt",
    title: "Six Sigma Yellow Belt training in South Africa",
    shortTitle: "Yellow Belt",
    description:
      "Course exploring process improvement, project participation, and Six Sigma tools. Perfect for hands-on learners desiring active project involvement.",
    includes: ["2 Days", "1 x 90-minute Exam", "No Project"],
    mode: "Classroom",
    beltLevel: "yellow",
    imageSrc: "/images/courses/Classroom-2.jpg",
    buttonLabel: "Learn More",
    price: "From R4,998",
    duration: "2 Days",
  },
  {
    slug: "classroom-lean-green-belt",
    title: "Six Sigma Green Belt training in South Africa",
    shortTitle: "LEAN Green Belt",
    description:
      "In-person course on Lean principles and tools. Hands-on training to eliminate waste and improve processes within your organisation. Perfect for active learners desiring Lean expertise.",
    includes: [
      "5 Days",
      "1 x 90-minute Exam",
      "3 Months to write a project",
    ],
    mode: "Classroom",
    beltLevel: "green",
    imageSrc: "/images/courses/Classroom-3.jpg",
    buttonLabel: "Learn More",
    price: "From R16,995",
    duration: "5 Days",
  },
  {
    slug: "classroom-dmaic-green-belt",
    title: "Six Sigma Green Belt training in South Africa",
    shortTitle: "DMAIC Green Belt",
    description:
      "In-person, comprehensive training on DMAIC process. Learn to apply this structured problem-solving methodology in your projects. Ideal for professionals seeking hands-on DMAIC training.",
    includes: [
      "5 Days",
      "1 x 90-minute Exam",
      "3 Months to write a project",
    ],
    mode: "Classroom",
    beltLevel: "green",
    imageSrc: "/images/courses/Classroom-4.jpg",
    buttonLabel: "Learn More",
    price: "From R16,995",
    duration: "5 Days",
  },
  {
    slug: "classroom-lean-black-belt",
    title: "Six Sigma Black Belt training in South Africa",
    shortTitle: "LEAN Black Belt",
    description:
      "Immersive course offering expert-level knowledge in Lean methodologies. Focus on strategic implementation and Lean leadership. Ideal for aspiring Lean transformation leaders.",
    includes: [
      "10 Days",
      "2 x 90-minute Exams",
      "6 Months to write a project",
    ],
    mode: "Classroom",
    beltLevel: "black",
    imageSrc: "/images/courses/Classroom-5.jpg",
    buttonLabel: "Learn More",
    price: "From R26,000",
    duration: "10 Days",
  },
  {
    slug: "classroom-dmaic-black-belt",
    title: "Six Sigma Black Belt training in South Africa",
    shortTitle: "DMAIC Black Belt",
    description:
      "Expert-level classroom course in DMAIC. Focuses on deep statistical analysis and strategic project leadership. Perfect for professionals aiming to drive process improvement using DMAIC.",
    includes: [
      "10 Days",
      "2 x 90-minute Exams",
      "6 Months to write a project",
    ],
    mode: "Classroom",
    beltLevel: "black",
    imageSrc: "/images/courses/Classroom-6.jpg",
    buttonLabel: "Learn More",
    price: "From R26,000",
    duration: "10 Days",
  },
];

// ─── Short Courses (5S & Kaizen) ────────────────────────────────

const shortCourses: CourseData[] = [
  {
    slug: "classroom-5s",
    title: "Six Sigma 5S Classroom Course in South Africa",
    shortTitle: "5S",
    description:
      "Hands-on classroom training in the 5S methodology: Sort, Set in Order, Shine, Standardise, and Sustain. Learn to create organised, efficient workplaces that boost productivity.",
    includes: ["1 Day", "No Exam", "No Project"],
    mode: "Classroom",
    beltLevel: "short",
    imageSrc: "/images/courses/Classroom-1.jpg",
    buttonLabel: "Learn More",
    price: "R6,995",
    duration: "1 Day",
  },
  {
    slug: "virtual-5s",
    title: "Six Sigma 5S Virtual Course in South Africa",
    shortTitle: "5S",
    description:
      "Interactive virtual training in the 5S methodology. Learn to create organised, efficient workplaces through Sort, Set in Order, Shine, Standardise, and Sustain.",
    includes: ["1 Day", "No Exam", "No Project"],
    mode: "Virtual",
    beltLevel: "short",
    imageSrc: "/images/courses/Virtual-1.jpg",
    buttonLabel: "Learn More",
    price: "R6,995",
    duration: "1 Day",
  },
  {
    slug: "online-5s",
    title: "Six Sigma 5S Online Course in South Africa",
    shortTitle: "5S",
    description:
      "Self-paced online training in the 5S methodology. Learn the principles of Sort, Set in Order, Shine, Standardise, and Sustain to transform your workplace.",
    includes: ["6 hours of content", "No Exam", "No Project"],
    mode: "Online",
    beltLevel: "short",
    imageSrc: "/images/courses/Online-1.jpg",
    buttonLabel: "Learn More",
    price: "R6,995",
    duration: "6 hours of content",
  },
  {
    slug: "classroom-kaizen",
    title: "Six Sigma Kaizen Classroom Course in South Africa",
    shortTitle: "Kaizen",
    description:
      "Hands-on classroom training in Kaizen continuous improvement. Learn to facilitate Kaizen events and drive operational excellence within your organisation.",
    includes: ["1 Day", "No Exam", "No Project"],
    mode: "Classroom",
    beltLevel: "short",
    imageSrc: "/images/courses/Classroom-1.jpg",
    buttonLabel: "Learn More",
    price: "R6,995",
    duration: "1 Day",
  },
  {
    slug: "virtual-kaizen",
    title: "Six Sigma Kaizen Virtual Course in South Africa",
    shortTitle: "Kaizen",
    description:
      "Interactive virtual training in Kaizen continuous improvement. Learn to facilitate Kaizen events and drive operational excellence through structured improvement.",
    includes: ["1 Day", "No Exam", "No Project"],
    mode: "Virtual",
    beltLevel: "short",
    imageSrc: "/images/courses/Virtual-1.jpg",
    buttonLabel: "Learn More",
    price: "R6,995",
    duration: "1 Day",
  },
  {
    slug: "online-kaizen",
    title: "Six Sigma Kaizen Online Course in South Africa",
    shortTitle: "Kaizen",
    description:
      "Self-paced online training in Kaizen continuous improvement. Learn the principles and tools of Kaizen to drive ongoing operational excellence.",
    includes: ["6 hours of content", "No Exam", "No Project"],
    mode: "Online",
    beltLevel: "short",
    imageSrc: "/images/courses/Online-1.jpg",
    buttonLabel: "Learn More",
    price: "R6,995",
    duration: "6 hours of content",
  },
];

// ─── Combined & Helpers ─────────────────────────────────────────

export const allCourses: CourseData[] = [
  ...onlineCourses,
  ...virtualCourses,
  ...classroomCourses,
  ...shortCourses,
];

export function getCoursesByMode(mode: Mode): CourseData[] {
  return allCourses.filter((c) => c.mode === mode);
}

export function getCourseBySlug(slug: string): CourseData | undefined {
  return allCourses.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return allCourses.map((c) => c.slug);
}

/** The 18 main courses (excludes short courses), grouped by mode for the listing page */
export const mainCoursesByMode: Record<Mode, CourseData[]> = {
  Online: onlineCourses,
  Virtual: virtualCourses,
  Classroom: classroomCourses,
};
