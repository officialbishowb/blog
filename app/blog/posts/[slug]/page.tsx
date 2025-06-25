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

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
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
