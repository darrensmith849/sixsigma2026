export type Mode = "Online" | "Virtual" | "Classroom";
export type BeltLevel = "white" | "yellow" | "green" | "black" | "short";

export interface CourseContentSection {
  heading: string;
  bullets: string[];
}

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
  ctaLabels?: { primary: string; secondary: string; details?: string };
  courseContentHeading?: string;
  courseContentSubheading?: string;
  courseContent?: CourseContentSection[];
  /* ─── Rich detail fields (long courses) ─── */
  overviewText?: string;
  whoShouldAttend?: string;
  companyResults?: string[];
  whatYouCanExpect?: string[];
  whyChooseUs?: string[];
  companiesTrained?: string[];
  classroomFee?: string;
  classroomDiscounts?: string[];
  classroomVenue?: string;
  virtualFee?: string;
  virtualHardware?: string;
}

// ─── Shared Lean Green Belt Content (from approved PDF) ────────

const leanGreenBeltOverview =
  "Green Belts play an important role in your company's Lean Six Sigma implementation strategy. They are the problem solvers assigned to Black Belt projects. Learn how to apply the right tools at the right time to maximize efficiency in defining, measuring, analyzing, improving, and controlling critical processes to increase cost savings.";

const leanGreenBeltWhoShouldAttend =
  "Problem solvers, data analysts, and project team members in manufacturing and service industries. Individuals seeking to bring significant cost savings to their organization and those interested in becoming a Six Sigma Green Belt and/or sitting for the ASQ Six Sigma Green Belt certification exam will benefit from this training.";

const leanGreenBeltCompanyResults = [
  "Improved Customer Service Loyalty",
  "Time Management and efficiency",
  "Reduced Cycle Time",
  "Employee Motivation and development of staff skills",
  "Strategic Planning",
  "Supply Chain Management",
  "Bottom line cost savings (5%-20% of turnover per annum)",
  "Improved quality of product or service as perceived by the customer (internal and external customers)",
  "Common language throughout the organisation",
  "World class standard",
  "Creates a competitive edge",
  "Improve ROI",
  "Drive sales growth",
];

const leanGreenBeltWhatYouCanExpect = [
  "Improved knowledge and skills",
  "Ability to use a wide range of tools and techniques",
  "A status that is recognised world wide",
];

const leanGreenBeltWhyChooseUs = [
  "2KO Africa CC has prompt response time in addressing the needs of your company",
  "2KO Africa CC provides 2 sets of certifications, once students have successfully completed the training and the project.",
  "Worldwide, the practice is that Six Sigma/Lean certification is awarded by an institution that employs a certified and qualified Six Sigma/Lean black belt trainer (which is what we do). There is no central certifying body like there is for say Microsoft. For this reason, Six Sigma/lean certification is recognized worldwide provided it came from a certified organization.",
  "2KO Africa CC provides a flexible training schedule to suit delegates",
  "2KO Africa CC is well-established",
];

const leanGreenBeltCompaniesTrained = [
  "Anglo", "American", "Adcorp", "SekelaXabiso", "FNB", "Beam Suntory",
  "Momentum", "Bridgestone", "AIG", "In2food", "Siemans", "Al3 Boerdery",
  "JSE", "Loreal", "Protea Chemicals", "Express Angola", "WFS", "Capita",
  "De Beers Group", "Medshield", "Defy", "Inmarsat", "Merchants", "Flex PC",
  "Smart life", "Petra Diamonds", "Cell C", "Eskom", "Anglobal", "Verigreen",
  "Priontex", "Dunlop-Africa", "Westfalia Fruit", "Oldmutual",
];

