"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import Link from "next/link"

const navLinks = [
  { name: "Posts", href: "/" },
  { name: "Portfolio", href: "https://officialbishowb.com" },
  { name: "Books", href: "https://officialbishowb.com/books" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="ds-container flex min-h-[4.5rem] items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 min-h-11 text-lg font-semibold tracking-tight text-foreground"
        >
          <span aria-hidden="true" className="block h-2.5 w-2.5 rounded-full bg-primary" />
          Bishow B.
          <span className="ds-label text-subtle">/ blog</span>
        </Link>

        <nav aria-label="Main" className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const external = link.href.startsWith("http")
            return (
              <a
                key={link.name}
                href={link.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-1 px-3.5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
                {external && <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />}
              </a>
            )
          })}
          <a
            href="https://officialbishowb.com/#contact"
            className="ds-btn ds-btn-secondary ml-2 min-h-10 px-4 text-sm"
          >
            Contact
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen && (
        <nav aria-label="Mobile" className="md:hidden border-t border-border">
          <div className="ds-container flex flex-col py-2">
            {[...navLinks, { name: "Contact", href: "https://officialbishowb.com/#contact" }].map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="py-3.5 text-base font-medium text-muted-foreground hover:text-foreground border-b border-border last:border-b-0"
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
