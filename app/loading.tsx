import { LoadingBar } from "@/components/loading-bar"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <LoadingBar />
      <div className="animate-pulse flex flex-col items-center space-y-4">
        <div className="h-12 w-48 bg-muted rounded-md"></div>
        <div className="h-4 w-64 bg-muted rounded-md"></div>
        <div className="h-4 w-56 bg-muted rounded-md"></div>
      </div>
    </div>
  )
}
