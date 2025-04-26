"use client"

import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface TagBadgeProps {
  tag: string
}

export function TagBadge({ tag }: TagBadgeProps) {
  const router = useRouter()

  return (
    <Badge
      className="bg-accent-color/10 hover:bg-accent-color/20 text-primary cursor-pointer"
      onClick={() => router.push(`/blog/tags/${tag}`)}
    >
      {tag}
    </Badge>
  )
} 