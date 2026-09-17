/**
 * Vercel weekly cron: run the LLM citation monitor and email the report.
 *
 * Uses the existing Brevo wiring (BREVO_API_KEY env) to send the markdown
 * report to the address configured via MONITOR_REPORT_TO (defaults to
 * contact@2ko.co.za). Writes raw snapshot JSON + markdown to disk so
 * subsequent runs can diff against it.
 *
 * Protected by `CRON_SECRET` Vercel env. Engines without API keys are
 * silently skipped — the report still ships with whichever engines responded.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  DEFAULT_SNAPSHOT_DIR,
  diffSnapshots,
  readLatestPriorSnapshot,
  renderMarkdownReport,
  runMonitor,
  writeSnapshot,
} from "@/seo-kit/monitor/report";

const REPORT_TO = process.env.MONITOR_REPORT_TO ?? "contact@2ko.co.za";
const REPORT_FROM = process.env.MONITOR_REPORT_FROM ?? "noreply@2ko.co.za";

async function sendBrevoEmail(subject: string, body: string): Promise<{ ok: boolean; status: number; text?: string }> {
  if (!process.env.BREVO_API_KEY) {
    return { ok: false, status: 0, text: "BREVO_API_KEY not set" };
  }
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: REPORT_FROM, name: "Six Sigma SA — AI Monitor" },
      to: [{ email: REPORT_TO }],
      subject,
      htmlContent: `<pre style="font-family: ui-monospace, monospace; white-space: pre-wrap;">${escapeHtml(
        body,
      )}</pre>`,
      textContent: body,
    }),
  });
  let text: string | undefined;
  try {
    text = await res.text();
  } catch {
    // ignore
  }
  return { ok: res.ok, status: res.status, text };
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function GET(req: Request): Promise<Response> {
  const auth = req.headers.get("authorization");
  const expected = process.env.CRON_SECRET
    ? `Bearer ${process.env.CRON_SECRET}`
    : null;
  if (expected && auth !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  const snapshot = await runMonitor();
  const date = snapshot.ranAt.slice(0, 10);
  const prior = readLatestPriorSnapshot(DEFAULT_SNAPSHOT_DIR, date);
  const diff = diffSnapshots(prior, snapshot);
  let jsonPath: string | null = null;
  let mdPath: string | null = null;
  try {
    jsonPath = writeSnapshot(snapshot, DEFAULT_SNAPSHOT_DIR);
    const md = renderMarkdownReport(snapshot, diff);
    mdPath = join(DEFAULT_SNAPSHOT_DIR, `${date}.md`);
    writeFileSync(mdPath, md, "utf8");
  } catch (e) {
    // Disk writes can fail on Vercel's read-only FS in some configurations;
    // log but continue with the email — that's the primary deliverable.
    console.error("[llm-monitor cron] snapshot write failed:", (e as Error).message);
  }

  const md = renderMarkdownReport(snapshot, diff);
  const subject = `[ai-monitor] ${date} — ${Object.values(snapshot.citationCountByEngine).reduce((a, b) => a + b, 0)} citations`;
  const sent = await sendBrevoEmail(subject, md);

  return Response.json({
    ok: true,
    ranAt: snapshot.ranAt,
    engines: snapshot.citationCountByEngine,
    diff: {
      newlyCited: diff.newlyCited.length,
      newlyLost: diff.newlyLost.length,
      newCompetitorDomains: diff.newCompetitorDomains.length,
    },
    snapshotPath: jsonPath,
    reportPath: mdPath,
    email: { sent: sent.ok, status: sent.status },
  });
}
