"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"
import Prism from "prismjs"

// Import Prism core styles
import "prismjs/themes/prism.css"
// Import additional languages
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-python"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-json"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-yaml"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-java"
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-go"
import "prismjs/components/prism-rust"
import "prismjs/components/prism-php"
import "prismjs/components/prism-ruby"

export function PrismTheme() {
  const { theme } = useTheme()

  useEffect(() => {
    // Highlight all code blocks on mount and theme change
    Prism.highlightAll()
  }, [theme])

  return null
}
