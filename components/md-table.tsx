import React from 'react'

type Props = {
  /** Full markdown content (can contain zero or more markdown tables) */
  content: string
  className?: string
}


export default function MarkdownTableRenderer({ content, className }: Props) {
  const segments = splitIntoSegments(content)

  return (
    <div className={className}>
      {segments.map((seg, i) =>
        seg.type === 'table' ? (
          <TableBlock key={i} header={seg.header} rows={seg.rows} />
        ) : (
          <TextBlock key={i} text={seg.text} />
        )
      )}
    </div>
  )
}

type Segment =
  | { type: 'table'; header: string[]; rows: string[][] }
  | { type: 'text'; text: string }

function splitIntoSegments(md: string): Segment[] {
  const lines = md.replace(/\r\n?/g, '\n').split('\n')
  const segments: Segment[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // detect table header: line starting with '|', and next line is a separator like '| --- | --- |'
    if (/^\s*\|/.test(line) && i + 1 < lines.length && isSeparatorLine(lines[i + 1])) {
      const headerLine = line
      const rows: string[][] = []
      i += 2 // skip header and separator

      // collect following lines that look like table rows
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        rows.push(splitTableCells(lines[i]))
        i++
      }

      const header = splitTableCells(headerLine)
      segments.push({ type: 'table', header, rows })
      continue
    }

    // collect non-table text until next table
    const buf: string[] = []
    while (i < lines.length && !(/^\s*\|/.test(lines[i]) && i + 1 < lines.length && isSeparatorLine(lines[i + 1]))) {
      buf.push(lines[i])
      i++
    }
    segments.push({ type: 'text', text: buf.join('\n') })
  }

  return segments
}

function isSeparatorLine(line: string) {
  // match a pipe-delimited separator line like: | --- | :---: | --- |
  return /^\s*\|\s*[:\-\s|]+\|?\s*$/.test(line)
}

function splitTableCells(line: string) {
  // remove leading/trailing pipe then split on pipes
  const trimmed = line.trim()
  const withoutEdges = trimmed.replace(/^\|/, '').replace(/\|$/, '')
  // simple split; trims each cell
  return withoutEdges.split('|').map((c) => c.trim())
}

/**
 * Convert any Markdown pipe-tables in the input to HTML table strings.
 * Non-table text is returned unchanged so the caller can continue other markdown processing.
 */
export function renderTablesAsHtml(md: string): string {
  const segments = splitIntoSegments(md)
  return segments
    .map((seg) => {
      if (seg.type === 'text') return seg.text
      const headerHtml = seg.header
        .map((h) => `<th class="text-left border-b border-accent-color px-2 py-1 align-top">${inlineToHtml(h)}</th>`)
        .join('')
      const rowsHtml = seg.rows
        .map(
          (r) =>
            `<tr>${r
              .map((c) => `<td class="px-2 py-2 align-top border border-accent-color">${inlineToHtml(c)}</td>`)
              .join('')}</tr>`
        )
        .join('')

      return `<table class="markdown-table w-full border-collapse my-4 border border-accent-color"><thead><tr>${headerHtml}</tr></thead><tbody>${rowsHtml}</tbody></table>`
    })
    .join('\n')
}

function TableBlock({ header, rows }: { header: string[]; rows: string[][] }) {
  return (
    <table className="markdown-table w-full border-collapse my-4 border border-accent-color">
      <thead>
        <tr>
          {header.map((h, idx) => (
            <th key={idx} className="text-left border-b border-accent-color px-2 py-1 align-top">
              <CellContent text={h} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, ri) => (
          <tr key={ri} className={ri % 2 === 0 ? 'bg-transparent' : 'bg-slate-50'}>
            {r.map((c, ci) => (
              <td key={ci} className="px-2 py-2 align-top border border-accent-color">
                <CellContent text={c} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function TextBlock({ text }: { text: string }) {
  // split paragraphs by blank lines
  const paras = text.split(/\n{2,}/).filter(Boolean)
  return (
    <>
      {paras.map((p, i) => (
        <p key={i} className="my-3">
          <InlineNodes text={p} />
        </p>
      ))}
    </>
  )
}

/** Render a table/text cell's inline content into React nodes (handles **bold**, *italic*, and <br>) */
function CellContent({ text }: { text: string }) {
  return <InlineNodes text={text} />
}

function InlineNodes({ text }: { text: string }) {
  // normalize <br> to literal newline and trim surrounding pipes/spaces
  const normalized = text.replace(/<br\s*\/?>/gi, '\n').trim()

  // split by newline and render <br/> between lines
  const lines = normalized.split('\n')

  const nodes: React.ReactNode[] = []

  lines.forEach((line, li) => {
    const children = parseInlineFormatting(line)
    nodes.push(...children)
    if (li !== lines.length - 1) nodes.push(<br key={`br-${li}`} />)
  })

  return <>{nodes}</>
}

function parseInlineFormatting(text: string): React.ReactNode[] {
  // very small parser: handle **bold** and *italic* (non-greedy)
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  const boldRe = /\*\*(.+?)\*\*/g
  let m: RegExpExecArray | null

  while ((m = boldRe.exec(text)) !== null) {
    const idx = m.index
    if (idx > lastIndex) nodes.push(renderPlain(text.slice(lastIndex, idx)))
    nodes.push(<strong key={`b-${idx}`}>{renderItalicInline(m[1])}</strong>)
    lastIndex = idx + m[0].length
  }

  if (lastIndex < text.length) nodes.push(renderPlain(text.slice(lastIndex)))
  return nodes
}

function renderItalicInline(text: string): React.ReactNode {
  // handle single-star italics inside a string -- return array or element
  const parts: React.ReactNode[] = []
  let last = 0
  const re = /\*(.+?)\*/g
  let mm: RegExpExecArray | null
  while ((mm = re.exec(text)) !== null) {
    if (mm.index > last) parts.push(text.slice(last, mm.index))
    parts.push(<em key={`i-${mm.index}`}>{mm[1]}</em>)
    last = mm.index + mm[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}

function renderPlain(s: string): React.ReactNode {
  // escape nothing here because content is local; keep it simple
  return s
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function inlineToHtml(text: string) {
  // escape, then convert simple inline formatting and preserve <br>
  let out = escapeHtml(text).replace(/<br\s*\/?>/gi, '<br/>')
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  out = out.replace(/\*(.+?)\*/g, '<em>$1</em>')
  return out
}
