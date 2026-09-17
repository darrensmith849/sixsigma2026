/**
 * Per-engine runners for the citation monitor.
 *
 * Each runner sends a single prompt to its engine's "answer + web search"
 * surface, parses the response for cited URLs, and returns a normalised
 * EngineResult. Engines without an API key in env are skipped — `available()`
 * returns false and the monitor silently moves on.
 *
 * Citation parsing is necessarily heuristic:
 *   - Some APIs (Perplexity) return citations as a structured list
 *   - Others (Anthropic web_search) embed citations in tool_use content
 *   - OpenAI Responses API returns annotations
 *   - Gemini grounding returns grounding_chunks
 *
 * When a new API version changes shape, only this file needs updating —
 * downstream report code consumes the normalised shape.
 */

export interface EngineResult {
  engine: EngineId;
  promptId: string;
  prompt: string;
  responseText: string;
  /** Hostnames (no protocol, no trailing slash) extracted from the response. */
  citedDomains: string[];
  /** Full URLs cited. Duplicates removed. */
  citedUrls: string[];
  /** Did the response cite any TRACKED_DOMAINS hostname? */
  cited: boolean;
  /** When the run completed, ISO 8601. */
  ranAt: string;
  /** Raw API response — kept for debugging, can grow large. */
  raw?: unknown;
  /** Set when the engine errored; responseText/citations will be empty. */
  error?: string;
}

export type EngineId = "claude" | "chatgpt" | "perplexity" | "gemini";

export interface Engine {
  id: EngineId;
  available(): boolean;
  run(promptId: string, prompt: string, trackedDomains: string[]): Promise<EngineResult>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function hostname(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

function extractUrlsFromText(text: string): string[] {
  // Liberal URL pattern that catches both bare URLs and markdown-style links.
  const re = /https?:\/\/[^\s)<>\]"']+/g;
  const matches = text.match(re) ?? [];
  return uniq(matches.map((u) => u.replace(/[.,;!?]+$/, "")));
}

function isCited(domains: string[], tracked: string[]): boolean {
  return domains.some((d) =>
    tracked.some((t) => d === t.toLowerCase() || d.endsWith(`.${t.toLowerCase()}`)),
  );
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`timeout after ${ms}ms`)), ms),
    ),
  ]);
}

function ranAt(): string {
  return new Date().toISOString();
}

function err(
  engine: EngineId,
  promptId: string,
  prompt: string,
  message: string,
): EngineResult {
  return {
    engine,
    promptId,
    prompt,
    responseText: "",
    citedDomains: [],
    citedUrls: [],
    cited: false,
    ranAt: ranAt(),
    error: message,
  };
}

// ─── Claude (Anthropic) ──────────────────────────────────────────────────

export const ClaudeEngine: Engine = {
  id: "claude",
  available: () => Boolean(process.env.ANTHROPIC_API_KEY),
  async run(promptId, prompt, tracked) {
    if (!this.available()) {
      return err("claude", promptId, prompt, "ANTHROPIC_API_KEY not set");
    }
    try {
      const res = await withTimeout(
        fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "x-api-key": process.env.ANTHROPIC_API_KEY!,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            model: process.env.ANTHROPIC_MODEL ?? "claude-opus-4-5",
            max_tokens: 2048,
            tools: [
              {
                type: "web_search_20250305",
                name: "web_search",
                max_uses: 5,
              },
            ],
            messages: [{ role: "user", content: prompt }],
          }),
        }),
        60_000,
      );
      const json = (await res.json()) as Record<string, unknown>;
      if (!res.ok) {
        return err("claude", promptId, prompt, `${res.status}: ${JSON.stringify(json).slice(0, 200)}`);
      }
      // Concatenate text content blocks for full response text.
      const blocks = (json.content ?? []) as Array<Record<string, unknown>>;
      const textParts: string[] = [];
      const urls: string[] = [];
      for (const b of blocks) {
        if (b.type === "text" && typeof b.text === "string") {
          textParts.push(b.text);
          urls.push(...extractUrlsFromText(b.text));
          // Citations attached to text blocks (Anthropic returns these as
          // an array of {url, title, ...} entries).
          const citations = (b.citations ?? []) as Array<Record<string, unknown>>;
          for (const c of citations) {
            if (typeof c.url === "string") urls.push(c.url);
          }
        } else if (b.type === "web_search_tool_result") {
          // Search results returned to Claude — these are URLs the engine SAW
          // but may not have cited in its final answer. We include them as
          // weak evidence of presence.
          const content = (b.content ?? []) as Array<Record<string, unknown>>;
          for (const r of content) {
            if (typeof r.url === "string") urls.push(r.url);
          }
        }
      }
      const responseText = textParts.join("\n");
      const dedupedUrls = uniq(urls);
      const domains = uniq(
        dedupedUrls.map(hostname).filter((d): d is string => !!d),
      );
      return {
        engine: "claude",
        promptId,
        prompt,
        responseText,
        citedDomains: domains,
        citedUrls: dedupedUrls,
        cited: isCited(domains, tracked),
        ranAt: ranAt(),
        raw: json,
      };
    } catch (e) {
      return err("claude", promptId, prompt, (e as Error).message);
    }
  },
};

// ─── ChatGPT (OpenAI Responses API + web search) ─────────────────────────

