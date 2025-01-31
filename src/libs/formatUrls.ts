export function formatUrls(htmlContent: string): string {
    // Match URLs starting with http/https not inside <a> tags or markdown-style links
    const urlRegex = /(?<!<a\s+(?:[^>]*?\s+)?href=["']|]\()(https?:\/\/[^\s"'<>]+)(?!["'])/g;

    return htmlContent.replace(urlRegex, (url) => `<a href="${url}" target="_blank" class="blog-link">${url}</a>`);
}
