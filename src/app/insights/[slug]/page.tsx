import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import Eyebrow from "@/components/Eyebrow";
import JsonLd from "@/components/JsonLd";
import {
  buildMetadata,
  PUBLISHER_ORG,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import BreadcrumbsJsonLd from "@/seo-kit/schema/breadcrumbs";
import { buildArticleSchema } from "@/seo-kit/schema/article";
import { getContentPost, listContentPosts } from "@/seo-kit/content";
import { getInstructor } from "@/data/instructors";

export function generateStaticParams() {
  return listContentPosts("insights").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getContentPost("insights", slug);
  if (!post) return { title: "Article not found" };
  return buildMetadata({
    title: `${post.frontmatter.title} | ${SITE_NAME}`,
    description: post.frontmatter.summary,
    path: `/insights/${post.slug}`,
    image: post.frontmatter.image,
  });
}

const dateFmt = new Intl.DateTimeFormat("en-ZA", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getContentPost("insights", slug);
  if (!post) notFound();

  const url = `${SITE_URL}/insights/${post.slug}`;

  // Author: resolve to a Person entity if the post specifies an instructor
  // slug; otherwise fall back to the Organization as author.
  const instructor = post.frontmatter.authorSlug
    ? getInstructor(post.frontmatter.authorSlug)
    : undefined;
  const author = instructor
    ? {
        "@type": "Person",
        "@id": `${SITE_URL}/about/instructors/${instructor.slug}`,
        name: instructor.name,
      }
    : PUBLISHER_ORG;

  const articleJsonLd = buildArticleSchema({
    headline: post.frontmatter.title,
    description: post.frontmatter.summary,
    url,
    image: post.frontmatter.image
      ? post.frontmatter.image.startsWith("http")
        ? post.frontmatter.image
        : `${SITE_URL}${post.frontmatter.image}`
      : undefined,
    datePublished: post.frontmatter.datePublished,
    dateModified: post.frontmatter.dateModified ?? post.frontmatter.datePublished,
    author,
    publisher: PUBLISHER_ORG,
    articleType: "BlogPosting",
  });

  // Optional `citation` and `mentions` cross-links — densifies the entity
  // graph so LLMs follow them when summarising the post.
  if (post.frontmatter.citations && post.frontmatter.citations.length > 0) {
    (articleJsonLd as Record<string, unknown>).citation =
      post.frontmatter.citations.map((c) => ({
        "@type": "CreativeWork",
        url: c.url,
        name: c.title,
      }));
  }
  if (post.frontmatter.mentions && post.frontmatter.mentions.length > 0) {
    (articleJsonLd as Record<string, unknown>).mentions =
      post.frontmatter.mentions.map((m) => ({
        "@type": "Thing",
        url: m.url,
        name: m.name,
      }));
  }

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <BreadcrumbsJsonLd
        siteUrl={SITE_URL}
        crumbs={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/insights" },
          { name: post.frontmatter.title, url: `/insights/${post.slug}` },
        ]}
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-green-900 text-white pt-[80px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 container-wide py-20 md:py-28 lg:py-32 max-w-4xl mx-auto">
          <Eyebrow tone="white" className="mb-6">
            {dateFmt.format(new Date(post.frontmatter.datePublished))}
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <>
                {" · "}
                {post.frontmatter.tags[0]}
              </>
            )}
          </Eyebrow>
          <h1 className="!text-white mb-8">{post.frontmatter.title}</h1>
          <p className="text-[19px] md:text-[21px] text-white/85 leading-[1.65]">
            {post.frontmatter.summary}
          </p>
        </div>
      </section>

      {/* ─── Body ─── */}
      <FadeIn>
        <article className="bg-white py-24 md:py-32">
          <div className="container-wide max-w-3xl">
            <div
              className="prose prose-lg prose-green max-w-none"
              // Renders the markdown body parsed by marked at build time.
              // Source files live in content/insights/ and are author-controlled.
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {/* Footer: author + back link */}
            <div className="mt-16 border-t border-ink-100 pt-10 flex flex-wrap items-center justify-between gap-6">
              <div className="text-[14px] text-ink-500">
                {instructor ? (
                  <>
                    Written by{" "}
                    <Link
                      href={`/about/instructors/${instructor.slug}`}
                      className="font-semibold text-green-700 hover:underline"
                    >
                      {instructor.name}
                    </Link>
                  </>
                ) : (
                  <>By the {SITE_NAME} team</>
                )}
              </div>
              <Link
                href="/insights"
                className="text-[14px] font-semibold text-green-700 hover:underline"
              >
                ← Back to insights
              </Link>
            </div>
          </div>
        </article>
      </FadeIn>
    </>
  );
}