const leanGreenBeltCourseOutline: CourseContentSection[] = [
  {
    heading: "Introduction",
    bullets: [
      "History",
      "Lean Six Sigma Definitions",
      "Understanding Six Sigma",
      "Understanding Lean Principles",
      'Understanding Losses Attributable to "Waste"',
      "Interrelationship of Lean Six Sigma",
      "Six Sigma Fundamentals",
      "Selection of Projects",
    ],
  },
  {
    heading: "Measure Phase (Measurement System Analysis)",
    bullets: [
      "Process Definition",
      "Variable Gage R&R",
      "Attribute Agreement Analysis",
      "Variables Data Capability Analysis",
      "Attribute Data Capability Analysis",
      "Process Discovery",
      "Six Sigma Statistics",
      "Measurement System Analysis",
      "Process Capability",
    ],
  },
  {
    heading: "Improve Phase",
    bullets: [
      "Regression",
      "Establishing Operating Tolerances",
      "Re-evaluating the measurement system",
      "Total Productive Maintenance",
      "Cellular Manufacturing",
      "5S – Visual Management",
      "Process Modelling Regression",
      "Designing Experiments",
    ],
  },
  {
    heading: "Define Phase",
    bullets: [
      'Selecting an Output Characteristic ("Y")',
      "Defining Performance Standards",
      "Describing the Process",
      "Value Stream Mapping",
      "Swim Lane Mapping",
      "Project Charters",
      "Cost of Poor Quality",
      "Understanding Basic Statistics",
    ],
  },
  {
    heading: "Analyse Phase",
    bullets: [
      "Identification of Potential Causes",
      "Hypothesis Testing",
      "Chi-Square & ANOVA",
      "Correlation Analysis",
      "Regression Analysis",
      "Basic Design of Experiments",
      "Quick Changeover (SMED)",
      "Inferential Statistics",
    ],
  },
  {
    heading: "Control Phase",
    bullets: [
      "Lean Controls",
      "Principles of Statistical Process Control",
      "Process Capability",
      "Error Proofing",
      "Reliability & Asset Utilization",
      "Standardized Work",
      "Pull Systems",
      "Understand the 5 phases of the Control Plan",
    ],
  },
];

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
    overviewText: leanGreenBeltOverview,
    whoShouldAttend: leanGreenBeltWhoShouldAttend,
    companyResults: leanGreenBeltCompanyResults,
    whatYouCanExpect: leanGreenBeltWhatYouCanExpect,
    whyChooseUs: leanGreenBeltWhyChooseUs,
    companiesTrained: leanGreenBeltCompaniesTrained,
    courseContentHeading: "Course Outline",
    courseContentSubheading: "Lean Six Sigma Green Belt",
    courseContent: leanGreenBeltCourseOutline,
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
    overviewText: leanGreenBeltOverview,
    whoShouldAttend: leanGreenBeltWhoShouldAttend,
    companyResults: leanGreenBeltCompanyResults,
    whatYouCanExpect: leanGreenBeltWhatYouCanExpect,
    whyChooseUs: leanGreenBeltWhyChooseUs,
    companiesTrained: leanGreenBeltCompaniesTrained,
    courseContentHeading: "Course Outline",
    courseContentSubheading: "Lean Six Sigma Green Belt",
    courseContent: leanGreenBeltCourseOutline,
    virtualFee: "R18 995 per person | Payment required two weeks prior to the start of the course.",
    virtualHardware: "EzTalks Software, Computer with sound, Strong Internet connection.",
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
    overviewText: leanGreenBeltOverview,
    whoShouldAttend: leanGreenBeltWhoShouldAttend,
    companyResults: leanGreenBeltCompanyResults,
    whatYouCanExpect: leanGreenBeltWhatYouCanExpect,
    whyChooseUs: leanGreenBeltWhyChooseUs,
    companiesTrained: leanGreenBeltCompaniesTrained,
    courseContentHeading: "Course Outline",
    courseContentSubheading: "Lean Six Sigma Green Belt",
    courseContent: leanGreenBeltCourseOutline,
    classroomFee: "R25 294,25 per person. Payment required within 60 days of the start of the course.",
    classroomDiscounts: [
      "10% Discount: R24 194,50 per person. Payment required within 30 days of the start of the course.",
      "15% Discount: R21 995,00 per person. Payment required two weeks prior to the start of the course.",
    ],
    classroomVenue: "Johannesburg, Cape Town, Durban, George and Onsite training for a group of 6 or more delegates.",
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

const fiveSDescription =
  "Our Six Sigma 5S course in South Africa offers a comprehensive introduction to the 5S methodology: Sort, Set in Order, Shine, Standardize, and Sustain. Designed to enhance workplace organization and efficiency, this training equips participants with practical tools and strategies to improve quality management and reduce waste in their operations. Ideal for professionals aiming to foster a productive, safe, and high-quality work environment.";

const fiveSCtaLabels = {
  primary: "Get Quote",
  secondary: "Book Course",
  details: "View Full Course Details",
};

