import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/blog-utils"
import { TableOfContents } from "@/components/toc"
import { Mdx } from "@/components/mdx-components"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Link2 } from "lucide-react"
import { Suspense } from "react"
import PostLoading from "./loading"
import { LoadingBar } from "@/components/loading-bar"
import { GoToTopButton } from "@/components/go-to-top-button"
import MarkRead from "@/components/mark-read"
import Script from "next/script"
import { CopyButton } from "@/components/copy-button"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  const siteUrl = "https://blog.officialbishowb.com"
  const postUrl = `${siteUrl}/blog/posts/${slug}`
  const ogImage = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `${siteUrl}${post.image}`
    : `${siteUrl}/assets/images/blog_logo_light.png`

  return {
    title: `${post.title} | Blog`,
    description: post.description || `Read about ${post.title.toLowerCase()} on our blog.`,
    keywords: post.keywords || [],
    authors: post.author ? [{ name: post.author }] : undefined,
    alternates: { canonical: postUrl },
    openGraph: {
      title: post.title,
      description: post.description || `Read about ${post.title.toLowerCase()} on our blog.`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modifiedAt,
      authors: post.author ? [post.author] : undefined,
      url: postUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      siteName: "Blog — Bishow B.",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || `Read about ${post.title.toLowerCase()} on our blog.`,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getAllPosts()])

  if (!post) {
    notFound()
  }

  const siteUrl = "https://blog.officialbishowb.com"
  const postUrl = `${siteUrl}/blog/posts/${slug}`

  // Prev / Next navigation
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  // Further reading: up to 2 posts from the same category, fallback to latest
  const furtherReading = allPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const sameA = a.category?.main === post.category?.main ? -1 : 1
      const sameB = b.category?.main === post.category?.main ? -1 : 1
      return sameA - sameB
    })
    .slice(0, 2)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || `Read about ${post.title.toLowerCase()} on our blog.`,
    image: post.image
      ? post.image.startsWith("http")
        ? post.image
        : `${siteUrl}${post.image}`
      : `${siteUrl}/assets/images/blog_logo_light.png`,
    datePublished: post.date,
    dateModified: post.modifiedAt || post.date,
    author: { "@type": "Person", name: post.author || "Bishow B." },
    publisher: {
      "@type": "Organization",
      name: "Blog — Bishow B.",
      logo: { "@type": "ImageObject", url: `${siteUrl}/assets/images/blog_logo_light.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    articleSection: post.category.main,
    keywords: post.keywords?.join(", ") || post.title,
    wordCount: post.content.split(/\s+/).length,
    timeRequired: post.readingTime,
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MarkRead slug={slug} />
      <LoadingBar />

      <Suspense fallback={<PostLoading />}>
        <div className="py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">

            {/* 3-column layout: TOC | Article | Share */}
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_180px] gap-10 xl:gap-16">

              {/* ── Left sidebar: Back link + Table of Contents ──────── */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <Link
                    href="/"
                    className="ds-btn ds-btn-secondary min-h-10 px-3.5 text-sm mb-8"
                  >
                    <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                    All posts
                  </Link>
                  <p className="ds-label mb-4">
                    Contents
                  </p>
                  <TableOfContents source={post.content} />
                </div>
              </aside>

              {/* ── Center: Article ───────────────────────────────────── */}
              <article className="min-w-0">

                {/* Category chip */}
                {post.category?.main && (
                  <span className="ds-label-accent inline-block mb-5">
                    {post.category.sub
                      ? `${post.category.main} / ${post.category.sub}`
                      : post.category.main}
                  </span>
                )}

                {/* Title */}
                <h1 className="ds-h1 mb-5">
                  {post.title}
                </h1>

                {/* Metadata */}
                <p className="ds-label mb-10 pb-8 border-b border-border">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {" · "}
                  {post.readingTime}
                  {" · by me"}
                </p>

                {/* Featured image */}
                {post.image && (
                  <div className="relative w-full aspect-[16/9] mb-10 overflow-hidden rounded-lg border border-border">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Mobile TOC */}
                <div className="lg:hidden mb-10 ds-card p-5">
                  <p className="ds-label mb-3">
                    Contents
                  </p>
                  <TableOfContents source={post.content} />
                </div>

                {/* Prose content */}
                <div className="prose max-w-none">
                  <Mdx source={post.content} />
                </div>

                {/* ── Author ──────────────────────────────────────────────── */}
                <div className="mt-16 ds-card flex flex-wrap items-center gap-5 p-6">
                  <Image
                    src="/assets/images/avatar.jpg"
                    alt="Portrait of Bishow"
                    width={64}
                    height={64}
                    unoptimized
                    className="h-16 w-16 rounded-full border border-border object-cover object-top"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="ds-label mb-1">Written by</p>
                    <p className="text-foreground font-semibold">Bishow B.</p>
                    <p className="text-sm">
                      Full-Stack Developer from Vienna, studying IT security.{" "}
                      <a href="https://officialbishowb.com" className="ds-link">
                        More about me
                      </a>
                    </p>
                  </div>
                </div>

                {/* ── Prev / Next navigation ────────────────────────────── */}
                {(prevPost || nextPost) && (
                  <div className="mt-16 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6">
                    {prevPost ? (
                      <Link href={`/blog/posts/${prevPost.slug}`} className="group">
                        <p className="ds-label flex items-center gap-1.5 mb-2">
                          <ArrowLeft aria-hidden="true" className="h-3 w-3" /> Previous
                        </p>
                        <p className="text-foreground text-lg font-semibold group-hover:text-primary transition-colors leading-snug">
                          {prevPost.title}
                        </p>
                      </Link>
                    ) : (
                      <div />
                    )}
                    {nextPost ? (
                      <Link href={`/blog/posts/${nextPost.slug}`} className="group text-right">
                        <p className="ds-label flex items-center justify-end gap-1.5 mb-2">
                          Next <ArrowRight aria-hidden="true" className="h-3 w-3" />
                        </p>
                        <p className="text-foreground text-lg font-semibold group-hover:text-primary transition-colors leading-snug">
                          {nextPost.title}
                        </p>
                      </Link>
                    ) : (
                      <div />
                    )}
                  </div>
                )}

                {/* ── Further Reading ───────────────────────────────────── */}
                {furtherReading.length > 0 && (
                  <section className="mt-16">
                    <h2 className="ds-label-accent mb-6">
                      Further Reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {furtherReading.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/blog/posts/${p.slug}`}
                          className="ds-card block group p-6"
                        >
                          {p.category?.main && (
                            <p className="ds-label-accent mb-2">
                              {p.category.main}
                            </p>
                          )}
                          <h3 className="text-foreground font-semibold text-lg leading-snug mb-2 group-hover:text-primary transition-colors">
                            {p.title}
                          </h3>
                          <p className="text-sm leading-relaxed line-clamp-2">
                            {p.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </article>

              {/* ── Right sidebar: Share ──────────────────────────────── */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <p className="ds-label mb-4">
                    Share this post
                  </p>
                  <CopyButton url={postUrl} />
                </div>
              </aside>

            </div>
          </div>
        </div>

        <GoToTopButton />
      </Suspense>
    </>
  )
}
