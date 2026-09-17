/**
 * Run-the-monitor + snapshot + markdown report.
 *
 * One run = run every (engine × prompt) pair, collect EngineResults, write the
 * raw snapshot to `data/llm-monitor/<iso-date>.json`, diff against the most
 * recent prior snapshot, and emit a human-readable markdown report.
 *
 * Designed to run in either:
 *   - a local shell (`tsx scripts/llm-monitor/run.ts`)
 *   - a Vercel cron API route (writes to a tmp dir, emails the markdown)
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { PROMPTS, TRACKED_DOMAINS, type MonitoredPrompt } from "./prompts";
import { ALL_ENGINES, type Engine, type EngineId, type EngineResult } from "./runners";

export interface MonitorSnapshot {
  ranAt: string;
  results: EngineResult[];
  /** Sum of `cited` across engines, per prompt. */
  citationCountByPrompt: Record<string, number>;
  /** Sum of `cited` across prompts, per engine. */
  citationCountByEngine: Record<EngineId, number>;
}

export interface MonitorDiff {
  newlyCited: Array<{ engine: EngineId; promptId: string }>;
  newlyLost: Array<{ engine: EngineId; promptId: string }>;
  /** New competitor domains seen this run, with counts. */
  newCompetitorDomains: Array<{ domain: string; count: number }>;
}

export async function runMonitor(
  engines: Engine[] = ALL_ENGINES,
  prompts: MonitoredPrompt[] = PROMPTS,
): Promise<MonitorSnapshot> {
  const available = engines.filter((e) => e.available());
  const results: EngineResult[] = [];

  for (const prompt of prompts) {
    for (const engine of available) {
      const r = await engine.run(prompt.id, prompt.prompt, TRACKED_DOMAINS);
      results.push(r);
    }
  }

  const citationCountByPrompt: Record<string, number> = {};
  const citationCountByEngine = {
    claude: 0,
    chatgpt: 0,
    perplexity: 0,
    gemini: 0,
  } as Record<EngineId, number>;

  for (const r of results) {
    if (r.cited) {
      citationCountByPrompt[r.promptId] =
        (citationCountByPrompt[r.promptId] ?? 0) + 1;
      citationCountByEngine[r.engine] =
        (citationCountByEngine[r.engine] ?? 0) + 1;
    }
  }

  return {
    ranAt: new Date().toISOString(),
    results,
    citationCountByPrompt,
    citationCountByEngine,
  };
}

export function snapshotPath(snapshot: MonitorSnapshot, dir: string): string {
  const date = snapshot.ranAt.slice(0, 10);
  return join(dir, `${date}.json`);
}

export function writeSnapshot(snapshot: MonitorSnapshot, dir: string): string {
  mkdirSync(dir, { recursive: true });
  const path = snapshotPath(snapshot, dir);
  writeFileSync(path, JSON.stringify(snapshot, null, 2) + "\n", "utf8");
  return path;
}

export function readLatestPriorSnapshot(
  dir: string,
  excludeDate?: string,
): MonitorSnapshot | null {
  if (!existsSync(dir)) return null;
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .filter((f) => (excludeDate ? !f.startsWith(excludeDate) : true))
    .sort()
    .reverse();
  if (files.length === 0) return null;
  try {
    return JSON.parse(readFileSync(join(dir, files[0]), "utf8")) as MonitorSnapshot;
  } catch {
    return null;
  }
}