const fiveSIncludes = ["1 Day", "8 Lessons", "29 Topics", "No Exam", "No Project"];

const fiveSCourseContent: CourseContentSection[] = [
  {
    heading: "Introduction to 5S",
    bullets: [
      "Overview of 5S methodology",
      "History and origins of 5S",
      "Benefits of implementing 5S in the workplace",
    ],
  },
  {
    heading: "Sort",
    bullets: [
      "Understanding the Sort phase",
      "Identifying necessary vs. unnecessary items",
      "Techniques for sorting and categorizing items",
      "Implementing visual management tools for sorting",
    ],
  },
  {
    heading: "Set in Order",
    bullets: [
      "Importance of organization in the workplace",
      "Principles of efficient layout and storage",
      "Developing visual cues for item placement",
      "Strategies for optimizing workflow through proper arrangement",
    ],
  },
  {
    heading: "Shine",
    bullets: [
      "Creating a culture of cleanliness and maintenance",
      "Importance of regular cleaning and inspection",
      "Implementing cleaning schedules and checklists",
      "Identifying and addressing root causes of dirt and clutter",
    ],
  },
  {
    heading: "Sustain",
    bullets: [
      "Strategies for sustaining 5S improvements",
      "Building employee engagement and ownership",
      "Conducting regular audits and reviews",
      "Continuously improving 5S practices",
    ],
  },
  {
    heading: "Case Studies and Best Practices",
    bullets: [
      "Examining real-world examples of successful 5S implementation",
      "Learning from challenges and pitfalls",
      "Identifying best practices for sustaining 5S improvements",
    ],
  },
  {
    heading: "Implementing 5S in Your Workplace",
    bullets: [
      "Developing an action plan for implementing 5S",
      "Identifying key stakeholders and resources",
      "Overcoming resistance and driving change",
      "Measuring and evaluating the success of 5S initiatives",
    ],
  },
  {
    heading: "Conclusion and Next Steps",
    bullets: [
      "Review of key concepts and takeaways",
      "Action planning for immediate implementation",
      "Resources for ongoing support and learning",
    ],
  },
];

const kaizenDescription =
  "Our Kaizen course in South Africa is focused on continuous improvement principles and practices. Participants will learn to identify inefficiencies, implement small but impactful changes, and foster a culture of collective responsibility and ongoing enhancement. This training is perfect for individuals and teams looking to drive operational excellence and enhance competitiveness through incremental improvements.";

const kaizenCtaLabels = {
  primary: "Get Quote",
  secondary: "Book Course",
  details: "View Full Course Details",
};

const kaizenIncludes = ["1 Day", "7 Lessons", "21 Topics", "No Exam", "No Project"];

const kaizenCourseContent: CourseContentSection[] = [
  {
    heading: "Foundations of Kaizen",
    bullets: [
      "Understanding the Origins and History of Kaizen",
      "Exploring the Core Principles: Continuous Improvement, Standardization, and Elimination of Waste",
      "The Role of Leadership in Kaizen Implementation",
    ],
  },
  {
    heading: "Kaizen Mindset and Culture",
    bullets: [
      "Developing a Kaizen Mindset: Embracing Change and Growth",
      "Fostering a Culture of Continuous Improvement",
      "Employee Engagement and Empowerment in Kaizen",
    ],
  },
  {
    heading: "Kaizen Tools and Techniques",
    bullets: [
      "Gemba Walks: Going to the Source for Improvement",
      "5S Methodology: Sort, Set in Order, Shine, Standardize, Sustain",
      "Kaizen Events: Planning and Implementing Rapid Improvement Projects",
    ],
  },
  {
    heading: "Kaizen in Action",
    bullets: [
      "Case Studies: Real-world Examples of Successful Kaizen Implementation",
      "Challenges and Solutions in Kaizen Adoption",
      "Measuring and Evaluating the Impact of Kaizen Initiatives",
    ],
  },
  {
    heading: "Kaizen in Various Sectors",
    bullets: [
      "Applying Kaizen in Manufacturing",
      "Kaizen in Service Industries",
      "Kaizen in Healthcare and Education",
    ],
  },
  {
    heading: "Continuous Learning and Adaptation",
    bullets: [
      "PDCA (Plan-Do-Check-Act): The Cycle of Continuous Improvement",
      "Kaizen Kata: Building Skills for Continuous Improvement",
      "Building a Learning Organization through Kaizen",
    ],
  },
  {
    heading: "Sustainability and Future Trends",
    bullets: [
      "Sustainability in Kaizen: Ensuring Long-term Success",
      "Integrating Kaizen with Lean and Agile Methodologies",
      "Exploring Future Trends in Kaizen and Continuous Improvement",
    ],
  },
];

