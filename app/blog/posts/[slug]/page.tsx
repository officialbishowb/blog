import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/blog-utils"
import { Badge } from "@/components/ui/badge"
import { TableOfContents } from "@/components/toc"
import { Mdx } from "@/components/mdx-components"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag, Clock, ArrowUp } from "lucide-react"
import { Suspense } from "react"
import PostLoading from "./loading"
import { LoadingBar } from "@/components/loading-bar"
import { GoToTopButton } from "@/components/go-to-top-button"
import { CategoryBadge } from "@/components/ui/category-badge"
import MarkRead from '@/components/mark-read'
import Script from "next/script"

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
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  const siteUrl = 'https://blog.officialbishowb.com'
  const postUrl = `${siteUrl}/blog/posts/${slug}`
  const ogImage = post.image 
    ? (post.image.startsWith('http') ? post.image : `${siteUrl}${post.image}`)
    : `${siteUrl}/assets/images/blog_logo_light.png`

  return {
    title: `${post.title} | Blog`,
    description: post.description || `Read about ${post.title.toLowerCase()} on our blog.`,
    keywords: post.keywords || [],
    authors: post.author ? [{ name: post.author }] : undefined,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description || `Read about ${post.title.toLowerCase()} on our blog.`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modifiedAt,
      authors: post.author ? [post.author] : undefined,
      url: postUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: 'Blog',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || `Read about ${post.title.toLowerCase()} on our blog.`,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const siteUrl = 'https://blog.officialbishowb.com'
  const postUrl = `${siteUrl}/blog/posts/${slug}`

  // Generate structured data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description || `Read about ${post.title.toLowerCase()} on our blog.`,
    "image": post.image 
      ? (post.image.startsWith('http') ? post.image : `${siteUrl}${post.image}`)
      : `${siteUrl}/assets/images/blog_logo_light.png`,
    "datePublished": post.date,
    "dateModified": post.modifiedAt || post.date,
    "author": {
      "@type": "Person",
      "name": post.author || "Blog Author"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Blog",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/assets/images/blog_logo_light.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "articleSection": post.category.main,
    "keywords": post.keywords?.join(", ") || post.title,
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": post.readingTime
  }

  return (
    <>
      {/* Structured Data (JSON-LD) for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Mark this post as read on client mount */}
      <MarkRead slug={slug} />
      <LoadingBar />
      <Suspense fallback={<PostLoading />}>
        <div className="min-h-screen pt-20">
          <div className="container section-padding">
            <Link
              href="/blog"
              className="flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
              {/* Table of Contents - Left Sidebar */}
              <aside className="hidden lg:block sticky top-24 self-start">
                <div className="border rounded-lg p-6 bg-card">
                  <h3 className="text-xl font-bold mb-4">Table of Contents</h3>
                  <TableOfContents source={post.content} />
                </div>
              </aside>

              {/* Main Content */}
              <article className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

                <div className="flex flex-wrap items-center gap-4 mb-8 text-light-gray">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  <div className="flex items-center">
                    <Tag className="mr-2 h-4 w-4" />
                    <div className="flex flex-wrap gap-2">
                      <CategoryBadge category={post.category} />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                {/* Mobile TOC */}
                <div className="lg:hidden mb-8 border rounded-lg p-4 bg-card">
                  <h3 className="text-lg font-bold mb-2">Table of Contents</h3>
                  <TableOfContents source={post.content} />
                </div>

                <div className="prose prose-lg max-w-none px-1 py-6 text-gray">
                  <Mdx source={post.content} />
                </div>
              </article>
            </div>
          </div>
        </div>
        
        {/* Go to Top Button */}
        <GoToTopButton />
      </Suspense>
    </>
  )
}
