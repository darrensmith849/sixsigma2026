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

// ─── Shared DMAIC Green Belt Content (from sixsigmacertification.co.za) ───

const dmaicGreenBeltOverview =
  "Green Belts play an important role in your company's Six Sigma DMAIC implementation strategy. They use the Define, Measure, Analyze, Improve, Control methodology as problem solvers on Six Sigma projects. Learn how to apply the right statistical tools at the right time to maximize efficiency in defining, measuring, analyzing, improving, and controlling critical processes to increase cost savings.";

const dmaicGreenBeltWhoShouldAttend =
  "Process engineers and managers, Quality Engineers and managers, Manufacturing/Production engineers and managers, Service Process Improvement personnel, Customer Service Officers, and professionals seeking to bring significant cost savings to their organization through the DMAIC methodology and those interested in sitting for the ASQ Six Sigma Green Belt certification exam.";

const dmaicGreenBeltCourseOutline: CourseContentSection[] = [
  {
    heading: "Introduction",
    bullets: [
      "What is Six Sigma?",
      "Project Selection",
      "Project Planning and Charters",
      "Internal Process Measures",
      "Introduction to DMAIC project management",
    ],
  },
  {
    heading: "Define and Measure Phase",
    bullets: [
      "Basic Statistical Concepts",
      "Control Charts",
      "The Define Phase",
      "Process Mapping",
      "Measuring System Analysis",
      "Process Capability Analysis",
    ],
  },
  {
    heading: "Analyse Phase",
    bullets: [
      "Root Cause Problem Solving Tools",
      "Basic Experimental Design (Hypothesis Testing)",
      "Linear Regression",
      "Introduction to DOE",
      "The Improve Phase",
    ],
  },
  {
    heading: "Control Phase",
    bullets: [
      "The Control Phase",
      "Basic Cost Benefit Analysis",
      "The Control Plan Strategy",
      "Error Proofing",
      "Levels of Control",
      "Review and Wrap-up",
    ],
  },
];

// ─── Shared Lean Black Belt Content (from approved live pages) ──

const leanBlackBeltCtaLabels = {
  primary: "Get Quote",
  secondary: "Book Course",
  details: "View Full Course Details",
};

const leanBlackBeltCourseOutline: CourseContentSection[] = [
  {
    heading: "Week 1",
    bullets: [
      "Opportunity Statement",
      "Project Charter",
      "Risk Definition",
      "Critical Customer Requirements",
      "Determining what to measure",
      "7 Wastes",
      "Input Indicators",
      "Core Processes",
      "Sigma",
      "Failure Costs",
      "Causes of Variation",
      "Value Stream Mapping",
      "Process Maps",
      "MSA",
      "Output Indicators",
      "Operational Definitions",
      "SIPOC",
      "Charts that Measure Variation",
      "RTY vs FTY",
      "Independent / Dependent Variables",
      "Pareto Analysis",
      "Data Types",
      "Common Cause Variation / Special Cause Variation",
      "Building Commitment",
      "Sample Size Formula",
      "FMEA",
      "ANOVA",
      "Control Charts",
      "Influence in Regression Analysis",
      "Capability Analysis",
      "Causation vs Correlation",
      "Root Cause Analysis",
      "Population vs Sample",
      "Organizational Transformation",
      "Types of Resistance",
      "Cause and Effect Matrix",
      "Regression Interpretation",
      "Principles of Lean",
    ],
  },
  {
    heading: "Week 2",
    bullets: [
      "DOE",
      "Types of Variables",
      "Normal Distribution",
      "Hypothesis Testing",
      "Visual Management",
      "Presenting Recommendations",
      "Replication",
      "Sigma Level",
      "Beta",
      "Correlation",
      "Standard Operations",
      "Pull Systems",
      "Residual Analysis",
      "Best Subsets Regression",
      "Confounding – Regression / DOE",
      "Noise Factors",
      "2-Sample t-Test",
      "Interactions – Regression / DOE",
      "Pugh Matrix",
      "Business Risk Management",
      "Objectives of the Control Phase",
      "Procedures / Standards",
      "Mistake Proofing",
      "RTY vs FTY",
      "Control Plan",
      "Process Documentation",
      "Weibull Analysis",
      "Benefit Realization Cycle",
      "5S",
      "Visual Controls",
      "SMED",
      "Kanban",
      "Cell Design",
      "Central Limit Theorem",
      "Factory Layout",
      "Standard Operations",
      "Takt Time",
    ],
  },
];

