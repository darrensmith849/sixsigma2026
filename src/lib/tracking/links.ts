/**
 * Open-pixel and click-tracking URLs for mail this site sends.
 *
 * This is the signing half of a contract whose other half lives in the
 * 2kosystems Worker, which serves go.sixsigmasouthafrica.co.za and verifies
 * what is signed here. The two must agree byte for byte: HMAC-SHA256 over
 * "<messageId>\n<url>", truncated to the first 16 bytes, base64url without
 * padding. A disagreement does not fail loudly — it means every link in every
 * email returns 400 when a recipient clicks it, which nobody finds out about
 * until a customer says a link is broken.
 *
 * `scripts/check-tracking-signature.ts` pins the output against vectors taken
 * from the verifying implementation, and runs in CI before the build. A change
 * on either side that breaks the agreement fails the deploy instead of the
 * links. There is a third implementation in PHP for the Sigmafy portal, held to
 * the same vectors.
 *
 * Only the signing side is here. Verification, the redirect and the credential
 * decode belong to whoever serves the redirect, and duplicating them would be
 * two more things to keep in step for no gain.
 *
 * On honesty: an open is weak evidence. Apple Mail Privacy Protection fetches
 * every remote image whether or not a human looks at it, and Gmail proxies
 * images too, so a pixel hit means "this reached a mail system", not "somebody
 * read it". Clicks are the signal worth trusting.
 */

const enc = new TextEncoder();

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const b = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (const byte of b) s += String.fromCharCode(byte);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function key(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

/** Truncated to 16 bytes — long enough that forging is infeasible, short enough for a URL. */
async function sign(secret: string, messageId: string, url: string): Promise<string> {
  const mac = await crypto.subtle.sign(
    "HMAC",
    await key(secret),
    enc.encode(`${messageId}\n${url}`),
  );
  return b64url(new Uint8Array(mac).slice(0, 16));
}

export function pixelUrl(base: string, messageId: string): string {
  return `${base.replace(/\/$/, "")}/e/o/${messageId}.gif`;
}

export async function clickUrl(
  base: string,
  secret: string,
  messageId: string,
  destination: string,
): Promise<string> {
  const sig = await sign(secret, messageId, destination);
  const u = b64url(enc.encode(destination));
  return `${base.replace(/\/$/, "")}/e/c/${messageId}?u=${u}&s=${sig}`;
}

/**
 * A link whose URL is itself the credential. Never rewritten.
 *
 * Rewriting one would put a working authentication link into the ledger in
 * plain text, where the dashboard displays it. The pixel still fires on those
 * emails, so "did it arrive" is still answered.
 */
const CREDENTIAL_PARAMS = [
  "token", "signature", "expires", "secret", "otp", "code", "key",
  "auth", "access_token", "id_token", "invite", "confirmation",
];
const CREDENTIAL_PATHS =
  /\/(reset-password|password\/reset|verify-email|email\/verify|magic|magic-login|resume-by-email|auth\/callback|invitation|activate)\b/i;

export function carriesCredential(url: string): boolean {
  try {
    const u = new URL(url);
    if (CREDENTIAL_PATHS.test(u.pathname)) return true;
    for (const [k] of u.searchParams) {
      if (CREDENTIAL_PARAMS.includes(k.toLowerCase())) return true;
    }
    // A long opaque trailing segment is how most magic links look even when the
    // route name gives nothing away. But slugs are long too — course URLs like
    // `core-green-belt-classroom` are 25 characters — so a lowercase-hyphenated
    // run of words is explicitly not a token.
    const last = u.pathname.split("/").filter(Boolean).pop() ?? "";
    const isSlug = /^[a-z0-9]+(?:-[a-z0-9]+)+$/.test(last);
    const isFile = /\.[a-z0-9]{2,5}$/i.test(last);
    const looksRandom = /[A-Z]/.test(last) && /[a-z]/.test(last) && /\d/.test(last);
    if (!isSlug && !isFile && last.length >= 24 && /^[A-Za-z0-9._~-]+$/.test(last) && looksRandom) {
      return true;
    }
    return false;
  } catch {
    return true; // unparseable: do not touch it
  }
}

/**
 * Rewrite every http(s) anchor href through the click tracker, and append the
 * open pixel.
 *
 * Deliberately conservative. Only `href="..."` on anchors is touched — not
 * images, not CSS urls, nothing inside a `<style>` block. Three kinds of link
 * are left alone: unsubscribe (breaking it to measure it is the wrong side of a
 * POPIA line), anything already tracked, and anything `carriesCredential`
 * recognises. `tel:` and `mailto:` never match the pattern in the first place.
 */
export async function instrument(
  html: string,
  opts: {
    base: string;
    secret: string;
    messageId: string;
    trackClicks?: boolean;
    trackOpens?: boolean;
  },
): Promise<string> {
  let out = html;

  if (opts.trackClicks !== false) {
    const anchors = [...out.matchAll(/<a\b[^>]*?\bhref=["'](https?:\/\/[^"']+)["']/gi)];
    // Rewrite back-to-front so earlier indices stay valid.
    for (const m of anchors.reverse()) {
      const href = m[1];
      if (/unsubscribe|\/e\/c\//i.test(href)) continue;
      if (carriesCredential(href)) continue;
      const tracked = await clickUrl(opts.base, opts.secret, opts.messageId, href);
      const start = m.index! + m[0].lastIndexOf(href);
      out = out.slice(0, start) + tracked + out.slice(start + href.length);
    }
  }

  if (opts.trackOpens !== false) {
    const img = `<img src="${pixelUrl(opts.base, opts.messageId)}" width="1" height="1" alt="" style="display:none;width:1px;height:1px;border:0" />`;
    out = /<\/body>/i.test(out) ? out.replace(/<\/body>/i, `${img}</body>`) : out + img;
  }

  return out;
}
