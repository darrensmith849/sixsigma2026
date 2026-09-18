import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { topics } from "@/app/courses/[slug]/courseData";

/**
 * Belt comparison and "which one do I start with" guidance for /courses.
 *
 * Why this page needed it: /courses was a grid of cards and nothing else, so
 * it had no query of its own. It ranked 8.8 for "six sigma" and 2.5 for "six
 * sigma certification" — both of which the homepage already owns at 2.1 and
 * 1.5 — and converted the overlap at 0.5%. Two pages competing for one query
 * is a loss on both.
 *
 * A comparison is the one thing this page can hold that no belt page can: the
 * belts side by side, which is the actual question someone has before they
 * know which course to open. Server component, so the whole table is in the
 * HTML for crawlers and assistants rather than behind the client-side filter.
 */

/** The belt ladder, in progression order. Non-belt courses sit outside it. */
const LADDER = [
  "white-belt",
  "yellow-belt",
  "core-green-belt",
  "dmaic-green-belt",
  "lean-green-belt",
  "dmaic-black-belt",
  "lean-black-belt",
] as const;

/** What each belt qualifies you to actually do — the buyer's question. */
const ROLE: Record<string, string> = {
  "white-belt": "Understand the language and support a project",
  "yellow-belt": "Take part in a project team",
  "core-green-belt": "Lead small to medium projects end to end",
  "dmaic-green-belt": "Lead DMAIC problem-solving projects",
  "lean-green-belt": "Lead waste and flow projects",
  "dmaic-black-belt": "Lead complex projects and coach Green Belts",
  "lean-black-belt": "Lead Lean transformation across a site",
};

const belts = LADDER.map((slug) => topics.find((t) => t.slug === slug)!).filter(Boolean);

export const COMPARISON_FAQS = [
  {
    question: "Which Six Sigma belt should I start with?",
    answer:
      "If you have never done Six Sigma, start at Yellow Belt — it is the first qualification that teaches you DMAIC properly, and it has no prerequisite. White Belt is a half-day awareness course, useful for teams who need the language rather than the method. Go straight to Green Belt if you already work with process data and will be leading a project.",
  },
  {
    question: "What is the difference between Green Belt and Black Belt?",
    answer:
      "A Green Belt leads small to medium improvement projects themselves. A Black Belt leads complex projects, handles the heavier statistics, and coaches Green Belts. Green Belt is five days of training; Black Belt is ten.",
  },
  {
    question: "What is the difference between Core, DMAIC and Lean Green Belt?",
    answer:
      "Core Green Belt is the full curriculum and the one most employers mean by Green Belt. DMAIC Green Belt concentrates on the Define-Measure-Analyse-Improve-Control problem-solving sequence. Lean Green Belt concentrates on waste, flow and cycle time. All three carry the same CSSC accreditation.",
  },
  {
    question: "How long does Six Sigma certification take?",
    answer:
      "Classroom and live virtual courses run from half a day for White Belt up to ten days for Black Belt. Self-paced online versions take roughly two hours for White Belt and eighty hours for Black Belt, completed in your own time.",
  },
  {
    question: "Do I need a prerequisite to do Six Sigma certification?",
    answer:
      "White Belt and Yellow Belt have no prerequisite. Green Belt recommends Yellow Belt or equivalent working knowledge. Black Belt expects a Green Belt or real project experience.",
  },
  {
    question: "Are these Six Sigma courses accredited?",
    answer:
      "Yes. Every belt is accredited by the Council for Six Sigma Certification (CSSC) in the United States, and the certificate is recognised internationally.",
  },
];

export default function BeltComparison() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Compare the belts"
          subtitle="Seven qualifications, one ladder. This is what separates them and what each one qualifies you to do."
        >
          Which Six Sigma belt should you do?
        </SectionHeading>

        <div className="overflow-x-auto rounded-2xl border border-ink-200 [box-shadow:var(--shadow-sm)]">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead className="bg-ink-50">
              <tr>
                {["Belt", "Level", "What it qualifies you to do", "Classroom / virtual", "Self-paced online", "Prerequisite"].map((h) => (
                  <th key={h} className="px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {belts.map((b) => (
                <tr key={b.slug} className="border-t border-ink-100 align-top">
                  <td className="px-6 py-5">
                    <Link
                      href={`/courses/${b.slug}-classroom`}
                      className="text-[15px] font-semibold text-ink-900 underline-offset-4 hover:text-green-700 hover:underline"
                    >
                      {b.name}
                    </Link>
                  </td>
                  <td className="px-6 py-5 text-[14px] text-ink-700">{b.level}</td>
                  <td className="px-6 py-5 text-[14px] text-ink-700">{ROLE[b.slug]}</td>
                  <td className="px-6 py-5 text-[14px] text-ink-700">{b.duration.classroom}</td>
                  <td className="px-6 py-5 text-[14px] text-ink-700">{b.duration.online}</td>
                  <td className="px-6 py-5 text-[14px] text-ink-700">
                    {b.prerequisites.replace(/^None — /, "None. ") || "None"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="mb-8 text-center">Common questions</h2>
          <dl className="divide-y divide-ink-100 border-y border-ink-100">
            {COMPARISON_FAQS.map((f) => (
              <div key={f.question} className="py-6">
                <dt className="text-[17px] font-semibold text-ink-900">{f.question}</dt>
                <dd className="mt-3 text-[15px] leading-[1.7] text-ink-700">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