// ─── Shared Black Belt Enrichment (from sixsigmacertification.co.za) ──

const blackBeltOverview =
  "Black Belts are the Six Sigma experts who lead projects and drive significant improvements across an organisation. This comprehensive training covers both Lean and DMAIC content streams, providing the advanced tools and techniques needed to identify, analyze, and solve complex business problems. To be accepted onto the Black Belt course, you will need to have completed a Green Belt course or have many years of project management experience and be good at statistics.";

const blackBeltWhoShouldAttend =
  "Advanced Six Sigma practitioners, project managers with Green Belt certification or equivalent experience, and professionals who are proficient in statistics and seeking to lead Six Sigma projects that deliver significant savings or improvements to existing processes.";

const blackBeltCompanyResults = [
  "Focus on Customers – decreasing customer complaints",
  "Increase in customer loyalty and relations",
  "Breakdown barriers between departments and functions",
  "Reductions of incidents – better safety performance",
  "Customer satisfaction",
  "Reduce turnaround time",
  "Increased bottom line",
  "Time Management",
  "Effective supply chain management",
  "Data analysis before decision making",
  "Shareholder value",
  "Employee satisfaction – team building",
  "Strategic Planning",
  "Huge cost benefit",
  "Sustained improvements",
  "Improving staff skills – better decision making",
];

const blackBeltWhatYouCanExpect = [
  "Mastery of advanced Six Sigma tools and techniques",
  "Ability to lead and manage complex improvement projects",
  "A status that is recognised world wide",
];

const blackBeltCompaniesTrained = [
  "Standard Bank", "Sasol", "SAPPI", "Monviso", "Eskom", "Rotolabel",
  "SARS", "GE Oil and Gas", "McCain", "Earthworks Engineering", "Neotel",
  "MSA Africa", "Spear System Packing Africa", "Mondipak Namibia (PTY) Ltd",
  "Palabora Mining", "Debswana", "Chevron", "Anglo American", "BMW",
  "Nedbank", "Coca Cola", "Transnet",
];

const dmaicBlackBeltCourseOutline: CourseContentSection[] = [
  {
    heading: "Lean Black Belt Principles and Overview",
    bullets: [
      "7 Wastes (MUDA)",
      "Kaizen Pre-Event Planning",
      "Kaizen Blitz",
      "Brainstorming Techniques",
      "Cell Design & Factory Layout",
      "5S & SMED",
      "Poke Yoke",
      "Lean Office",
      "Introduction to Six Sigma (DMAIC methodology)",
      "Introduction to Change Management",
    ],
  },
  {
    heading: "Problem Solving Process & Tools",
    bullets: [
      "Cause & Effect Diagrams",
      "Plan, Do, Check, Act (PDCA)",
      "5 Why",
      "Pareto Analysis (80/20 rule)",
    ],
  },
  {
    heading: "Total Productive Maintenance (TPM)",
    bullets: [
      "Planned Maintenance",
      "Education and Training",
      "Equipment Improvement",
      "Early Management",
      "Autonomous Maintenance",
    ],
  },
  {
    heading: "Standard Operations",
    bullets: [
      "Standard Work Sequence",
      "Takt Time",
      "Line Balancing",
      "Standard Work-In-Process",
    ],
  },
  {
    heading: "Material Replenishment Systems",
    bullets: [
      "Direct Pull",
      "Signal Pull",
      "Two-bin Pull",
      "Kanban Pull",
      "Supermarket Pull",
    ],
  },
  {
    heading: "Value Stream Mapping",
    bullets: [
      "Current State Mapping",
      "Future State Mapping",
    ],
  },
  {
    heading: "Process Mapping Tools",
    bullets: [
      "SIPOC Diagrams",
      "Process Flow Charts",
      "Process Sequence Charts",
      "Brown Paper Exercise",
      "Waste Walking",
    ],
  },
  {
    heading: "Measurable Customer Requirements",
    bullets: [
      "Quality",
      "Cost",
      "Delivery",
    ],
  },
];

