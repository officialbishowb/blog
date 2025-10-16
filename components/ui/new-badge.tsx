"use client"

import { useEffect, useState } from 'react'
import { Badge } from './badge'

interface NewBadgeProps {
  slug: string
  modifiedAt?: string
  className?: string
  variant?: string
}

export default function NewBadge({ slug, modifiedAt, className, variant }: NewBadgeProps) {
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    if (!modifiedAt) return

    const modified = new Date(modifiedAt)
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    if (modified <= oneWeekAgo) {
      setIsNew(false)
      return
    }

    // Check localStorage for read posts
    try {
      const readJson = localStorage.getItem('readPosts')
      const read: Record<string, boolean> = readJson ? JSON.parse(readJson) : {}
      if (read[slug]) {
        setIsNew(false)
      } else {
        setIsNew(true)
      }
    } catch (e) {
      setIsNew(true)
    }
  }, [slug, modifiedAt])

  if (!isNew) return null

  const badgeClass = className || 'bg-accent-color text-black dark:text-black border-transparent'
  const badgeVariant = (variant as any) || 'default'

  return (
    <div>
      <Badge variant={badgeVariant as any} className={badgeClass}>New</Badge>
    </div>
  )
}
