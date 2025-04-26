"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { useState, useEffect } from "react"

export function EditLink() {
  const pathname = usePathname()
  const [isTinaConfigured, setIsTinaConfigured] = useState(false)
  const [isTinaInstalled, setIsTinaInstalled] = useState(false)

  useEffect(() => {
    // Check if TinaCMS is configured
    setIsTinaConfigured(!!process.env.NEXT_PUBLIC_TINA_CLIENT_ID)

    // Check if TinaCMS is installed
    const checkTinaInstalled = async () => {
      try {
        await import("tinacms");
        setIsTinaInstalled(true)
      } catch (err) {
        console.error("TinaCMS not installed:", err)
          setIsTinaInstalled(false)
      }
    }

    checkTinaInstalled()
  }, [])

  // Only show edit button on blog post pages and if TinaCMS is configured and installed
  if (!pathname.startsWith("/blog/posts/") || !isTinaConfigured || !isTinaInstalled) {
    return null
  }

  const slug = pathname.replace("/blog/posts/", "")
  const editUrl = `/admin#/collections/post/documents/${slug}`

  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2"
      onClick={() => (window.location.href = editUrl)}
    >
      <Edit className="h-4 w-4" />
      Edit this post
    </Button>
  )
}