// ─── Shared Yellow Belt Content (from approved live pages) ──────

const yellowBeltCtaLabels = {
  primary: "Get Quote",
  secondary: "Book Course",
  details: "View Full Course Details",
};

const yellowBeltCourseOutline: CourseContentSection[] = [
  {
    heading: "Introduction to Six Sigma",
    bullets: [
      "Six Sigma Overview",
      "Six Sigma success factors and six sigma organisation",
      "What does 6 sigma mean and how is it measured?",
      "Six Sigma Roles – business and customer",
      "Developing a cutomer-focused business strategy",
      "Unpacking DMAIC methodology",
    ],
  },
  {
    heading: "Define Phase",
    bullets: [
      "Define Phase",
      "Elements of the Project Charter",
      "Six Sigma Teams",
      "Process Mapping",
      "Business Risk Management",
    ],
  },
  {
    heading: "Measure Phase",
    bullets: [
      "Measure Phase",
      "How to sample correctly",
      "Stakeholder Management",
      "Measuring financial impact",
    ],
  },
  {
    heading: "Analyse Phase",
    bullets: [
      "Analyse Phase",
      "Cause and Effect",
    ],
  },
  {
    heading: "Improve Phase",
    bullets: [
      "Improve Phase",
    ],
  },
  {
    heading: "Control Phase",
    bullets: [
      "Control Phase",
    ],
  },
  {
    heading: "Introduction to statistics",
    bullets: [
      "Introduction to statistics",
      "Statistical tools",
      "Correlation versus Causation",
    ],
  },
];

const yellowBeltOverview =
  "Yellow Belts serve as valued team members on Six Sigma projects, supporting Green and Black Belts in implementing process improvements. This course introduces you to the world of Six Sigma methodology, equipping you with a solid understanding of Six Sigma principles and the DMAIC framework that can be applied to improve your company's processes.";

const yellowBeltWhoShouldAttend =
  "Team members, supervisors, and individuals new to Six Sigma who want to understand the fundamentals and be able to support process improvement projects. Ideal for anyone seeking to build a foundation in Six Sigma methodology and contribute to improvement initiatives within their organisation.";

const yellowBeltCompanyResults = [
  "Common language throughout the organisation",
  "Improved understanding of process improvement",
  "Employee Motivation and development of staff skills",
  "Foundation for further Six Sigma certification",
  "Improved quality awareness across teams",
  "Better data-driven decision making",
  "Support for Green and Black Belt projects",
];

const yellowBeltWhatYouCanExpect = [
  "Solid understanding of Six Sigma fundamentals and DMAIC",
  "Ability to participate in and support improvement projects",
  "A status that is recognised world wide",
];

// ─── Shared White Belt Content (from approved live pages) ───────

const whiteBeltOverview =
  "This on-demand online White Belt Six Sigma course offers an overview and introduction to Six Sigma and the DMAIC methodology. It is designed for beginners seeking to start their Six Sigma professional journey and those wanting to become qualified team members on Six Sigma projects. Upon completion, participants can upgrade to Yellow, Green, and Black Belt programs.";

const whiteBeltWhoShouldAttend =
  "Beginners seeking to start their Six Sigma professional journey and anyone wanting to become a qualified team member on Six Sigma projects. No prior Six Sigma experience is required.";

const whiteBeltCtaLabels = {
  primary: "Get Quote",
  secondary: "Start Course",
};

const whiteBeltCourseOutline: CourseContentSection[] = [
  {
    heading: "Six Sigma Overview",
    bullets: [
      "What is Six Sigma?",
      "History and evolution of Six Sigma",
      "Six Sigma roles and responsibilities",
      "Benefits of Six Sigma in organisations",
    ],
  },
  {
    heading: "Six Sigma Define Phase",
    bullets: [
      "Understanding the Define phase",
      "Project selection and scoping",
      "Voice of the Customer",
      "Problem and goal statements",
    ],
  },
  {
    heading: "Six Sigma Project Deployment",
    bullets: [
      "Introduction to DMAIC methodology",
      "Project planning fundamentals",
      "Basic quality tools",
      "Team dynamics and communication",
    ],
  },
];

