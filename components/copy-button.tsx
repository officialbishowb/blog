'use client'
import { Copy } from "lucide-react"

export function CopyButton({ url }: { url: string }) {
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => {
          navigator.clipboard.writeText(url)
        }}
        className="flex items-center gap-2 text-[#bfc9c0] text-xs uppercase tracking-widest px-3 py-2 rounded-xl border border-[#404942]/40 bg-[#1C1B22] hover:bg-[#201f26] hover:text-[#e5e1eb] transition-colors w-fit"
      >
        <Copy className="h-3 w-3" />
        Copy Link
      </button>
    </div>
  )
}