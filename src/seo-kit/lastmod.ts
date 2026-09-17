/**
 * Git-based lastModified helpers for sitemaps.
 *
 * Why git, not filesystem mtime: on Vercel (and most CI deploys) the build
 * runs against a fresh checkout, so every file's mtime is the deploy time.
 * That tells search engines "everything changed on every deploy", which
 * dilutes the freshness signal. Using `git log -1` returns the real last-
 * modified time per file, which is what Bing/Google actually want.
 *
 * Strategy:
 *   - At prebuild, walk a list of route → source-file mappings and call
 *     `git log -1 --format=%cI -- <path>` for each. Cache to `data/lastmod.json`.
 *   - At runtime (sitemap.ts), read the cache. If a route isn't in the cache,
 *     fall back to deploy time.
 *
 * The cache is committed to disk during the prebuild step so sitemap.ts is
 * synchronous and doesn't require git inside the request path.
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

/**
 * Run `git log -1 --format=%cI -- <path>` and return the ISO date string, or
 * null if the file has no git history (uncommitted) or git itself isn't
 * available.
 */
export function gitLastModified(filePath: string): string | null {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    return out || null;
  } catch {
    return null;
  }
}

/**
 * Build a route → ISO-date lookup for a list of (routePath, sourceFile) pairs.
 *
 * Use at prebuild time; serialise the result to disk and read from sitemap.ts.
 */
export function buildLastmodMap(
  routes: Array<{ route: string; source: string }>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const { route, source } of routes) {
    const iso = gitLastModified(source);
    if (iso) out[route] = iso;
  }
  return out;
}

/**
 * Read a previously-built lastmod cache (produced by buildLastmodMap +
 * serialised to JSON). Returns an empty object if the cache is missing,
 * so callers can fall back to deploy time gracefully.
 */
export function readLastmodCache(jsonPath: string): Record<string, string> {
  if (!existsSync(jsonPath)) return {};
  try {
    return JSON.parse(readFileSync(jsonPath, "utf8")) as Record<string, string>;
  } catch {
    return {};
  }
}

/**
 * Look up an ISO timestamp for a route from the lastmod cache. Returns null
 * if the route isn't present, so callers can decide on a sensible fallback
 * (typically a hardcoded launch date or the current build time).
 */
export function lookupLastmod(
  cache: Record<string, string>,
  route: string,
): string | null {
  return cache[route] ?? null;
}
