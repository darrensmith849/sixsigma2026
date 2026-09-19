/**
 * Vercel weekly cron: run the LLM citation monitor and email the report.
 *
 * Sends the markdown report via the Cloudflare Email binding to the address
 * configured via MONITOR_REPORT_TO (defaults to contact@2ko.co.za). Writes raw
 * snapshot JSON + markdown to disk so subsequent runs can diff against it.
 *
 * NOTE: this route is a leftover from Vercel and does not currently run. It
 * writes with `writeFileSync`, which has no filesystem on Workers, and
 * wrangler.jsonc declares no cron trigger, so nothing invokes it. The send is
 * converted here only so the repository holds no Brevo dependency; the route
 * itself needs rethinking before it can run on Cloudflare.
 *
 * Protected by `CRON_SECRET` Vercel env. Engines without API keys are
 * silently skipped — the report still ships with whichever engines responded.
 */
import { writeFileSync } from "node:fs";
import { getCloudflareContext } from "@opennextjs/cloudflare";
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

async function sendReportEmail(subject: string, body: string): Promise<{ ok: boolean; status: number; text?: string }> {
  try {
    const env = getCloudflareContext().env as unknown as {
      EMAIL?: {
        send: (m: {
          to: string | string[];
          from: { email: string; name?: string };
          subject: string;
          html: string;
          text: string;
        }) => Promise<unknown>;
      };
    };
    if (!env.EMAIL) return { ok: false, status: 0, text: "EMAIL binding not configured" };

    await env.EMAIL.send({
      to: REPORT_TO,
      from: { email: REPORT_FROM, name: "Six Sigma SA — AI Monitor" },
      subject,
      html: `<pre style="font-family: ui-monospace, monospace; white-space: pre-wrap;">${escapeHtml(body)}</pre>`,
      text: body,
    });
    return { ok: true, status: 202 };
  } catch (e) {
    return { ok: false, status: 500, text: e instanceof Error ? e.message : String(e) };
  }
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
  const sent = await sendReportEmail(subject, md);

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
