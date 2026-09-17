/**
 * llms.txt curated index generator.
 *
 * Follows the convention at https://llmstxt.org/ — a markdown document at the
 * site root that gives LLM agents a fast, curated map of what to read. We ship
 * the curated index only (not the full content dump); the entire site is
 * statically rendered and crawlable via sitemap.xml, so /llms-full.txt would
 * just duplicate content.
 */
import type { LlmsTxtConfig, LlmsEntry, LlmsSection } from "./types";

/**
 * Render an llms.txt config object to spec-compliant markdown.
 *
 * Output format:
 *
 *   # <siteName>
 *   > <summary>
 *
 *   <optional intro paragraph>
 *
 *   ## <section title>
 *   - [<entry title>](<absolute url>): <entry description>
 */
export function generateLlmsTxt(config: LlmsTxtConfig): string {
  const lines: string[] = [];

  lines.push(`# ${config.siteName}`);
  lines.push("");
  lines.push(`> ${config.summary}`);
  lines.push("");

  if (config.intro) {
    lines.push(config.intro.trim());
    lines.push("");
  }

  for (const section of config.sections) {
    lines.push(`## ${section.title}`);
    lines.push("");
    for (const entry of section.entries) {
      lines.push(renderEntry(entry, config.siteUrl));
    }
    lines.push("");
  }

  return lines.join("\n");
}

function renderEntry(entry: LlmsEntry, siteUrl: string): string {
  const absoluteUrl = entry.url.startsWith("http")
    ? entry.url
    : `${siteUrl}${entry.url}`;
  const suffix = entry.description ? `: ${entry.description}` : "";
  return `- [${entry.title}](${absoluteUrl})${suffix}`;
}

export type { LlmsTxtConfig, LlmsEntry, LlmsSection };
