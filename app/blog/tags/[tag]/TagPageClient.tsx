import Link from "next/link"
import { Post } from "@/lib/blog-utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"


export default async function TagPageClient({ posts, params }: { posts: Post[]; params: { tag: string } }) {
  const filteredPosts = posts.filter((post) =>
    post.tags.some((tag) => tag.toLowerCase() === params.tag.toLowerCase())
  )

  return (
    <div className="min-h-screen pt-20">
      <div className="container section-padding">
        <Link href="/blog" className="flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Link>

        <h1 className="text-4xl md:text-5xl mb-6">
          Posts tagged with <span className="text-primary">&quot;{params.tag}&quot;</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
          Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} with this tag
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link href={`/blog/posts/${post.slug}`} key={post.slug} className="block h-full">
              <Card className="h-full hover:shadow-md transition-all duration-300 hover:border-accent-color/50">
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
                    {post.tags.map((tag) => (
                      <Link href={`/blog/tags/${tag}`} key={tag}>
                      <Badge
                        key={tag}
                        className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
                          tag.toLowerCase() === params.tag.toLowerCase()
                            ? "bg-card text-accent-color"
                            : "bg-accent-color/10 hover:bg-accent-color/20 text-gray"
                        )}
                      >
                        {tag}
                      </Badge>
                      </Link>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
