"use client"

import React, { useMemo, useState, useRef, useEffect } from "react"
import { Post } from "@/lib/blog-utils"

type Props = {
  posts: Post[]
}

function prettyCategory(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * PostFilters: client component that renders filter chips and toggles visibility
 * of an already server-rendered grid with id="posts-grid". This avoids layout
 * shifts on hydrate because the grid is rendered server-side and only visibility
 * is toggled on the client.
 */
export default function PostFilters({ posts }: Props) {
  const [filter, setFilter] = useState<string>("all")

  const categories = useMemo(() => {
    const map = new Map<string, number>()
    posts.forEach((p) => {
      const main = (p.category && (p.category as any).main) || "uncategorized"
      const key = String(main)
      map.set(key, (map.get(key) || 0) + 1)
    })
    return Array.from(map.entries()).map(([key, count]) => ({ key, count }))
  }, [posts])

  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!dropdownRef.current) return
      if (e.target instanceof Node && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("click", onDoc)
    return () => document.removeEventListener("click", onDoc)
  }, [])

  const VISIBLE = 6
  const visibleCategories = categories.slice(0, VISIBLE)
  const overflowCategories = categories.slice(VISIBLE)

  function applyFilter(key: string) {
    setFilter(key)
    const grid = document.getElementById("posts-grid")
    if (!grid) return
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-category-main]'))
    if (key === "all") {
      cards.forEach((c) => (c.style.display = ""))
    } else {
      cards.forEach((c) => {
        if (c.getAttribute("data-category-main") === key) c.style.display = ""
        else c.style.display = "none"
      })
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <button
            className={`px-3 py-1 rounded-full ${filter === "all" ? "bg-accent-color text-white" : "bg-muted/40 text-gray dark:text-gray-300"}`}
            onClick={() => applyFilter("all")}
          >
            All ({posts.length})
          </button>
          {visibleCategories.map((c) => (
            <button
              key={c.key}
              className={`px-3 py-1 rounded-full ${filter === c.key ? "bg-accent-color text-white" : "bg-muted/40 text-gray dark:text-gray-300"}`}
              onClick={() => applyFilter(c.key)}
              title={`${c.count} posts`}
            >
              {prettyCategory(c.key)} ({c.count})
            </button>
          ))}
        </div>

        {overflowCategories.length > 0 && (
          <div className="ml-auto relative" ref={dropdownRef}>
            <button
              className={`px-3 py-1 rounded-full flex items-center gap-2 ${open ? "bg-accent-color text-white" : "bg-muted/40 text-gray dark:text-gray-300"}`}
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
            >
              Filters
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border rounded shadow z-50 p-2">
                <div className="flex flex-col gap-2">
                  {overflowCategories.map((c) => (
                    <button
                      key={c.key}
                      className={`text-left px-3 py-1 rounded ${filter === c.key ? "bg-accent-color text-white" : "hover:bg-muted/20 dark:hover:bg-slate-700"}`}
                      onClick={() => {
                        applyFilter(c.key)
                        setOpen(false)
                      }}
                    >
                      {prettyCategory(c.key)} ({c.count})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
