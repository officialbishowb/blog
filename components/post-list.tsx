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
    <div className="flex flex-wrap items-center gap-2 mb-10">
      <button
        className={`font-label text-xs uppercase tracking-wider px-4 py-1.5 rounded-xl transition-colors ${
          filter === "all"
            ? "bg-[#96DAAF] text-[#131319]"
            : "text-[#bfc9c0] hover:text-[#e5e1eb]"
        }`}
        onClick={() => applyFilter("all")}
      >
        All Posts
      </button>
      {visibleCategories.map((c) => (
        <button
          key={c.key}
          className={`font-label text-xs uppercase tracking-wider px-4 py-1.5 rounded-xl transition-colors ${
            filter === c.key
              ? "bg-[#96DAAF] text-[#131319]"
              : "text-[#bfc9c0] hover:text-[#e5e1eb]"
          }`}
          onClick={() => applyFilter(c.key)}
        >
          {prettyCategory(c.key)}
        </button>
      ))}

      {overflowCategories.length > 0 && (
        <div className="relative" ref={dropdownRef}>
          <button
            className={`font-label text-xs uppercase tracking-wider px-4 py-1.5 flex items-center gap-1.5 transition-colors ${
              open ? "text-[#e5e1eb]" : "text-[#bfc9c0] hover:text-[#e5e1eb]"
            }`}
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
          >
            More
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {open && (
            <div className="absolute left-0 mt-2 w-44 border border-[#404942]/40 z-50 py-1 rounded-xl overflow-hidden" style={{ backgroundColor: "#201f26" }}>
              {overflowCategories.map((c) => (
                <button
                  key={c.key}
                  className={`font-label text-xs uppercase tracking-wider w-full text-left px-4 py-2.5 transition-colors ${
                    filter === c.key
                      ? "text-[#96DAAF]"
                      : "text-[#bfc9c0] hover:text-[#e5e1eb]"
                  }`}
                  onClick={() => {
                    applyFilter(c.key)
                    setOpen(false)
                  }}
                >
                  {prettyCategory(c.key)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