export const ChatGPTEngine: Engine = {
  id: "chatgpt",
  available: () => Boolean(process.env.OPENAI_API_KEY),
  async run(promptId, prompt, tracked) {
    if (!this.available()) {
      return err("chatgpt", promptId, prompt, "OPENAI_API_KEY not set");
    }
    try {
      const res = await withTimeout(
        fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: {
            authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL ?? "gpt-4.1",
            input: prompt,
            tools: [{ type: "web_search_preview" }],
          }),
        }),
        60_000,
      );
      const json = (await res.json()) as Record<string, unknown>;
      if (!res.ok) {
        return err("chatgpt", promptId, prompt, `${res.status}: ${JSON.stringify(json).slice(0, 200)}`);
      }
      // Walk the output array; collect text + URL citations from annotations.
      const output = (json.output ?? []) as Array<Record<string, unknown>>;
      const textParts: string[] = [];
      const urls: string[] = [];
      for (const item of output) {
        if (item.type === "message") {
          const content = (item.content ?? []) as Array<Record<string, unknown>>;
          for (const c of content) {
            if (typeof c.text === "string") {
              textParts.push(c.text);
              urls.push(...extractUrlsFromText(c.text));
            }
            const annotations = (c.annotations ?? []) as Array<Record<string, unknown>>;
            for (const a of annotations) {
              if (a.type === "url_citation" && typeof a.url === "string") {
                urls.push(a.url);
              }
            }
          }
        }
      }
      const responseText = textParts.join("\n");
      const dedupedUrls = uniq(urls);
      const domains = uniq(
        dedupedUrls.map(hostname).filter((d): d is string => !!d),
      );
      return {
        engine: "chatgpt",
        promptId,
        prompt,
        responseText,
        citedDomains: domains,
        citedUrls: dedupedUrls,
        cited: isCited(domains, tracked),
        ranAt: ranAt(),
        raw: json,
      };
    } catch (e) {
      return err("chatgpt", promptId, prompt, (e as Error).message);
    }
  },
};

// ─── Perplexity ──────────────────────────────────────────────────────────

export const PerplexityEngine: Engine = {
  id: "perplexity",
  available: () => Boolean(process.env.PERPLEXITY_API_KEY),
  async run(promptId, prompt, tracked) {
    if (!this.available()) {
      return err("perplexity", promptId, prompt, "PERPLEXITY_API_KEY not set");
    }
    try {
      const res = await withTimeout(
        fetch("https://api.perplexity.ai/chat/completions", {
          method: "POST",
          headers: {
            authorization: `Bearer ${process.env.PERPLEXITY_API_KEY!}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            model: process.env.PERPLEXITY_MODEL ?? "sonar-pro",
            messages: [{ role: "user", content: prompt }],
          }),
        }),
        60_000,
      );
      const json = (await res.json()) as Record<string, unknown>;
      if (!res.ok) {
        return err("perplexity", promptId, prompt, `${res.status}: ${JSON.stringify(json).slice(0, 200)}`);
      }
      const choices = (json.choices ?? []) as Array<Record<string, unknown>>;
      const message = choices[0]?.message as Record<string, unknown> | undefined;
      const responseText =
        typeof message?.content === "string" ? message.content : "";
      const citations = (json.citations ?? []) as string[];
      const urls = uniq([...citations, ...extractUrlsFromText(responseText)]);
      const domains = uniq(
        urls.map(hostname).filter((d): d is string => !!d),
      );
      return {
        engine: "perplexity",
        promptId,
        prompt,
        responseText,
        citedDomains: domains,
        citedUrls: urls,
        cited: isCited(domains, tracked),
        ranAt: ranAt(),
        raw: json,
      };
    } catch (e) {
      return err("perplexity", promptId, prompt, (e as Error).message);
    }
  },
};

// ─── Gemini (Google AI / generative-language API) ────────────────────────

export const GeminiEngine: Engine = {
  id: "gemini",
  available: () => Boolean(process.env.GEMINI_API_KEY),
  async run(promptId, prompt, tracked) {
    if (!this.available()) {
      return err("gemini", promptId, prompt, "GEMINI_API_KEY not set");
    }
    try {
      const model = process.env.GEMINI_MODEL ?? "gemini-2.5-pro";
      const res = await withTimeout(
        fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: prompt }] }],
              tools: [{ google_search: {} }],
            }),
          },
        ),
        60_000,
      );
      const json = (await res.json()) as Record<string, unknown>;
      if (!res.ok) {
        return err("gemini", promptId, prompt, `${res.status}: ${JSON.stringify(json).slice(0, 200)}`);
      }
      const candidates = (json.candidates ?? []) as Array<Record<string, unknown>>;
      const cand = candidates[0];
      const content = cand?.content as Record<string, unknown> | undefined;
      const parts = (content?.parts ?? []) as Array<Record<string, unknown>>;
      const textParts = parts
        .map((p) => (typeof p.text === "string" ? p.text : ""))
        .filter(Boolean);
      const responseText = textParts.join("\n");
      const groundingMetadata = (cand?.groundingMetadata ?? {}) as Record<string, unknown>;
      const chunks = (groundingMetadata.groundingChunks ?? []) as Array<Record<string, unknown>>;
      const urls: string[] = [];
      for (const c of chunks) {
        const web = c.web as Record<string, unknown> | undefined;
        if (web && typeof web.uri === "string") urls.push(web.uri);
      }
      urls.push(...extractUrlsFromText(responseText));
      const dedupedUrls = uniq(urls);
      const domains = uniq(
        dedupedUrls.map(hostname).filter((d): d is string => !!d),
      );
      return {
        engine: "gemini",
        promptId,
        prompt,
        responseText,
        citedDomains: domains,
        citedUrls: dedupedUrls,
        cited: isCited(domains, tracked),
        ranAt: ranAt(),
        raw: json,
      };
    } catch (e) {
      return err("gemini", promptId, prompt, (e as Error).message);
    }
  },
};

export const ALL_ENGINES: Engine[] = [
  ClaudeEngine,
  ChatGPTEngine,
  PerplexityEngine,
  GeminiEngine,
];