const kaizenEntries: CourseData[] = [
  {
    slug: "classroom-kaizen",
    title: "Six Sigma Classroom Kaizen Course in South Africa",
    shortTitle: "Kaizen",
    description: kaizenDescription,
    includes: kaizenIncludes,
    mode: "Classroom",
    beltLevel: "short",
    imageSrc: "/images/courses/Classroom-1.jpg",
    buttonLabel: "Learn More",
    price: "R6,995",
    duration: "1 Day",
    ctaLabels: kaizenCtaLabels,
    courseContentHeading: "Course Content",
    courseContentSubheading: "Six Sigma Kaizen Course",
    courseContent: kaizenCourseContent,
  },
  {
    slug: "virtual-kaizen",
    title: "Six Sigma Virtual Kaizen Course in South Africa",
    shortTitle: "Kaizen",
    description: kaizenDescription,
    includes: kaizenIncludes,
    mode: "Virtual",
    beltLevel: "short",
    imageSrc: "/images/courses/Virtual-1.jpg",
    buttonLabel: "Learn More",
    price: "R6,995",
    duration: "1 Day",
    ctaLabels: kaizenCtaLabels,
    courseContentHeading: "Course Content",
    courseContentSubheading: "Six Sigma Kaizen Course",
    courseContent: kaizenCourseContent,
  },
  {
    slug: "online-kaizen",
    title: "Six Sigma Online Kaizen Course in South Africa",
    shortTitle: "Kaizen",
    description: kaizenDescription,
    includes: kaizenIncludes,
    mode: "Online",
    beltLevel: "short",
    imageSrc: "/images/courses/Online-1.jpg",
    buttonLabel: "Learn More",
    price: "R6,995",
    duration: "1 Day",
    ctaLabels: kaizenCtaLabels,
    courseContentHeading: "Course Content",
    courseContentSubheading: "Six Sigma Kaizen Course",
    courseContent: kaizenCourseContent,
  },
];

const shortCourses: CourseData[] = [
  {
    slug: "classroom-5s",
    title: "Six Sigma Classroom 5S Course in South Africa",
    shortTitle: "5S",
    description: fiveSDescription,
    includes: fiveSIncludes,
    mode: "Classroom",
    beltLevel: "short",
    imageSrc: "/images/courses/Classroom-1.jpg",
    buttonLabel: "Learn More",
    price: "R6,995",
    duration: "1 Day",
    ctaLabels: fiveSCtaLabels,
    courseContentHeading: "Course Content",
    courseContentSubheading: "Six Sigma 5S Course",
    courseContent: fiveSCourseContent,
  },
  {
    slug: "virtual-5s",
    title: "Six Sigma Virtual 5S Course in South Africa",
    shortTitle: "5S",
    description: fiveSDescription,
    includes: fiveSIncludes,
    mode: "Virtual",
    beltLevel: "short",
    imageSrc: "/images/courses/Virtual-1.jpg",
    buttonLabel: "Learn More",
    price: "R6,995",
    duration: "1 Day",
    ctaLabels: fiveSCtaLabels,
    courseContentHeading: "Course Content",
    courseContentSubheading: "Six Sigma 5S Course",
    courseContent: fiveSCourseContent,
  },
  {
    slug: "online-5s",
    title: "Six Sigma Online 5S Course in South Africa",
    shortTitle: "5S",
    description: fiveSDescription,
    includes: fiveSIncludes,
    mode: "Online",
    beltLevel: "short",
    imageSrc: "/images/courses/Online-1.jpg",
    buttonLabel: "Learn More",
    price: "R6,995",
    duration: "1 Day",
    ctaLabels: fiveSCtaLabels,
    courseContentHeading: "Course Content",
    courseContentSubheading: "Six Sigma 5S Course",
    courseContent: fiveSCourseContent,
  },
  ...kaizenEntries,
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
