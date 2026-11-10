import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Suspense } from "react"
import Loading from "./loading"
import { getAllPosts } from "@/lib/blog-utils"
import PostList from "@/components/post-list"

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export default async function Home() {
  const posts = await getAllPosts()
  const [featured, ...rest] = posts

  return (
    <Suspense fallback={<Loading />}>
      <div className="py-20 md:py-28">
        <div className="ds-container">

          {/* Page header */}
          <div className="mb-14 max-w-2xl">
            <p className="ds-label-accent mb-4">Blog</p>
            <h1 className="ds-display mb-6">Thoughts &amp; notes.</h1>
            <p className="ds-lead">
              Things I learn while building, reading and breaking stuff: development, security, and the habits
              behind both. Written by{" "}
              <a href="https://officialbishowb.com/#about" className="ds-link">
                me
              </a>
              .
            </p>
          </div>

          {/* Category filters */}
          <PostList posts={posts} />

          {/* Posts */}
          <div id="posts-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Featured post */}
            {featured && (
              <Link
                href={`/blog/posts/${featured.slug}`}
                className="ds-card md:col-span-2 group flex flex-col md:flex-row overflow-hidden"
                data-category-main={featured.category?.main}
              >
                <div className="md:w-[42%] aspect-[4/3] relative overflow-hidden shrink-0 bg-secondary border-b md:border-b-0 md:border-r border-border">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="ds-label">{featured.category?.main ?? "Post"}</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 p-8 md:p-10 flex flex-col justify-between gap-8">
                  <div>
                    <p className="ds-label mb-4">
                      Latest
                      {featured.category?.main && (
                        <>
                          {" · "}
                          <span className="text-primary">{featured.category.main}</span>
                        </>
                      )}
                    </p>
                    <h2 className="ds-h2 mb-4 group-hover:text-primary transition-colors">{featured.title}</h2>
                    <p className="ds-label mb-5">
                      {formatDate(featured.date)} · {featured.readingTime}
                    </p>
                    <p className="line-clamp-3">{featured.description}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 font-medium text-primary">
                    Read article <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            )}

            {/* Regular posts */}
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/posts/${post.slug}`}
                className="ds-card group flex min-h-[260px] flex-col justify-between gap-6 p-7"
                data-category-main={post.category?.main}
              >
                <div>
                  {post.category?.main && <p className="ds-label-accent mb-3">{post.category.main}</p>}
                  <h2 className="ds-h3 mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="ds-label mb-4">
                    {formatDate(post.date)} · {post.readingTime}
                  </p>
                  <p className="line-clamp-3">{post.description}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  Read post <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </Suspense>
  )
}
