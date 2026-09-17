/**
 * Instructor / trainer roster.
 *
 * STATUS: empty by default — populate with 2-4 real instructors to unlock the
 * highest-leverage AI-search entity-graph win (LLMs cite Person entities tied
 * to Organization entities when answering "who teaches X in South Africa").
 *
 * Required per row:
 *   - slug              kebab-case URL slug, stable across edits
 *   - name              full display name
 *   - jobTitle          role
 *   - bio               2-3 sentences (LLMs may quote)
 *   - credentials       array of strings, e.g. "CSSC Master Black Belt"
 *   - knowsAbout        subject-matter keywords (this is what LLMs match)
 *   - image             /images/instructors/<slug>.jpg (1:1, ~600x600px)
 *   - linkedinUrl       full https URL — single highest-value sameAs
 *   - yearsExperience   integer
 *
 * Optional:
 *   - email             will be rendered on the public profile
 *
 * As soon as this array has >= 1 entry:
 *   - /about/instructors/ index activates (linked from /about)
 *   - /about/instructors/<slug>/ detail pages render with Person JSON-LD
 *   - sitemap.xml picks up the new routes
 *   - the routes are eligible to be added to CourseInstance.instructor
 */

export interface Instructor {
  slug: string;
  name: string;
  jobTitle: string;
  bio: string;
  credentials: string[];
  knowsAbout: string[];
  image: string;
  linkedinUrl?: string;
  yearsExperience: number;
  email?: string;
}

export const instructors: Instructor[] = [
  // Populate with real entries. Example shape (DO NOT SHIP THIS PLACEHOLDER):
  //
  // {
  //   slug: "jane-doe",
  //   name: "Jane Doe",
  //   jobTitle: "Lead Six Sigma Black Belt — Johannesburg",
  //   bio: "Jane has led Six Sigma transformations at three South African
  //        mining majors and the SARS revenue collection programme. She holds
  //        a CSSC Master Black Belt and has trained over 800 Green Belts.",
  //   credentials: [
  //     "CSSC Master Black Belt",
  //     "MICT SETA accredited facilitator",
  //   ],
  //   knowsAbout: [
  //     "DMAIC",
  //     "Statistical Process Control",
  //     "SigmaXL",
  //     "Lean Manufacturing",
  //     "Mining process improvement",
  //   ],
  //   image: "/images/instructors/jane-doe.jpg",
  //   linkedinUrl: "https://www.linkedin.com/in/jane-doe-sixsigma/",
  //   yearsExperience: 18,
  // },
];

export function getInstructor(slug: string): Instructor | undefined {
  return instructors.find((i) => i.slug === slug);
}