// ─── Shared Root Cause Analysis Content ─────────────────────────

const rcaOverview =
  "This intensive 2-day Root Cause Analysis course is designed to equip participants with the knowledge and skills required to effectively perform Root Cause Analysis (RCA) in their organisations. The course covers key RCA concepts, methodologies, and practical tools to help identify and address the underlying causes of problems through interactive lectures, group discussions, and hands-on exercises.";

const rcaWhoShouldAttend =
  "Process improvers, quality professionals, team leaders, and anyone responsible for investigating and resolving recurring problems in their organisation. Ideal for proactive learners seeking structured problem-solving techniques.";

const rcaCourseOutline: CourseContentSection[] = [
  {
    heading: "Introduction to Root Cause Analysis",
    bullets: [
      "What is Root Cause Analysis?",
      "Importance of identifying root causes",
      "Overview of RCA methodologies",
      "When to use Root Cause Analysis",
    ],
  },
  {
    heading: "RCA Tools and Techniques",
    bullets: [
      "5 Why Analysis",
      "Fishbone (Ishikawa) Diagrams",
      "Fault Tree Analysis",
      "Pareto Analysis",
      "Failure Mode and Effects Analysis (FMEA)",
    ],
  },
  {
    heading: "Data Collection and Analysis",
    bullets: [
      "Gathering relevant data",
      "Identifying contributing factors",
      "Analysing incident patterns",
      "Evidence-based problem solving",
    ],
  },
  {
    heading: "Developing Corrective Actions",
    bullets: [
      "Developing effective solutions",
      "Implementing preventive measures",
      "Monitoring and sustaining improvements",
      "Documentation and reporting",
    ],
  },
];

// ─── Online Courses ─────────────────────────────────────────────

