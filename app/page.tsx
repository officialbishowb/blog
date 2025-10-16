import Link from "next/link"
import { CategoryBadge } from "@/components/ui/category-badge"
import NewBadge from '@/components/ui/new-badge'
import { Suspense } from "react"
import Loading from "./loading"
import { getAllPosts } from "@/lib/blog-utils"
import PostList from "@/components/post-list"

// Server Component
export default async function Home() {
  const posts = await getAllPosts()

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black mb-6">Blog</h1>
          <p className="text-xl text-gray mb-10"></p>

          {/* Client-side filters — these toggle visibility of the server-rendered grid below */}
          <PostList posts={posts} />

          {/* Server-rendered grid: each card has data-category-main so the client filter can show/hide without reflow */}
          <div id="posts-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link href={`/blog/posts/${post.slug}`} key={post.slug} className="block h-full" data-category-main={post.category?.main}>
                <div className="h-full">
                  <div className="relative h-full hover:shadow-md transition-all duration-300 border rounded-lg p-4 hover:border-accent-color/50 hover:scale-105 bg-white dark:bg-slate-800 dark:border-slate-700">
                    <div className="mb-3">
                      <h3 className="text-xl font-semibold line-clamp-2 pr-12 md:pr-16 text-black dark:text-white">{post.title}</h3>
                      <div className="text-gray-600 dark:text-gray-300 text-sm flex items-center justify-between mt-2">
                        <span>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="text-xs bg-accent-color/10 px-2 py-1 rounded-full">{post.readingTime}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{post.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2 items-center">
                      <CategoryBadge category={post.category} />
                    </div>
                    <div className="absolute top-3 right-3">
                      <NewBadge slug={post.slug} modifiedAt={post.modifiedAt} className="bg-accent-color text-black dark:text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  )
}
