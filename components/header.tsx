"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, ExternalLink } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useTheme } from "next-themes"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "https://officialbishowb.com/#contact" },
  ]

  const renderLink = (link: { name: string; href: string }) => {
    const isExternal = link.href.startsWith("https")
    const linkContent = (
      <>
        {link.name}
        {isExternal && <ExternalLink className="ml-1 h-4 w-4 inline-block" />}
      </>
    )

    if (isExternal) {
      return (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/80 hover:text-primary transition-colors flex items-center"
        >
          {linkContent}
        </a>
      )
    }

    return (
      <Link key={link.name} href={link.href} className="text-foreground/80 hover:text-primary transition-colors flex items-center">
        {linkContent}
      </Link>
    )
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="text-xl font-bold">
          {mounted && theme ===
           "dark" ? (
            <Image src="/assets/images/blog_logo_light.png" alt="Logo" width={100} height={50} className="h-8 w-auto" />
          ) : (
            <Image src="/assets/images/blog_logo_dark.png" alt="Logo" width={100} height={50} className="h-8 w-auto" />
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(renderLink)}
          <ModeToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="ml-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md">
          <nav className="container py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <div key={link.name} onClick={() => setIsMenuOpen(false)}>
                {renderLink(link)}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
