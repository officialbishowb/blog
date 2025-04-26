import { LoadingBar } from "@/components/loading-bar"

export default function BlogLoading() {
  return (
    <div className="min-h-screen pt-24">
      <LoadingBar />
      <div className="container pb-16">
        <div className="animate-pulse">
          <div className="h-12 w-48 bg-muted rounded-md mb-6"></div>
          <div className="h-4 w-64 bg-muted rounded-md mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
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
