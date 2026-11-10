"use client"

import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPosition = window.scrollY
      const scrollThreshold = 1000 // 1000px
      setIsVisible(scrollPosition > scrollThreshold)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <button 
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}