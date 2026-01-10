import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog-utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://blog.officialbishowb.com'
  
  // Get all blog posts
  const posts = await getAllPosts()
  
  // Generate sitemap entries for blog posts
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/posts/${post.slug}`,
    lastModified: post.modifiedAt ? new Date(post.modifiedAt) : new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // Generate category pages
  const categoryMap = new Map<string, { main: string; sub?: string }>()
  posts.forEach((post) => {
    const key = post.category.sub 
      ? `${post.category.main}-${post.category.sub}` 
      : post.category.main
    if (!categoryMap.has(key)) {
      categoryMap.set(key, post.category)
    }
  })

  const categoryEntries: MetadataRoute.Sitemap = Array.from(categoryMap.values()).map((category) => {
    if (category.sub) {
      return {
        url: `${baseUrl}/blog/category/${category.main}/${category.sub}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }
    }
    return {
      url: `${baseUrl}/blog/category/${category.main}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }
  })

  return [...staticPages, ...postEntries, ...categoryEntries]
}
