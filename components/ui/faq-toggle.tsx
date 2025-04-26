"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQToggleProps {
  question: string
  answer: string
  toggleId: string
}

export function FAQToggle({ question, answer, toggleId }: FAQToggleProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border rounded-lg overflow-hidden mb-4" id={toggleId}>
      <button
        className="w-full flex items-center justify-between p-4 bg-card hover:bg-accent/5 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-bold">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray" />
        )}
      </button>
      <div
        className={cn(
          "p-4 bg-card/50 transition-all duration-300",
          isOpen ? "block" : "hidden"
        )}
      >
        <div className="text-gray prose prose-invert" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </div>
  )
} 