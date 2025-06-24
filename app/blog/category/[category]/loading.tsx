import { LoadingBar } from "@/components/loading-bar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TagLoading() {
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

        <div className="animate-pulse">
          <div className="h-10 w-3/4 bg-muted rounded-md mb-6"></div>
          <div className="h-4 w-64 bg-muted rounded-md mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border rounded-lg p-6 h-64">
                <div className="h-6 w-3/4 bg-muted rounded-md mb-4"></div>
                <div className="h-4 w-1/2 bg-muted rounded-md mb-6"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded-md"></div>
                  <div className="h-4 w-full bg-muted rounded-md"></div>
                  <div className="h-4 w-3/4 bg-muted rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
