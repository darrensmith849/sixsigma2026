/**
 * IndexNow client + key-file route factory.
 *
 * IndexNow is the protocol behind near-real-time indexing on Bing, Yandex, and
 * Seznam — which is the same retrieval surface used by ChatGPT search and
 * Copilot. One POST per deploy is enough to trigger re-crawl of every changed
 * URL within minutes (vs days for a passive sitemap pull).
 *
 * Per the spec, the verification key file must be served at
 * `https://<host>/<key>.txt` and respond with the literal key as its body.
 * We dynamic-route that file under src/app/[indexnowKey].txt so it stays
 * centrally managed.
 */

/**
 * Stable IndexNow key for this site. Generated once per site.
 *
 * The key is published at `public/<KEY>.txt` (Next.js serves /public files
 * verbatim). To rotate, change this constant AND rename the public file to
 * match — IndexNow's verification fetches `https://<host>/<key>.txt` and
 * compares the body to the key.
 *
 * Regenerate per-site with `crypto.randomUUID()` (Node 19+) or `uuidgen`.
 */
export const INDEXNOW_KEY = "c1d2e3f4a5b67890c1d2e3f4a5b67890" as const;

export interface PingIndexNowInput {
  host: string;
  /** Absolute URLs to submit. */
  urls: string[];
  key?: string;
  keyLocation?: string;
}

export interface PingIndexNowResult {
  ok: boolean;
  status: number;
  submittedCount: number;
  body?: string;
}

/**
 * Submit a batch of URLs to IndexNow.
 *
 * No-ops with `ok: true` if `urls` is empty — saves a wasted round-trip when
 * the delta filter trims everything.
 */
export async function pingIndexNow(
  input: PingIndexNowInput,
): Promise<PingIndexNowResult> {
  if (input.urls.length === 0) {
    return { ok: true, status: 200, submittedCount: 0, body: "no-op" };
  }
  const key = input.key ?? INDEXNOW_KEY;
  const keyLocation =
    input.keyLocation ?? `https://${input.host}/${key}.txt`;

  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: input.host,
      key,
      keyLocation,
      urlList: input.urls,
    }),
  });

  let body: string | undefined;
  try {
    body = await res.text();
  } catch {
    // ignore
  }

  return {
    ok: res.ok,
    status: res.status,
    submittedCount: input.urls.length,
    body,
  };
}

/**
 * Filter `routes` (paths) to only those whose lastmod is newer than the last
 * successful ping timestamp. Returns the absolute URLs to submit.
 */
export function filterDeltaUrls(
  host: string,
  routes: Array<{ path: string; lastModifiedIso: string }>,
  lastPingIso: string | null,
): string[] {
  const cutoff = lastPingIso ? new Date(lastPingIso).getTime() : 0;
  return routes
    .filter((r) => new Date(r.lastModifiedIso).getTime() > cutoff)
    .map((r) =>
      r.path === "/" ? `https://${host}` : `https://${host}${r.path}`,
    );
}