export function diffSnapshots(
  prior: MonitorSnapshot | null,
  current: MonitorSnapshot,
): MonitorDiff {
  if (!prior) {
    return { newlyCited: [], newlyLost: [], newCompetitorDomains: [] };
  }
  const priorIdx = new Map<string, boolean>();
  for (const r of prior.results) {
    priorIdx.set(`${r.engine}::${r.promptId}`, r.cited);
  }
  const currentIdx = new Map<string, boolean>();
  for (const r of current.results) {
    currentIdx.set(`${r.engine}::${r.promptId}`, r.cited);
  }
  const newlyCited: MonitorDiff["newlyCited"] = [];
  const newlyLost: MonitorDiff["newlyLost"] = [];
  for (const [key, cited] of currentIdx.entries()) {
    const wasCited = priorIdx.get(key) ?? false;
    if (cited && !wasCited) {
      const [engine, promptId] = key.split("::") as [EngineId, string];
      newlyCited.push({ engine, promptId });
    } else if (!cited && wasCited) {
      const [engine, promptId] = key.split("::") as [EngineId, string];
      newlyLost.push({ engine, promptId });
    }
  }
  // Competitor domains: aggregate non-tracked domains seen this run, dedup
  // against prior, count occurrences.
  const priorDomains = new Set<string>();
  for (const r of prior.results) {
    for (const d of r.citedDomains) priorDomains.add(d);
  }
  const currentDomainCounts = new Map<string, number>();
  for (const r of current.results) {
    for (const d of r.citedDomains) {
      if (TRACKED_DOMAINS.includes(d)) continue;
      currentDomainCounts.set(d, (currentDomainCounts.get(d) ?? 0) + 1);
    }
  }
  const newCompetitorDomains = Array.from(currentDomainCounts.entries())
    .filter(([d]) => !priorDomains.has(d))
    .map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 25);
  return { newlyCited, newlyLost, newCompetitorDomains };
}

export function renderMarkdownReport(
  snapshot: MonitorSnapshot,
  diff: MonitorDiff,
): string {
  const lines: string[] = [];
  const promptById = new Map(PROMPTS.map((p) => [p.id, p]));
  lines.push(`# AI-search citation snapshot — ${snapshot.ranAt.slice(0, 10)}`);
  lines.push("");
  const engines = Object.entries(snapshot.citationCountByEngine).filter(
    ([, c]) => c >= 0,
  );
  lines.push("## Citations by engine");
  lines.push("");
  lines.push("| Engine | Prompts cited | Out of |");
  lines.push("|---|---:|---:|");
  for (const [engine, count] of engines) {
    lines.push(`| ${engine} | ${count} | ${PROMPTS.length} |`);
  }
  lines.push("");
  lines.push("## Newly cited this run");
  if (diff.newlyCited.length === 0) {
    lines.push("_(none)_");
  } else {
    for (const n of diff.newlyCited) {
      const p = promptById.get(n.promptId);
      lines.push(`- **${n.engine}** — ${p?.prompt ?? n.promptId}`);
    }
  }
  lines.push("");
  lines.push("## Newly lost this run");
  if (diff.newlyLost.length === 0) {
    lines.push("_(none)_");
  } else {
    for (const n of diff.newlyLost) {
      const p = promptById.get(n.promptId);
      lines.push(`- **${n.engine}** — ${p?.prompt ?? n.promptId}`);
    }
  }
  lines.push("");
  lines.push("## New competitor domains (top 25 by occurrence)");
  if (diff.newCompetitorDomains.length === 0) {
    lines.push("_(none)_");
  } else {
    for (const d of diff.newCompetitorDomains) {
      lines.push(`- ${d.domain} (${d.count}×)`);
    }
  }
  lines.push("");
  lines.push("## Per-prompt breakdown");
  for (const p of PROMPTS) {
    const count = snapshot.citationCountByPrompt[p.id] ?? 0;
    lines.push(`### ${p.id} — ${count}/${ALL_ENGINES.length} engines cited`);
    lines.push(`> ${p.prompt}`);
    for (const r of snapshot.results.filter((r) => r.promptId === p.id)) {
      const marker = r.cited ? "✅" : r.error ? "⚠️" : "·";
      lines.push(`- ${marker} **${r.engine}**${r.error ? ` — error: ${r.error}` : ""}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

export const DEFAULT_SNAPSHOT_DIR = resolve(process.cwd(), "data/llm-monitor");
