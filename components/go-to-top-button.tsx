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
      className="fixed bottom-4 right-4 bg-accent-color text-white rounded-full p-3 shadow-lg hover:bg-accent-color/80 transition-colors z-50"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}