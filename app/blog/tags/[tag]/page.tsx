import { getAllPosts } from "@/lib/blog-utils"
import { Suspense } from "react"
import TagLoading from "./loading"
import TagPageClient from "./TagPageClient"

export default async function TagPage({ params }: { params: { tag: string } }) {
  const posts = await getAllPosts()

  return (
    <Suspense fallback={<TagLoading />}>
      <TagPageClient posts={posts} params={params} />
    </Suspense>
  )
}