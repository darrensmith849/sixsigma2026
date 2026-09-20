/**
 * Pin the tracking signature against the implementation that verifies it.
 *
 * The signing code in src/lib/tracking/links.ts has to agree byte for byte with
 * the verifier in the 2kosystems Worker, which serves
 * go.sixsigmasouthafrica.co.za. There is a third implementation in PHP for the
 * Sigmafy portal. Three copies of one algorithm is a standing invitation to
 * drift, and drift is silent: nothing errors, links simply start returning 400
 * when recipients click them, and the first report comes from a customer.
 *
 * These vectors were produced by the verifying implementation. If this fails,
 * one side has changed and the deploy should stop rather than ship mail whose
 * links do not work.
 *
 * The secret here is a fixed test value and deliberately not the real one — the
 * point is that a known input produces a known output, not to exercise the
 * production key.
 */
import { clickUrl, pixelUrl, carriesCredential } from "../src/lib/tracking/links";

const SECRET = "test-secret-do-not-use-in-production";
const BASE = "https://go.sixsigmasouthafrica.co.za";

const VECTORS: { messageId: string; destination: string; expected: string }[] = [
  {
    messageId: "11111111-1111-4111-8111-111111111111",
    destination: "https://www.sixsigmasouthafrica.co.za/courses",
    expected: `${BASE}/e/c/11111111-1111-4111-8111-111111111111?u=aHR0cHM6Ly93d3cuc2l4c2lnbWFzb3V0aGFmcmljYS5jby56YS9jb3Vyc2Vz&s=jaZuokAtsDUa2QXI5n8CTA`,
  },
  {
    messageId: "22222222-2222-4222-8222-222222222222",
    destination: "https://www.sixsigmasouthafrica.co.za/courses/core-green-belt-classroom",
    expected: `${BASE}/e/c/22222222-2222-4222-8222-222222222222?u=aHR0cHM6Ly93d3cuc2l4c2lnbWFzb3V0aGFmcmljYS5jby56YS9jb3Vyc2VzL2NvcmUtZ3JlZW4tYmVsdC1jbGFzc3Jvb20&s=Jf_x32uPu_24Q3jU87VSww`,
  },
  {
    // Query strings survive the round trip intact.
    messageId: "33333333-3333-4333-8333-333333333333",
    destination: "https://example.com/a?b=1&c=2",
    expected: `${BASE}/e/c/33333333-3333-4333-8333-333333333333?u=aHR0cHM6Ly9leGFtcGxlLmNvbS9hP2I9MSZjPTI&s=SyA89iM1p7hgrkDrA9ET_A`,
  },
  {
    // Non-ASCII, which is where a UTF-8 versus Latin-1 mistake would show up.
    messageId: "44444444-4444-4444-8444-444444444444",
    destination: "https://example.com/unicode/café",
    expected: `${BASE}/e/c/44444444-4444-4444-8444-444444444444?u=aHR0cHM6Ly9leGFtcGxlLmNvbS91bmljb2RlL2NhZsOp&s=kCd3hUDnwLr7OoubMEewcA`,
  },
];

/** Links that must never be rewritten, and the slug that must not be mistaken for one. */
const CREDENTIAL_CASES: [string, boolean][] = [
  ["https://portal.sigmafy.co/reset-password/abc", true],
  ["https://portal.sigmafy.co/x?token=abc123", true],
  ["https://www.sixsigmasouthafrica.co.za/courses/core-green-belt-classroom", false],
  ["https://www.sixsigmasouthafrica.co.za/brochure.pdf", false],
];

async function main() {
  let failures = 0;

  for (const v of VECTORS) {
    const got = await clickUrl(BASE, SECRET, v.messageId, v.destination);
    if (got === v.expected) {
      console.log(`  ok    ${v.destination}`);
    } else {
      failures += 1;
      console.error(`  FAIL  ${v.destination}\n        expected ${v.expected}\n        got      ${got}`);
    }
  }

  const pixel = pixelUrl(BASE, VECTORS[0].messageId);
  const wantPixel = `${BASE}/e/o/${VECTORS[0].messageId}.gif`;
  if (pixel === wantPixel) {
    console.log("  ok    pixel url");
  } else {
    failures += 1;
    console.error(`  FAIL  pixel url\n        expected ${wantPixel}\n        got      ${pixel}`);
  }

  for (const [url, want] of CREDENTIAL_CASES) {
    const got = carriesCredential(url);
    if (got === want) {
      console.log(`  ok    carriesCredential(${want}) ${url}`);
    } else {
      failures += 1;
      console.error(`  FAIL  carriesCredential expected ${want}, got ${got} for ${url}`);
    }
  }

  if (failures > 0) {
    console.error(`\n${failures} tracking signature check(s) failed — the signing and verifying sides disagree.`);
    process.exit(1);
  }
  console.log("\nTracking signature matches the verifier.");
}

main();
