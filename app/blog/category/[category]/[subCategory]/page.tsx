import { getAllPosts } from "@/lib/blog-utils"
import { Suspense } from "react"
import CategoryLoading from "./loading"
import CategoryPageClient from "./CategoryPageClient"

export default async function CategoryPage({ params }: { params: { category: string; subCategory: string } }) {
  const posts = await getAllPosts()
  const { category, subCategory } = await params
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryPageClient posts={posts} params={{ category, subCategory }} />
    </Suspense>
  )
}