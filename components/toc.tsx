"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  source: string
}

export function TableOfContents({ source }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Extract headings from markdown content
  useEffect(() => {
    const extractHeadings = () => {
      // capture headings from # through ###### (h1 - h6)
      const regex = /^(#{1,6})\s+(.+)$/gm
      const matches = Array.from(source.matchAll(regex))

      const items = matches.map((match) => {
        const level = match[1].length
        const text = match[2]
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")

        return { id, text, level }
      })

      setHeadings(items)
    }

    extractHeadings()
  }, [source])

  // Track active heading based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

      if (headingElements.length === 0) return

      const scrollY = window.scrollY

      // Find the heading that's currently in view
      let currentHeadingId = headingElements[0].id

      for (const element of headingElements) {
        const { top } = element.getBoundingClientRect()
        const offset = top + scrollY - 100

        if (scrollY >= offset) {
          currentHeadingId = element.id
        }
      }

      setActiveId(currentHeadingId)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Call once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className="toc">
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => {
          const indentClasses = ['', 'ml-4', 'ml-8', 'ml-12', 'ml-16', 'ml-20']
          const indent = indentClasses[Math.max(0, Math.min(5, heading.level - 1))]

          return (
            <li key={heading.id} className={cn('transition-colors', indent)}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  'block py-1 hover:text-accent-color transition-colors',
                  activeId === heading.id ? 'text-accent-color font-medium' : 'text-light-gray'
                )}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
                  setActiveId(heading.id)
                }}
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
