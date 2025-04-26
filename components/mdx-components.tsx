"use client"

import { useEffect, useState } from "react"
import Prism from "prismjs"
import { PrismTheme } from "./prism-theme"
import { FAQToggle } from "./ui/faq-toggle"
import { createRoot } from "react-dom/client"

interface MdxProps {
  source: string
}

export function Mdx({ source }: MdxProps) {
  const [content, setContent] = useState<string>("")
  const [faqElements, setFaqElements] = useState<React.ReactNode[] | null>(null)

  // Process code blocks with language detection for syntax highlighting
  const processCodeBlocks = (content: string) => {
    // Match code blocks with language specification: ```language\ncode\n```
    return content.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, language, code) => {
      const lang = language || "plaintext"
      const highlightedCode = code.trim()

      return `<pre class="language-${lang}"><code class="language-${lang}">${escapeHtml(highlightedCode)}</code></pre>`
    })
  }

  // Escape HTML to prevent XSS
  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }

  // Process FAQ content
  const processFAQ = (content: string) => {
    // Extract content between [FAQ] and [END]
    const faqMatch = content.match(/\[FAQ\]([\s\S]*?)\[END\]/)
    if (!faqMatch) return null

    const faqContent = faqMatch[1].trim()
    // Split on headers that start with # and have content after them
    const sections = faqContent.split(/(?=^#{1,6}\s[^\n]+\n)/m).filter(section => section.trim())
    
    return sections.map((section) => {
      const [header, ...answerLines] = section.trim().split('\n')
      const question = header.replace(/^#{1,6}\s/, '').trim()
      const answer = answerLines.join('\n').trim()
      const toggleId = question
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
      
      // Process the answer as markdown
      const processedAnswer = processMarkdown(answer)
      
      return <FAQToggle key={question} toggleId={toggleId} question={question} answer={processedAnswer} />
    })
  }

  // Process regular markdown content
  const processMarkdown = (content: string) => {
    return content
      .replace(/^(#{1,6})\s+(.+)$/gm, (_, hashes, title) => {
        const level = hashes.length
        const id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
        
        const headingClasses: Record<number, string> = {
          1: "text-4xl md:text-5xl font-bold mb-6 text-white",
          2: "text-3xl md:text-4xl font-bold mb-5 text-white",
          3: "text-2xl md:text-3xl font-bold mb-4 text-white",
          4: "text-xl md:text-2xl font-bold mb-3 text-white",
          5: "text-lg md:text-xl font-bold mb-2 text-white",
          6: "text-base md:text-lg font-bold mb-2 text-white",
        }

        const headingClass = headingClasses[level] || "text-white"

        return `<h${level} id="${id}" class="${headingClass}">${title}</h${level}>`
      })
      .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="my-4 rounded-lg max-w-full h-auto" />')
      .replace(/(?<![\[\(])(https?:\/\/[^\s<]+[^<.,:;"')\]\s])(?![\]\)])/g, (match) => {
        const linkClass = "text-accent-color hover:underline inline-flex items-center gap-1"
        const externalIcon = '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>'
        return `<a href="${match}" class="${linkClass}" target="_blank" rel="noopener noreferrer">${match}${externalIcon}</a>`
      })
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
        const isInternalLink = url.startsWith('#')
        const linkClass = "text-accent-color hover:underline inline-flex items-center gap-1"
        const externalIcon = '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>'
        
        if (isInternalLink) {
          return `<a href="${url}" class="${linkClass}">${text}</a>`
        } else {
          return `<a href="${url}" class="${linkClass}" target="_blank" rel="noopener noreferrer">${text}${externalIcon}</a>`
        }
      })
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="text-gray">$1</em>')
      .replace(/(?<!`)`([^`]+)`(?!`)/g, '<code class="bg-[#1a1a1a] dark:bg-[#2a2a2a] px-2 py-1 rounded-md text-sm font-mono border border-[#e0e0e0] dark:border-[#3a3a3a] text-accent-color">$1</code>')
      .replace(/^-\s+(.+)$/gm, '<li class="text-gray ml-4 my-2">$1</li>')
      .replace(/^\d+\.\s+(.+)$/gm, '<li class="text-gray ml-4 my-2">$1</li>')
      .replace(/(<li class="text-gray ml-4 my-2">[^<]+<\/li>\n?)+/g, (match) => {
        const isOrdered = /^\d+\./.test(match)
        return `<${isOrdered ? 'ol' : 'ul'} class="${isOrdered ? 'list-decimal' : 'list-disc'} pl-6 my-4">${match}</${isOrdered ? 'ol' : 'ul'}>`
      })
      .replace(/^(?!<h|<pre|<ul|<ol|<li|<blockquote)(.+)$/gm, '<p class="text-gray my-4">$1</p>')
  }

  useEffect(() => {
    // First create the FAQ elements
    const faqItems = processFAQ(source)
    setFaqElements(faqItems)

    // Then process the content, replacing the FAQ section with a placeholder
    const contentWithoutFAQ = source.replace(/\[FAQ\]([\s\S]*?)\[END\]/, '<div id="faq-section"></div>')
    const processedContent = processMarkdown(contentWithoutFAQ)
    const finalContent = processCodeBlocks(processedContent)
    setContent(finalContent)

    // Highlight code blocks
    Prism.highlightAll()
  }, [source])

  // Effect to insert FAQ items into the #faq-section div
  useEffect(() => {
    if (faqElements) {
      const faqSection = document.getElementById('faq-section')
      if (faqSection) {
        const faqContainer = document.createElement('div')
        faqContainer.className = 'space-y-4'
        faqElements.forEach(element => {
          const div = document.createElement('div')
          const root = createRoot(div)
          root.render(element)
          faqContainer.appendChild(div)
        })
        faqSection.appendChild(faqContainer)
      }
    }
  }, [faqElements])

  return (
    <>
      <PrismTheme />
      <div className="mdx-content">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  )
}
