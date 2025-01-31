export function containerizeContent(contentHtml: string): string {
  // Regex to match headings (h2, h3, h4) with their IDs and text content
  const headingRegex = /<h([2-4]) id="([^"]+)">([^<]+)<\/h\1>/g;
  
  const blocks: string[] = [];
  let match;
  let lastIndex = 0;

  while ((match = headingRegex.exec(contentHtml)) !== null) {
    const currentHeadingIndex = match.index;

    // If not the first heading, wrap the previous section in a <div>
    if (lastIndex !== 0) {
      blocks.push(`<div>${contentHtml.slice(lastIndex, currentHeadingIndex)}</div>`);
    }

    // Add the current heading itself as part of the next section
    blocks.push(match[0]);
    lastIndex = currentHeadingIndex + match[0].length;
  }

  // Wrap the remaining content after the last heading in a <div>
  if (lastIndex < contentHtml.length) {
    blocks.push(`<div>${contentHtml.slice(lastIndex)}</div>`);
  }

  // Join and return the containerized HTML
  return blocks.join('');
}
