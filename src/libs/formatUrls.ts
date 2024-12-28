export function formatUrls(htmlContent: string): string {
    const urlRegex = /(?<!<a\s+href=")(https?:\/\/[^\s]+)(?!<\/a>)/g;
    return htmlContent.replace(urlRegex, (url) => `<a href="${url}" target="_blank" class="url-underline">${url}</a>`);
}