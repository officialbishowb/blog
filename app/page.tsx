import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Suspense } from "react"
import Loading from "./loading"
import { getAllPosts } from "@/lib/blog-utils"
import PostList from "@/components/post-list"

export default async function Home() {
  const posts = await getAllPosts()
  const [featured, ...rest] = posts

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen pt-32 pb-24" style={{ backgroundColor: "#131319" }}>
        <div className="mx-auto max-w-5xl px-6">

          {/* Page header */}
          <div className="mb-14">
            <span className="font-label inline-block text-[#96DAAF] text-xs uppercase tracking-widest border border-[#96DAAF]/30 bg-[#201f26] px-3 py-1 mb-6 rounded-xl">
              Blog
            </span>
            <h1 className="font-serif text-[3.75rem] leading-[1.05] tracking-tight text-[#e5e1eb] italic">
              Thoughts &amp; Notes.
            </h1>
          </div>

          {/* Category filters */}
          <PostList posts={posts} />

          {/* Posts */}
          <div id="posts-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Featured post — spans full width */}
            {featured && (
              <Link
                href={`/blog/posts/${featured.slug}`}
                className="md:col-span-2 block group"
                data-category-main={featured.category?.main}
              >
                <div className="flex flex-col md:flex-row border border-[#404942]/40 bg-[#1C1B22] hover:bg-[#201f26] transition-colors duration-300 h-full rounded-xl overflow-hidden">
                  {/* Thumbnail / placeholder */}
                  <div className="md:w-[42%] aspect-[4/3] relative overflow-hidden shrink-0 bg-[#201f26]">
                    {featured.image ? (
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-label text-[#404942] text-xs uppercase tracking-widest">
                          {featured.category?.main ?? "Post"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <p className="font-label text-[#bfc9c0] text-xs uppercase tracking-widest mb-3">
                        Latest Post
                      </p>
                      {featured.category?.main && (
                        <p className="font-label text-[#96DAAF] text-xs uppercase tracking-widest mb-4">
                          {featured.category.main}
                        </p>
                      )}
                      <h2 className="font-serif text-[#e5e1eb] text-[1.875rem] leading-tight italic mb-4">
                        {featured.title}
                      </h2>
                      <p className="font-label text-[#bfc9c0] text-xs uppercase tracking-wider mb-5">
                        {new Date(featured.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {" · "}
                        {featured.readingTime}
                      </p>
                      <p className="text-[#bfc9c0] text-sm leading-relaxed line-clamp-3">
                        {featured.description}
                      </p>
                    </div>
                    <div className="mt-8">
                      <span className="font-label text-[#96DAAF] text-xs uppercase tracking-widest flex items-center gap-2">
                        Read Article <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Regular posts — 2-column grid */}
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/posts/${post.slug}`}
                className="block group"
                data-category-main={post.category?.main}
              >
                <div className="h-full border border-[#404942]/40 bg-[#1C1B22] hover:bg-[#201f26] transition-colors duration-300 p-8 flex flex-col justify-between min-h-[280px] rounded-xl">
                  <div>
                    {post.category?.main && (
                      <p className="font-label text-[#96DAAF] text-xs uppercase tracking-widest mb-3">
                        {post.category.main}
                      </p>
                    )}
                    <h2 className="text-[#e5e1eb] font-medium text-[1.0625rem] leading-snug mb-3">
                      {post.title}
                    </h2>
                    <p className="font-label text-[#bfc9c0] text-xs uppercase tracking-wider mb-4">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {" · "}
                      {post.readingTime}
                    </p>
                    <p className="text-[#bfc9c0] text-sm leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-label text-[#bfc9c0] text-xs uppercase tracking-widest flex items-center gap-1.5 group-hover:text-[#96DAAF] transition-colors">
                      View Full Post <ExternalLink className="h-3 w-3" />
                    </span>
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
