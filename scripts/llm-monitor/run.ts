#!/usr/bin/env tsx
/**
 * Local entrypoint for the LLM citation monitor.
 *
 *   npx tsx scripts/llm-monitor/run.ts
 *
 * Reads ANTHROPIC_API_KEY / OPENAI_API_KEY / PERPLEXITY_API_KEY / GEMINI_API_KEY
 * from env (use .env.local in dev). Engines without keys are skipped silently.
 *
 * Writes:
 *   - data/llm-monitor/<iso-date>.json    raw snapshot
 *   - data/llm-monitor/<iso-date>.md      human-readable report
 *
 * Designed for ad-hoc debugging — the Vercel cron uses the same runMonitor()
 * code via src/app/api/cron/llm-monitor/route.ts.
 */
import { config as loadEnv } from "dotenv";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  DEFAULT_SNAPSHOT_DIR,
  diffSnapshots,
  readLatestPriorSnapshot,
  renderMarkdownReport,
  runMonitor,
  writeSnapshot,
} from "../../src/seo-kit/monitor/report";

// Load .env.local (where API keys live in dev).
loadEnv({ path: ".env.local" });
loadEnv();

async function main() {
  console.log("[llm-monitor] running…");
  const snapshot = await runMonitor();
  const dir = DEFAULT_SNAPSHOT_DIR;
  const date = snapshot.ranAt.slice(0, 10);
  const prior = readLatestPriorSnapshot(dir, date);
  const diff = diffSnapshots(prior, snapshot);
  const jsonPath = writeSnapshot(snapshot, dir);
  const md = renderMarkdownReport(snapshot, diff);
  const mdPath = join(dir, `${date}.md`);
  writeFileSync(mdPath, md, "utf8");
  console.log(`[llm-monitor] wrote ${jsonPath}`);
  console.log(`[llm-monitor] wrote ${mdPath}`);
  console.log("\n────── report ──────\n");
  console.log(md);
}

main().catch((err) => {
  console.error("[llm-monitor] fatal:", err);
  process.exit(1);
});
