/**
 * Content loader for Markdown/MDX files with YAML frontmatter.
 *
 * Reads `content/<dir>/*.md` files from the repo root at build/render time,
 * parses frontmatter with gray-matter, and renders the markdown body with
 * marked. Lightweight by design — content is in-repo, no CMS, no headless
 * backend, no database round-trips per request.
 *
 * Used by Phase D.1 /insights routes; reusable for any future content
 * surface (newsletters, case studies, etc.) by passing a different dir.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export interface ContentFrontmatter {
  title: string;
  summary: string;
  /** ISO 8601 date string. */
  datePublished: string;
  /** ISO 8601 date string; defaults to datePublished. */
  dateModified?: string;
  /** Slug of the author in src/data/instructors.ts (or "team" for the
   *  Organization as author). Falls back to "team" if unset. */
  authorSlug?: string;
  /** Open-graph image absolute or root-relative URL. */
  image?: string;
  /** Free-form topic tags. */
  tags?: string[];
  /** External sources cited by this post — populates Article.citation. */
  citations?: Array<{ url: string; title?: string }>;
  /** On-site entities mentioned — populates Article.mentions. */
  mentions?: Array<{ url: string; name?: string }>;
  /** Set to true to keep the post in-repo but exclude from list pages and
   *  the sitemap. Useful for drafts. */
  draft?: boolean;
}

export interface ContentPost {
  slug: string;
  frontmatter: ContentFrontmatter;
  /** Parsed markdown body rendered to HTML. */
  html: string;
  /** Raw markdown body (unrendered) — useful for excerpting. */
  body: string;
}

/**
 * Synchronously load and parse every .md/.mdx file in `content/<dir>/`.
 *
 * Throws if the directory doesn't exist — but the lister below catches that
 * so the /insights route still ships when the folder is empty.
 */
function loadAllPosts(dir: string): ContentPost[] {
  const root = resolve(process.cwd(), "content", dir);
  let entries: string[];
  try {
    entries = readdirSync(root);
  } catch {
    return [];
  }
  const posts: ContentPost[] = [];
  for (const entry of entries) {
    if (!entry.endsWith(".md") && !entry.endsWith(".mdx")) continue;
    const fullPath = join(root, entry);
    if (!statSync(fullPath).isFile()) continue;
    const raw = readFileSync(fullPath, "utf8");
    const parsed = matter(raw);
    const frontmatter = parsed.data as ContentFrontmatter;
    if (!frontmatter.title || !frontmatter.summary || !frontmatter.datePublished) {
      // Skip silently; bad posts shouldn't break the index. Surface in
      // validate-schema if needed later.
      continue;
    }
    const slug = entry.replace(/\.(md|mdx)$/, "");
    const html = marked.parse(parsed.content, { async: false }) as string;
    posts.push({
      slug,
      frontmatter,
      html,
      body: parsed.content,
    });
  }
  return posts;
}

/** List all non-draft posts in `content/<dir>/`, sorted newest first. */
export function listContentPosts(dir: string): ContentPost[] {
  return loadAllPosts(dir)
    .filter((p) => !p.frontmatter.draft)
    .sort((a, b) =>
      b.frontmatter.datePublished.localeCompare(a.frontmatter.datePublished),
    );
}

/** Look up a single post by slug. Returns null if not found or draft. */
export function getContentPost(
  dir: string,
  slug: string,
): ContentPost | null {
  const posts = loadAllPosts(dir);
  const found = posts.find((p) => p.slug === slug);
  if (!found || found.frontmatter.draft) return null;
  return found;
}
