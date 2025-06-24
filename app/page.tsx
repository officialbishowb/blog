import Link from "next/link"
import { getAllPosts } from "@/lib/blog-utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryBadge } from "@/components/ui/category-badge"
import { Suspense } from "react"
import Loading from "./loading"

// Server Component
export default async function Home() {
  const posts = await getAllPosts()

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black mb-6">Blog</h1>
          <p className="text-xl text-gray mb-10">
            
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link href={`/blog/posts/${post.slug}`} key={post.slug} className="block h-full">
                <Card className="h-full hover:shadow-md transition-all duration-300 hover:border-accent-color/50 hover:scale-105">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="text-light-gray flex items-center justify-between">
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-xs bg-accent-color/10 px-2 py-1 rounded-full">{post.readingTime}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray line-clamp-3">{post.description}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-wrap gap-2">
                      <CategoryBadge category={post.category} />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  )
}
