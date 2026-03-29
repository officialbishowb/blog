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
        <div className="min-h-screen pt-24 pb-24" style={{ backgroundColor: "#131319" }}>
          <div className="mx-auto max-w-6xl px-6">

            {/* 3-column layout: TOC | Article | Share */}
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_180px] gap-10 xl:gap-16">

              {/* ── Left sidebar: Back link + Table of Contents ──────── */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <Link
                    href="/"
                    className="font-label text-[#bfc9c0] text-xs uppercase tracking-widest flex items-center gap-2 mb-6 hover:text-[#e5e1eb] transition-colors w-fit px-3 py-2 rounded-xl border border-[#404942]/40 bg-[#1C1B22] hover:bg-[#201f26]"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    All Posts
                  </Link>
                  <p className="font-label text-[#bfc9c0] text-xs uppercase tracking-widest mb-4">
                    Contents
                  </p>
                  <TableOfContents source={post.content} />
                </div>
              </aside>

              {/* ── Center: Article ───────────────────────────────────── */}
              <article className="min-w-0">

                {/* Category chip */}
                {post.category?.main && (
                  <span className="font-label inline-block text-[#131319] bg-[#96DAAF] text-xs uppercase tracking-widest px-2.5 py-0.5 mb-5 rounded-xl">
                    {post.category.sub
                      ? `${post.category.main} / ${post.category.sub}`
                      : post.category.main}
                  </span>
                )}

                {/* Title */}
                <h1 className="font-serif text-[#e5e1eb] text-[2.75rem] leading-[1.1] italic tracking-tight mb-5">
                  {post.title}
                </h1>

                {/* Metadata */}
                <p className="font-label text-[#bfc9c0] text-xs uppercase tracking-wider mb-8">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {" · "}
                  {post.readingTime}
                  {post.category?.main && ` · ${post.category.main}`}
                </p>

                {/* Featured image */}
                {post.image && (
                  <div className="relative w-full aspect-[16/9] mb-10 overflow-hidden rounded-xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Mobile TOC */}
                <div className="lg:hidden mb-8 border border-[#404942]/40 p-5 bg-[#1C1B22] rounded-xl">
                  <p className="font-label text-[#bfc9c0] text-xs uppercase tracking-widest mb-3">
                    Contents
                  </p>
                  <TableOfContents source={post.content} />
                </div>

                {/* Prose content */}
                <div className="prose max-w-none">
                  <Mdx source={post.content} />
                </div>

                {/* ── Prev / Next navigation ────────────────────────────── */}
                {(prevPost || nextPost) && (
                  <div className="mt-16 pt-8 border-t border-[#404942]/40 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {prevPost ? (
                      <Link href={`/blog/posts/${prevPost.slug}`} className="group">
                        <p className="font-label text-[#bfc9c0] text-xs uppercase tracking-widest flex items-center gap-1.5 mb-2">
                          <ArrowLeft className="h-3 w-3" /> Previous Post
                        </p>
                        <p className="font-serif text-[#e5e1eb] text-lg italic group-hover:text-[#96DAAF] transition-colors leading-snug">
                          {prevPost.title}
                        </p>
                      </Link>
                    ) : (
                      <div />
                    )}
                    {nextPost ? (
                      <Link href={`/blog/posts/${nextPost.slug}`} className="group text-right">
                        <p className="font-label text-[#bfc9c0] text-xs uppercase tracking-widest flex items-center justify-end gap-1.5 mb-2">
                          Next Post <ArrowRight className="h-3 w-3" />
                        </p>
                        <p className="font-serif text-[#e5e1eb] text-lg italic group-hover:text-[#96DAAF] transition-colors leading-snug">
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
                    <h2 className="font-label text-[#e5e1eb] text-xs uppercase tracking-widest mb-6">
                      Further Reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {furtherReading.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/blog/posts/${p.slug}`}
                          className="block group bg-[#1C1B22] hover:bg-[#201f26] transition-colors p-6 border border-[#404942]/40 rounded-xl"
                        >
                          {p.category?.main && (
                            <p className="font-label text-[#96DAAF] text-xs uppercase tracking-widest mb-2">
                              {p.category.main}
                            </p>
                          )}
                          <h3 className="text-[#e5e1eb] font-medium text-sm leading-snug mb-2 group-hover:text-[#b1f7ca] transition-colors">
                            {p.title}
                          </h3>
                          <p className="text-[#bfc9c0] text-xs leading-relaxed line-clamp-2">
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
                  <p className="font-label text-[#bfc9c0] text-xs uppercase tracking-widest mb-4">
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
