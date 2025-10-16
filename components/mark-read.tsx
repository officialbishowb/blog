"use client"

import { useEffect } from 'react'

export default function MarkRead({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      const readJson = localStorage.getItem('readPosts')
      const read: Record<string, boolean> = readJson ? JSON.parse(readJson) : {}
      if (!read[slug]) {
        read[slug] = true
        localStorage.setItem('readPosts', JSON.stringify(read))
      }
    } catch (e) {
      // ignore
    }
  }, [slug])

  return null
}
