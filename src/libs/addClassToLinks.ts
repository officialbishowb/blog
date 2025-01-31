export function addClassToLinks(contentHtml: string, className: string): string {
    const urlRegex = /<a\s+(?:[^>]*?\s+)?href=["']([^"']*)["']([^>]*)>/g;
    return contentHtml.replace(urlRegex, (match, url, rest) => {
        if (url.startsWith('#')) {
            return `<a href="${url}" class="${className}"${rest}>`;
        } else {
            return `<a href="${url}" class="${className}" target="_blank" rel="noopener noreferrer"${rest}>`;
        }
    });
}