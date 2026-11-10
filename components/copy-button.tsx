'use client'
import { useState } from "react"
import { Check, Copy } from "lucide-react"

export function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => {
          navigator.clipboard.writeText(url)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
        className="ds-btn ds-btn-secondary min-h-10 px-3.5 text-sm w-fit"
      >
        {copied ? <Check aria-hidden="true" className="h-4 w-4 text-primary" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  )
}