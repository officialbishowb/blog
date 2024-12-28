export function addIdsToHeaders(htmlContent: string): string {
    return htmlContent.replace(/<(h[1-6])>(.*?)<\/\1>/g, (match, tag, content) => {
        const id = content.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        return `<${tag} id="${id}">${content}</${tag}>`;
    });
}
