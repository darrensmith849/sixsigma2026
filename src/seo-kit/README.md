# seo-kit

Portable SEO + AI-search-visibility (LLM SEO / GEO) building blocks for Next.js 16 sites in the 2KO Africa portfolio.

> **Status**: vendored. This folder is hand-copied (`cp -r src/seo-kit/`) into each consuming site until two sites have adopted it and the API has stabilised, at which point it will be promoted to `@2ko/seo-kit` on npm. Each consuming site declares its adopted version via the `VERSION` constant so drift is visible.

## Discipline

- No imports from outside `src/seo-kit/`. Treat this folder as a published package.
- All dependencies declared up-front in the header comment of `index.ts`.
- All JSON-LD generation is server-side / build-time; no client schema.
- Public API surface is the barrel export in `index.ts` — internal modules may move freely; only the barrel is contract.

## Modules

| Module | Phase | Purpose |
|---|---|---|
| `bots.ts` | A.2 | AI bot allow/block lists |
| `llms.ts` | A.1 | `/llms.txt` curated index generator |
| `lastmod.ts` | A.6 | Git-mtime-based per-route lastModified for sitemaps |
| `indexnow.ts` | C.1 | IndexNow client + key-file route factory |
| `og-template.tsx` | C.3 | Generic OG `ImageResponse` template |
| `content.ts` | B.4, D.1 | MDX + YAML helpers |
| `schema/organization.ts` | A.3 | Organization + EducationalOrganization JSON-LD |
| `schema/breadcrumbs.ts` | A.4 | BreadcrumbList JSON-LD server component |
| `schema/website.ts` | A.5 | WebSite + SearchAction JSON-LD |
| `schema/course.ts` | B.1 | Extended Course + CourseInstance JSON-LD |
| `schema/person.ts` | B.3 | Person JSON-LD for instructors |
| `schema/article.ts` | B.2 | Article JSON-LD for evergreen content |
| `schema/validate.ts` | C.4 | Build-time schema validator |
| `monitor/*` | E.3 | Weekly AI-engine citation monitor |

## Adoption checklist for a new site

1. `cp -r src/seo-kit/ <other-site>/src/seo-kit/` (or `git subtree add`).
2. Site provides its own `prompts.ts` in `monitor/` and its own bot policy overrides if any.
3. Site reads `VERSION` and records adoption in its own CHANGELOG.
4. Site wires modules into its `app/` routes (`robots.ts`, `sitemap.ts`, `layout.tsx`, etc.) — see the consuming site's history for the canonical wiring pattern.
