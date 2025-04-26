import { LoadingBar } from "@/components/loading-bar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PostLoading() {
  return (
    <div className="min-h-screen pt-20">
      <LoadingBar />
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
              <div className="h-6 w-3/4 bg-muted rounded-md mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-muted rounded-md"></div>
                <div className="h-4 w-5/6 bg-muted rounded-md"></div>
                <div className="h-4 w-4/6 bg-muted rounded-md"></div>
                <div className="h-4 w-full bg-muted rounded-md"></div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <article className="max-w-3xl animate-pulse">
            <div className="h-10 w-3/4 bg-muted rounded-md mb-6"></div>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="h-4 w-32 bg-muted rounded-md"></div>
              <div className="h-4 w-48 bg-muted rounded-md"></div>
            </div>

            {/* Mobile TOC */}
            <div className="lg:hidden mb-8 border rounded-lg p-4 bg-card">
              <div className="h-6 w-1/2 bg-muted rounded-md mb-2"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded-md"></div>
                <div className="h-4 w-5/6 bg-muted rounded-md"></div>
              </div>
            </div>

            <div className="space-y-4 px-1 py-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 w-full bg-muted rounded-md"></div>
              ))}
              <div className="h-4 w-3/4 bg-muted rounded-md"></div>
              <div className="h-8 w-1/2 bg-muted rounded-md my-8"></div>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 w-full bg-muted rounded-md"></div>
              ))}
              <div className="h-4 w-2/3 bg-muted rounded-md"></div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