const onlineCourses: CourseData[] = [
  {
    slug: "online-white-belt",
    title: "Six Sigma Online White Belt Course in South Africa",
    shortTitle: "White Belt",
    description:
      "This online white belt six sigma course in South Africa provides a basic foundation to Six Sigma methodology. Our beginner-oriented, video sessions serve as the perfect base for individuals and organizations seeking to enhance their understanding of Six Sigma and its practical applications. As a leading provider of Six Sigma White Belt training, 2KO Africa equips you with entry-level knowledge that can be applied to improve your company's processes. Join our Six Sigma White Belt training today and embark on your journey towards process improvement and efficiency.",
    includes: ["4 Lessons", "10 Topics", "10 Quizzes"],
    mode: "Online",
    beltLevel: "white",
    imageSrc: "/images/courses/Online-1.jpg",
    isFree: true,
    stripColor: "yellow",
    buttonLabel: "Learn More",
    price: "Free",
    duration: "6 hours of content",
    ctaLabels: whiteBeltCtaLabels,
    overviewText: whiteBeltOverview,
    whoShouldAttend: whiteBeltWhoShouldAttend,
    courseContentHeading: "Course Content",
    courseContentSubheading: "Six Sigma White Belt Course",
    courseContent: whiteBeltCourseOutline,
  },
  {
    slug: "online-yellow-belt",
    title: "Six Sigma Online Yellow Belt Course in South Africa",
    shortTitle: "Yellow Belt",
    description:
      "This online yellow belt six sigma course in South Africa helps establish your six sigma methodology. Our professional videos serve as the perfect starting point for individuals and organizations seeking to enhance their understanding of Six Sigma and its practical applications. As a leading provider of Six Sigma training, 2KO Africa equips you with entry-level knowledge that can be applied to improve your company's processes. Our certified trainers deliver engaging and insightful courses, ensuring a solid foundation in the principles and potential benefits of Six Sigma.",
    includes: ["7 Lessons", "22 Topics", "22 Quizzes"],
    mode: "Online",
    beltLevel: "yellow",
    imageSrc: "/images/courses/Online-2.jpg",
    buttonLabel: "Learn More",
    price: "From R4,998",
    duration: "14 hours of content",
    ctaLabels: yellowBeltCtaLabels,
    overviewText: yellowBeltOverview,
    whoShouldAttend: yellowBeltWhoShouldAttend,
    companyResults: yellowBeltCompanyResults,
    whatYouCanExpect: yellowBeltWhatYouCanExpect,
    whyChooseUs: leanGreenBeltWhyChooseUs,
    companiesTrained: leanGreenBeltCompaniesTrained,
    courseContentHeading: "Course Content",
    courseContentSubheading: "Six Sigma Yellow Belt Course",
    courseContent: yellowBeltCourseOutline,
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
    overviewText: dmaicGreenBeltOverview,
    whoShouldAttend: dmaicGreenBeltWhoShouldAttend,
    companyResults: leanGreenBeltCompanyResults,
    whatYouCanExpect: leanGreenBeltWhatYouCanExpect,
    whyChooseUs: leanGreenBeltWhyChooseUs,
    companiesTrained: leanGreenBeltCompaniesTrained,
    courseContentHeading: "Course Outline",
    courseContentSubheading: "DMAIC Six Sigma Green Belt",
    courseContent: dmaicGreenBeltCourseOutline,
  },
  {
    slug: "online-lean-black-belt",
    title: "Six Sigma Online LEAN Black Belt Course in South Africa",
    shortTitle: "LEAN Black Belt",
    description:
      "2KO Africa's online six sigma black belt courses were designed with advanced six sigma practitioners in mind. Students who enrol for six sigma black belt (self-paced) have a year to complete the course. To be accepted onto the black belt course, you will need to have completed a green belt course or have many years of project management experience and be good at statistics. Requirements for certification: two online exams (one for each week), plus a project where you are found competent in delivering significant savings or improvements to existing processes. Booking for our black belt six sigma classes is highly recommended. We cover both the Lean and the DMAIC content streams.",
    includes: ["31 Lessons", "152 Topics", "31 Quizzes"],
    mode: "Online",
    beltLevel: "black",
    imageSrc: "/images/courses/Online-5.jpg",
    buttonLabel: "Learn More",
    price: "From R26,000",
    duration: "70 hours of content",
    ctaLabels: leanBlackBeltCtaLabels,
    overviewText: blackBeltOverview,
    whoShouldAttend: blackBeltWhoShouldAttend,
    companyResults: blackBeltCompanyResults,
    whatYouCanExpect: blackBeltWhatYouCanExpect,
    whyChooseUs: leanGreenBeltWhyChooseUs,
    companiesTrained: blackBeltCompaniesTrained,
    courseContentHeading: "Course Content",
    courseContentSubheading: "Six Sigma Black Belt Course",
    courseContent: leanBlackBeltCourseOutline,
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
    ctaLabels: leanBlackBeltCtaLabels,
    overviewText: blackBeltOverview,
    whoShouldAttend: blackBeltWhoShouldAttend,
    companyResults: blackBeltCompanyResults,
    whatYouCanExpect: blackBeltWhatYouCanExpect,
    whyChooseUs: leanGreenBeltWhyChooseUs,
    companiesTrained: blackBeltCompaniesTrained,
    courseContentHeading: "Course Content",
    courseContentSubheading: "DMAIC Six Sigma Black Belt Course",
    courseContent: dmaicBlackBeltCourseOutline,
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
    overviewText: rcaOverview,
    whoShouldAttend: rcaWhoShouldAttend,
    courseContentHeading: "Course Content",
    courseContentSubheading: "Root Cause Analysis Course",
    courseContent: rcaCourseOutline,
  },
  {
    slug: "virtual-yellow-belt",
    title: "Six Sigma Virtual Yellow Belt Course in South Africa",
    shortTitle: "Yellow Belt",
    description:
      "This virtual live yellow belt six sigma course introduces you to the world of Six Sigma systems. Our engaging video sessions serve as the basis for gaining an understanding of Six Sigma and its practical applications. As a leading provider of Six Sigma training, 2KO Africa equips you with entry-level knowledge that can be applied to improve your company's processes. Our certified trainers deliver engaging and insightful virtual live courses, ensuring a solid foundation in the principles and potential benefits of Six Sigma.",
    includes: ["2 Days", "7 Lessons", "22 Topics", "1 x 90-minute exam", "No Project requirement"],
    mode: "Virtual",
    beltLevel: "yellow",
    imageSrc: "/images/courses/Virtual-2.jpg",
    buttonLabel: "Learn More",
    price: "From R4,998",
    duration: "2 Days",
    ctaLabels: yellowBeltCtaLabels,
    overviewText: yellowBeltOverview,
    whoShouldAttend: yellowBeltWhoShouldAttend,
    companyResults: yellowBeltCompanyResults,
    whatYouCanExpect: yellowBeltWhatYouCanExpect,
    whyChooseUs: leanGreenBeltWhyChooseUs,
    companiesTrained: leanGreenBeltCompaniesTrained,
    courseContentHeading: "Course Content",
    courseContentSubheading: "Six Sigma Yellow Belt Course",
    courseContent: yellowBeltCourseOutline,
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
    overviewText: dmaicGreenBeltOverview,
    whoShouldAttend: dmaicGreenBeltWhoShouldAttend,
    companyResults: leanGreenBeltCompanyResults,
    whatYouCanExpect: leanGreenBeltWhatYouCanExpect,
    whyChooseUs: leanGreenBeltWhyChooseUs,
    companiesTrained: leanGreenBeltCompaniesTrained,
    courseContentHeading: "Course Outline",
    courseContentSubheading: "DMAIC Six Sigma Green Belt",
    courseContent: dmaicGreenBeltCourseOutline,
  },
  {
    slug: "virtual-lean-black-belt",
    title: "Six Sigma Virtual LEAN Black Belt Course in South Africa",
    shortTitle: "LEAN Black Belt",
    description:
      "2KO Africa's six sigma black belt virtual online instructor led courses (using MS Teams) in South Africa, are taylor-made for advanced six sigma practitioners. Anyone who would like to enrol for black belt six sigma will need to have completed a green belt course or have many years of project management experience and be good at statistics. Requirements for certification: two online exams (one for each week), plus a project where you are found competent in delivering significant savings or improvements to existing processes. Booking for our black belt six sigma classes is highly recommended. We cover both the Lean and the DMAIC content streams. Virtual black belt courses are held over two non-consecutive weeks (Monday to Friday, full time).",
    includes: ["10 Days", "17 Lessons", "152 Topics", "2 x 90-minute exam", "6 Months to submit project"],
    mode: "Virtual",
    beltLevel: "black",
    imageSrc: "/images/courses/Virtual-5.jpg",
    buttonLabel: "Learn More",
    price: "From R26,000",
    duration: "10 Days",
    ctaLabels: leanBlackBeltCtaLabels,
    overviewText: blackBeltOverview,
    whoShouldAttend: blackBeltWhoShouldAttend,
    companyResults: blackBeltCompanyResults,
    whatYouCanExpect: blackBeltWhatYouCanExpect,
    whyChooseUs: leanGreenBeltWhyChooseUs,
    companiesTrained: blackBeltCompaniesTrained,
    courseContentHeading: "Course Content",
    courseContentSubheading: "Six Sigma Black Belt Course",
    courseContent: leanBlackBeltCourseOutline,
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
    ctaLabels: leanBlackBeltCtaLabels,
    overviewText: blackBeltOverview,
    whoShouldAttend: blackBeltWhoShouldAttend,
    companyResults: blackBeltCompanyResults,
    whatYouCanExpect: blackBeltWhatYouCanExpect,
    whyChooseUs: leanGreenBeltWhyChooseUs,
    companiesTrained: blackBeltCompaniesTrained,
    courseContentHeading: "Course Content",
    courseContentSubheading: "DMAIC Six Sigma Black Belt Course",
    courseContent: dmaicBlackBeltCourseOutline,
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
    overviewText: rcaOverview,
    whoShouldAttend: rcaWhoShouldAttend,
    courseContentHeading: "Course Content",
    courseContentSubheading: "Root Cause Analysis Course",
    courseContent: rcaCourseOutline,
  },
  {
    slug: "classroom-yellow-belt",
    title: "Six Sigma Classroom Yellow Belt Course in South Africa",
    shortTitle: "Yellow Belt",
    description:
      "This in-person yellow belt course introduces you to the world of Six Sigma methodology. As a leading provider of Six Sigma Yellow Belt training, 2KO Africa equips you with entry-level knowledge that can be applied to improve your company's processes. Our certified trainers deliver engaging and insightful courses, ensuring a solid foundation in the principles and potential benefits of Six Sigma. Join our instructor led Six Sigma Yellow Belt course today and embark on your journey towards process improvement and efficiency.",
    includes: ["2 Days", "7 Lessons", "22 Topics", "1 x 90-minute exam", "No Project requirement"],
    mode: "Classroom",
    beltLevel: "yellow",
    imageSrc: "/images/courses/Classroom-2.jpg",
    buttonLabel: "Learn More",
    price: "From R4,998",
    duration: "2 Days",
    ctaLabels: yellowBeltCtaLabels,
    overviewText: yellowBeltOverview,
    whoShouldAttend: yellowBeltWhoShouldAttend,
    companyResults: yellowBeltCompanyResults,
    whatYouCanExpect: yellowBeltWhatYouCanExpect,
    whyChooseUs: leanGreenBeltWhyChooseUs,
    companiesTrained: leanGreenBeltCompaniesTrained,
    courseContentHeading: "Course Content",
    courseContentSubheading: "Six Sigma Yellow Belt Course",
    courseContent: yellowBeltCourseOutline,
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
    overviewText: dmaicGreenBeltOverview,
    whoShouldAttend: dmaicGreenBeltWhoShouldAttend,
    companyResults: leanGreenBeltCompanyResults,
    whatYouCanExpect: leanGreenBeltWhatYouCanExpect,
    whyChooseUs: leanGreenBeltWhyChooseUs,
    companiesTrained: leanGreenBeltCompaniesTrained,
    courseContentHeading: "Course Outline",
    courseContentSubheading: "DMAIC Six Sigma Green Belt",
    courseContent: dmaicGreenBeltCourseOutline,
  },
  {
    slug: "classroom-lean-black-belt",
    title: "Six Sigma Classroom LEAN Black Belt Course in South Africa",
    shortTitle: "LEAN Black Belt",
    description:
      "2KO Africa's instructor-led six sigma black belt courses in South Africa were designed with advanced six sigma practitioners in mind. Classes run for 10 days (2 x non-consecutive weeks). To be accepted onto the black belt course, you will need to have completed a green belt course or have many years of project management experience and be good at statistics. Requirements for certification: two online exams (one for each week), plus a project where you are found competent in delivering significant savings or improvements to existing processes. 2KO Africa's black belt six sigma courses in South Africa are conducted in various ways such as by live virtual online, instructor-led face-to-face classes or online eLearning self-study courses. Booking for our black belt six sigma classes is highly recommended. We cover both the Lean and the DMAIC content streams.",
    includes: ["10 Days", "17 Lessons", "152 Topics", "2 x 90-minute exam", "6 Months to submit project"],
    mode: "Classroom",
    beltLevel: "black",
    imageSrc: "/images/courses/Classroom-5.jpg",
    buttonLabel: "Learn More",
    price: "From R26,000",
    duration: "10 Days",
    ctaLabels: leanBlackBeltCtaLabels,
    overviewText: blackBeltOverview,
    whoShouldAttend: blackBeltWhoShouldAttend,
    companyResults: blackBeltCompanyResults,
    whatYouCanExpect: blackBeltWhatYouCanExpect,
    whyChooseUs: leanGreenBeltWhyChooseUs,
    companiesTrained: blackBeltCompaniesTrained,
    courseContentHeading: "Course Content",
    courseContentSubheading: "Six Sigma Black Belt Course",
    courseContent: leanBlackBeltCourseOutline,
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
    ctaLabels: leanBlackBeltCtaLabels,
    overviewText: blackBeltOverview,
    whoShouldAttend: blackBeltWhoShouldAttend,
    companyResults: blackBeltCompanyResults,
    whatYouCanExpect: blackBeltWhatYouCanExpect,
    whyChooseUs: leanGreenBeltWhyChooseUs,
    companiesTrained: blackBeltCompaniesTrained,
    courseContentHeading: "Course Content",
    courseContentSubheading: "DMAIC Six Sigma Black Belt Course",
    courseContent: dmaicBlackBeltCourseOutline,
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
