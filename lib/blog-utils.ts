import fs from "fs"
import path from "path"

// Define the post type
export interface Post {
  slug: string
  title: string
  date: string
  description: string
  author: string
  body: Record<string, unknown>
  content: string
  tags: string[]
  readingTime: string
}

interface FrontmatterData {
  title?: string
  date?: string
  description?: string
  author?: string
  tags?: string[]
  excerpt?: string
  body?: Record<string, unknown>
  [key: string]: unknown
}

// Path to the content directory
const postsDirectory = path.join(process.cwd(), "content/posts")

// Get all post slugs
export async function getPostSlugs() {
  try {
    // Create the directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
      return []
    }

    return fs
      .readdirSync(postsDirectory)
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""))
  } catch (error) {
    console.error("Error getting post slugs:", error)
    return []
  }
}

// Parse frontmatter from markdown content
function parseFrontmatter(content: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(content)

  // If no frontmatter found, return empty frontmatter and use content as is
  if (!match || match.length < 2) {
    return {
      frontmatter: {} as FrontmatterData,
      content: content.trim()
    }
  }

  const frontmatter = match[1]
  const contentWithoutFrontmatter = content.replace(frontmatterRegex, "").trim()

  const frontmatterData: FrontmatterData = {}

  // Parse each line of the frontmatter
  frontmatter.split("\n").forEach((line) => {
    const [key, ...valueArr] = line.split(":")
    if (key && valueArr.length) {
      let value = valueArr.join(":").trim()

      // Handle arrays (like tags)
      if (value.startsWith("[") && value.endsWith("]")) {
        value = value.slice(1, -1)
        frontmatterData[key.trim()] = value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      } else {
        frontmatterData[key.trim()] = value
      }
    }
  })

  return {
    frontmatter: frontmatterData,
    content: contentWithoutFrontmatter,
  }
}

// Add the calculateReadingTime function after the parseFrontmatter function
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 225
  const wordCount = content.trim().split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)

  return minutes === 1 ? "1 min read" : `${minutes} mins read`
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // Fall back to file system
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { frontmatter, content } = parseFrontmatter(fileContents)

    return {
      slug,
      title: frontmatter.title || "Untitled",
      date: frontmatter.date || new Date().toISOString(),
      description: frontmatter.excerpt || "",
      author: frontmatter.author || "",
      body: frontmatter.body || {},
      content,
      tags: frontmatter.tags || [],
      readingTime: calculateReadingTime(content),
    }
  } catch (error: unknown) {
    console.error("Error getting post:", error)
    return null
  }
}

// Get all posts
export async function getAllPosts(): Promise<Post[]> {
  // Fall back to file system
  const slugs = await getPostSlugs()
  const postsPromises = slugs.map((slug) => getPostBySlug(slug))
  const posts = await Promise.all(postsPromises)

  // Filter out null posts, posts without content, and sort by date (newest first)
  return posts
    .filter((post): post is Post => post !== null && post.content.trim().length > 0)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
