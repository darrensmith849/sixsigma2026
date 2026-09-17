#!/usr/bin/env tsx
/**
 * Postbuild schema smoke test.
 *
 * Starts `next start` on a temporary port, fetches one representative URL per
 * page template, extracts every <script type="application/ld+json"> block,
 * and validates required fields. Exits non-zero on any error so CI catches
 * silently-broken schema before it hits production.
 *
 * The validator is intentionally permissive on "unknown @type" — those surface
 * as warnings, not errors. Required-field misses on known types are hard
 * failures.
 *
 * Run via `npm run build` (postbuild hook).
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { validateHtmlSchemas, type ValidationIssue } from "../src/seo-kit/schema/validate";

// One representative URL per template. Adding a new route shape here means
// the validator covers it; missing routes will be caught in production by
// the LLM monitor, but cheap to add coverage here.
const TARGET_PATHS = [
  "/",
  "/about",
  "/accreditation",
  "/training-benefits",
  "/services",
  "/contact",
  "/courses",
  "/courses/dmaic-green-belt-classroom", // one course detail page
  "/courses/in/johannesburg", // one city landing
  "/faqs",
  "/schedule",
  "/brochure",
];

const PORT = Number(process.env.VALIDATOR_PORT ?? 3100);
const BASE = `http://127.0.0.1:${PORT}`;
const STARTUP_TIMEOUT_MS = 30_000;
const READY_POLL_INTERVAL_MS = 250;

async function waitForReady(): Promise<void> {
  const deadline = Date.now() + STARTUP_TIMEOUT_MS;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(`${BASE}/robots.txt`);
      if (r.ok) return;
    } catch {
      // not yet
    }
    await sleep(READY_POLL_INTERVAL_MS);
  }
  throw new Error(`Server did not become ready within ${STARTUP_TIMEOUT_MS}ms`);
}

async function fetchHtml(path: string): Promise<string> {
  const r = await fetch(`${BASE}${path}`);
  if (!r.ok) throw new Error(`${path} → HTTP ${r.status}`);
  return r.text();
}

async function main() {
  console.log("[validate-schema] starting next on port", PORT);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
  });

  // Eat server output so a real error surfaces if startup hangs.
  server.stdout.on("data", () => {});
  server.stderr.on("data", () => {});

  let allIssues: Array<ValidationIssue & { url: string }> = [];

  try {
    await waitForReady();
    console.log("[validate-schema] server ready, fetching", TARGET_PATHS.length, "URLs");

    for (const path of TARGET_PATHS) {
      try {
        const html = await fetchHtml(path);
        const issues = validateHtmlSchemas(`${BASE}${path}`, html);
        allIssues.push(...issues);
      } catch (err) {
        allIssues.push({
          type: "FetchError",
          path: "$",
          message: (err as Error).message,
          url: `${BASE}${path}`,
        });
      }
    }
  } finally {
    server.kill("SIGTERM");
  }

  // Classify: missing required fields → hard error.
  // "No validation rules registered" → warning (we want to know but not fail).
  const errors = allIssues.filter(
    (i) => !i.message.startsWith("No validation rules registered"),
  );
  const warnings = allIssues.filter((i) =>
    i.message.startsWith("No validation rules registered"),
  );

  if (warnings.length) {
    console.log("\n[validate-schema] warnings:");
    for (const w of warnings) {
      console.log(`  ${w.url}  ${w.path}  ${w.message}`);
    }
  }

  if (errors.length) {
    console.error("\n[validate-schema] ERRORS:");
    for (const e of errors) {
      console.error(`  ${e.url}  ${e.path}  ${e.message}`);
    }
    console.error(
      `\n[validate-schema] ${errors.length} error(s) across ${TARGET_PATHS.length} routes — fix before deploying.`,
    );
    process.exit(1);
  }

  console.log(
    `\n[validate-schema] OK — ${TARGET_PATHS.length} routes, ${warnings.length} warning(s), 0 errors.`,
  );
}

main().catch((err) => {
  console.error("[validate-schema] fatal:", err);
  process.exit(1);
});
