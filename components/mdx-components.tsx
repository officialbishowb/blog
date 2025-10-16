"use client"

import { useEffect, useState } from "react"
import Prism from "prismjs"
import { PrismTheme } from "./prism-theme"
import { FAQToggle } from "./ui/faq-toggle"
import { createRoot } from "react-dom/client"
import { renderToStaticMarkup } from 'react-dom/server'
import { Info, Lightbulb, AlertTriangle, FileText } from 'lucide-react'
import { renderTablesAsHtml } from './md-table'

interface MdxProps {
  source: string
}

export function Mdx({ source }: MdxProps) {
  const [content, setContent] = useState<string>("")
  const [faqElements, setFaqElements] = useState<React.ReactNode[] | null>(null)
  // Store callout HTML blocks temporarily so they don't get mangled by later regexes
  const calloutStore = new Map<string, string>()
  let calloutCounter = 0

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
  // First, convert pipe-based markdown tables into HTML so they aren't mangled by later regexes
  content = renderTablesAsHtml(content)

  // Normalize explicit HTML break tags to a canonical <br/> and convert Markdown "two spaces + newline" line breaks to <br/>
  content = content.replace(/<br\s*\/?>/gi, '<br/>')
  content = content.replace(/ {2}\n/g, '<br/>\n')

    // Handle blockquotes: group all consecutive blockquote lines into a single blockquote
    // This handles cases where blockquotes might be separated by empty lines
    const lines = content.split('\n');
    const processedLines = [];
    let currentBlockquote = [];
    let inBlockquote = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.startsWith('>')) {
        // Start or continue blockquote
        if (!inBlockquote) {
          inBlockquote = true;
        }
        currentBlockquote.push(line.replace(/^> ?/, ''));
      }else if (inBlockquote) {
        // End of blockquote - process and add to result
        if (currentBlockquote.length > 0) {
          const processedBlockquote = processBlockquoteContent(currentBlockquote);
          processedLines.push(processedBlockquote);
          currentBlockquote = [];
        }
        inBlockquote = false;
        processedLines.push(line);
      } else {
        // Regular line
        processedLines.push(line);
      }
    }
    
    // Handle any remaining blockquote at the end
    if (currentBlockquote.length > 0) {
      const processedBlockquote = processBlockquoteContent(currentBlockquote);
      processedLines.push(processedBlockquote);
    }
    
  content = processedLines.join('\n');
    
    // Horizontal rules (---, ***, ___)
    content = content.replace(/^(\s*)([-*_]){3,}\s*$/gm, '<hr class="my-6 border-t border-gray-300 dark:border-gray-700" />');
    // Indented code blocks (4 spaces or a tab)
    content = content.replace(/^(?:    |\t)(.+)$/gm, (match, code) => {
      return `<pre class="language-plaintext"><code class="language-plaintext">${escapeHtml(code)}</code></pre>`;
    });
    content = content
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
      // Unordered list
      .replace(/^-\s+(.+)$/gm, '<li class="text-gray ml-4 my-2">$1</li>')
      // Ordered list
      .replace(/^\d+\.\s+(.+)$/gm, '<li class="text-gray ml-4 my-2">$1</li>')
      // List wrapper
      .replace(/(<li class="text-gray ml-4 my-2">[\s\S]*?<\/li>\n?)+/g, (match) => {
        const isOrdered = /^\d+\./.test(match)
        return `<${isOrdered ? 'ol' : 'ul'} class="${isOrdered ? 'list-decimal' : 'list-disc'} pl-6 my-4">${match}</${isOrdered ? 'ol' : 'ul'}>`
      })
      // Bold: __text__ or **text**
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\b__([^_]+)__\b/g, '<strong>$1</strong>')
      // Italic: *text* or _text_
      .replace(/\*([^*]+)\*/g, '<em class="text-gray">$1</em>')
      // Only match underscores for italics if not surrounded by word characters (avoid bleed)
      .replace(/(^|[\s>\(\[.,;:!?'"-])_([^_\s][^_]*?[^_\s])_(?=[\s<\)\].,!?:;'"]|$)/g, '$1<em class="text-gray">$2</em>')
      // Strikethrough: ~~text~~
      .replace(/~~([^~]+)~~/g, '<del>$1</del>')
      // Inline code
      .replace(/(?<!`)`([^`]+)`(?!`)/g, '<code class="bg-[#1a1a1a] dark:bg-[#2a2a2a] px-2 py-1 rounded-md text-sm font-mono border border-[#e0e0e0] dark:border-[#3a3a3a] text-accent-color">$1</code>')
      // Only wrap as paragraph if not already a block element
      .replace(/^(?!<h|<pre|<ul|<ol|<li|<blockquote|<hr)(.+)$/gm, '<p class="text-gray my-4">$1</p>')

    // Inject callouts stored earlier so they are not mangled by regexes
    content = injectCallouts(content)
    return content
  }

  // Helper function to process blockquote content
  const processBlockquoteContent = (lines: string[]) => {
    // Process each line for markdown formatting
    const processedLines = lines.map(line => {
      if (line.trim()) {
        // Process markdown within each line
        return line
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
          .replace(/\b__([^_]+)__\b/g, '<strong>$1</strong>')
          .replace(/\*([^*]+)\*/g, '<em class="text-gray">$1</em>')
          .replace(/(^|[\s>\(\[.,;:!?'"-])_([^_\s][^_]*?[^_\s])_(?=[\s<\)\].,!?:;'"]|$)/g, '$1<em class="text-gray">$2</em>')
          .replace(/~~([^~]+)~~/g, '<del>$1</del>')
          .replace(/(?<!`)`([^`]+)`(?!`)/g, '<code class="bg-[#1a1a1a] dark:bg-[#2a2a2a] px-2 py-1 rounded-md text-sm font-mono border border-[#e0e0e0] dark:border-[#3a3a3a] text-accent-color">$1</code>');
      }
      return line;
    });
    
    // Detect callout pattern on the first line: [!type] Optional Title
    const firstRaw = lines[0] || ''
    const calloutMatch = firstRaw.match(/^\s*\[!([a-zA-Z0-9_-]+)\]\s*(.*)$/)

    if (calloutMatch) {
      const type = calloutMatch[1].toLowerCase()
      const titleText = calloutMatch[2].trim()

      // Remaining content lines (skip the first line which contained the callout marker)
      const bodyLines = processedLines.slice(1).filter(line => line.trim())
      const bodyHtml = bodyLines.map(line => `<p class="mb-2 last:mb-0">${line}</p>`).join('')

      // Use the project's design tokens for callouts regardless of type.
      // Keep icon shape/type but keep container/title/body consistent with project design.
      const calloutStyles: Record<string, { Icon: any; container: string; title: string; body: string }> = {
        note: { Icon: Info, container: 'rounded-md border border-accent-color/20 bg-muted/30 dark:bg-slate-800 p-4 my-4', title: 'font-semibold text-slate-900 dark:text-white', body: 'text-slate-700 dark:text-gray-300' },
        tip: { Icon: Lightbulb, container: 'rounded-md border border-accent-color/20 bg-muted/30 dark:bg-slate-800 p-4 my-4', title: 'font-semibold text-slate-900 dark:text-white', body: 'text-slate-700 dark:text-gray-300' },
        warning: { Icon: AlertTriangle, container: 'rounded-md border border-accent-color/20 bg-muted/30 dark:bg-slate-800 p-4 my-4', title: 'font-semibold text-slate-900 dark:text-white', body: 'text-slate-700 dark:text-gray-300' },
        abstract: { Icon: FileText, container: 'rounded-md border border-accent-color/20 bg-muted/30 dark:bg-slate-800 p-4 my-4', title: 'font-semibold text-slate-900 dark:text-white', body: 'text-slate-700 dark:text-gray-300' }
      }

      const style = calloutStyles[type] || calloutStyles['note']

      // render lucide icon to static SVG markup with project accent color for injection
      const iconSvg = renderToStaticMarkup(style.Icon ? <style.Icon className="w-5 h-5 text-accent-color" /> : <Info className="w-5 h-5 text-accent-color" />)

      // Store callout HTML in the calloutStore and return a placeholder token.
      const token = `@@CALLOUT_${++calloutCounter}@@`
      const html = `
        <blockquote class="${style.container}">
          <div class="flex items-center gap-3">
            <div class="flex-shrink-0">${iconSvg}</div>
            <div class="flex-1">
              ${titleText ? `<div class="${style.title}">${titleText}</div>` : ''}
              <div class="${style.body}">${bodyHtml}</div>
            </div>
          </div>
        </blockquote>
      `
      calloutStore.set(token, html)
      return token
    }

    // Join lines into paragraphs:
    // - consecutive non-empty lines become a single paragraph joined with <br/> (no vertical spacing)
    // - an empty line inside the blockquote creates a paragraph break (adds vertical spacing)
    const paragraphs: string[] = []
    let currentParaLines: string[] = []

    for (const ln of processedLines) {
      if (ln.trim() === '') {
        if (currentParaLines.length) {
          paragraphs.push(currentParaLines.join('<br/>'))
          currentParaLines = []
        }
        // if multiple consecutive blank lines, treat them as a single paragraph break
      } else {
        currentParaLines.push(ln)
      }
    }
    if (currentParaLines.length) paragraphs.push(currentParaLines.join('<br/>'))

    const blockquoteContent = paragraphs.map(p => `<p class="mb-2 last:mb-0">${p}</p>`).join('')

    return `<blockquote class="border border-accent-color/20 bg-muted/30 dark:bg-slate-800 p-4 my-4 text-gray dark:text-gray-300">${blockquoteContent}</blockquote>`;
  }

  // Replace any callout placeholders with their stored HTML. Called at the end of processMarkdown.
  function injectCallouts(content: string) {
    for (const [token, html] of calloutStore.entries()) {
      content = content.split(token).join(html)
    }
    return content
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
