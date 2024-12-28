export function calculateReadTime(content: string): number {
    const wordsPerMinute = 200; // Average reading speed of an adult (words per minute)
    const words = content.split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return readTime;
}