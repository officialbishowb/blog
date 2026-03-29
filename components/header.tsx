"use client"

import { useState, useEffect } from "react"
import { Menu, X, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const navLinks = [
    { name: "Portfolio", href: "https://officialbishowb.com" },
    { name: "Blog", href: "/" },
    { name: "Contact", href: "https://officialbishowb.com/#contact" },
  ]

  const pillStyle = {
    backgroundColor: "rgba(32, 31, 38, 0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  }

  return (
    <div
      className="fixed top-4 z-50 w-[92vw] md:w-auto"
      style={{ left: "50%", transform: "translateX(-50%)" }}
    >
      {/* Main pill */}
      <div
        className="relative flex items-center justify-between md:justify-start gap-2 px-4 h-12 rounded-full border border-[#404942]/40"
        style={pillStyle}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/assets/images/blog_logo_light.png"
            alt="Blog"
            width={100}
            height={28}
            className="h-6 w-auto"
          />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1 ml-3">
          {navLinks.map((link) =>
            link.href.startsWith("https") ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-xs flex items-center gap-1 px-4 py-1.5 text-[#bfc9c0] hover:text-[#e5e1eb] transition-colors"
              >
                {link.name}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="font-label text-xs px-4 py-1.5 text-[#e5e1eb] transition-colors"
              >
                {link.name}
              </Link>
            ),
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-1.5 text-[#bfc9c0] hover:text-[#e5e1eb] transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div
          className="md:hidden absolute top-full mt-2 left-0 right-0 rounded-2xl border border-[#404942]/40 py-3 px-3"
          style={pillStyle}
        >
          {navLinks.map((link) =>
            link.href.startsWith("https") ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-xs flex items-center gap-2 px-4 py-3 rounded-xl text-[#bfc9c0] hover:text-[#e5e1eb] hover:bg-[#404942]/20 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="font-label text-xs flex px-4 py-3 rounded-xl text-[#e5e1eb] hover:bg-[#404942]/20 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ),
          )}
        </div>
      )}
    </div>
  )
}
