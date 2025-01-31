export function convertToDropdowns(contentHtml: string): string {
    const dropDownRegex = /<p>\[FAQ\]\s*<\/p>\s*<h([2-4])([^>]*)>([^<]+)<\/h\1>([\s\S]*?)(?=(?:<h[2-4]|<p>\[DROP_DOWN\]|$))/g;
  
    return contentHtml.replace(dropDownRegex, (match, headingLevel, attributes, title, body) => {
    const id = title.trim().toLowerCase().replace(/\s+/g, '-');
    return `
      <div style="margin-bottom: 1rem;">
        <details class="group" style="border: 1px solid var(--light-gray); border-radius: var(--border-radius); padding: 1rem;">
          <summary class="flex cursor-pointer list-none items-center justify-between font-medium text-lg text-gray-900 dark:text-gray-100">
            <span id="${id}" class="text-underline">${title}</span>
            <span class="transition-transform duration-300 group-open:rotate-180">
              <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </summary>
          <div class="group-open:animate-fadeIn text-neutral-600 dark:text-neutral-400" style="margin-top: .9rem; padding-left: 1rem;">
            ${body.trim()}
          </div>
        </details>
      </div>
    `;
    });
}
