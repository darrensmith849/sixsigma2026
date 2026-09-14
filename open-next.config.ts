import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Minimal OpenNext config for Cloudflare. The site is almost entirely
// statically generated; the only dynamic code is the /api/contact route
// (Node runtime, fetch-only → Brevo/OpenAI/Sigmafy). No incremental cache
// backend is configured here — add an R2 cache later if ISR is introduced.
export default defineCloudflareConfig();
