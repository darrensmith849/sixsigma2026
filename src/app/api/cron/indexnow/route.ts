/**
 * Vercel cron: nightly IndexNow ping.
 *
 * Reads the lastmod cache built at prebuild time and submits only the URLs
 * whose timestamps are newer than the last successful ping. Persists the
 * last-ping timestamp to data/last-indexnow.json so subsequent runs are
 * delta-only — avoids spamming IndexNow with the entire sitemap every night.
 *
 * Protected by `CRON_SECRET` Vercel env (auto-provided by the Vercel cron
 * runtime) so it can't be triggered by the public internet.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { readLastmodCache } from "@/seo-kit/lastmod";
import { filterDeltaUrls, pingIndexNow } from "@/seo-kit/indexnow";

const LAST_PING_PATH = resolve(process.cwd(), "data/last-indexnow.json");

interface LastPingState {
  lastIso: string;
  lastResult: {
    ok: boolean;
    status: number;
    submittedCount: number;
  };
}

function readLastPing(): LastPingState | null {
  if (!existsSync(LAST_PING_PATH)) return null;
  try {
    return JSON.parse(readFileSync(LAST_PING_PATH, "utf8")) as LastPingState;
  } catch {
    return null;
  }
}

function writeLastPing(state: LastPingState): void {
  mkdirSync(dirname(LAST_PING_PATH), { recursive: true });
  writeFileSync(LAST_PING_PATH, JSON.stringify(state, null, 2) + "\n", "utf8");
}

function deriveHost(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sixsigmasouthafrica.co.za";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export async function GET(req: Request): Promise<Response> {
  // Vercel cron requests carry an `Authorization: Bearer <CRON_SECRET>` header.
  // Reject anything else so the route isn't a public deploy-trigger.
  const auth = req.headers.get("authorization");
  const expected = process.env.CRON_SECRET
    ? `Bearer ${process.env.CRON_SECRET}`
    : null;
  if (expected && auth !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  const cache = readLastmodCache(resolve(process.cwd(), "data/lastmod.json"));
  const routes = Object.entries(cache).map(([path, lastModifiedIso]) => ({
    path,
    lastModifiedIso,
  }));

  const host = deriveHost();
  const last = readLastPing();
  const urls = filterDeltaUrls(host, routes, last?.lastIso ?? null);

  const result = await pingIndexNow({ host, urls });

  const now = new Date().toISOString();
  writeLastPing({
    lastIso: now,
    lastResult: {
      ok: result.ok,
      status: result.status,
      submittedCount: result.submittedCount,
    },
  });

  return Response.json({
    ok: result.ok,
    submitted: result.submittedCount,
    status: result.status,
    host,
    previousPing: last?.lastIso ?? null,
    body: result.body,
  });
}
