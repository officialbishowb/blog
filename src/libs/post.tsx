import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { addIdsToHeaders } from './addIdsToHeaders';
import { formatUrls } from './formatUrls';
import { highlightCode } from './highlightBlogCode';

import { PostData, TOCProps, PostMetaData } from '@/types';

const postsDirectory = path.join(process.cwd(), 'posts');


export function getSortedPostsData(): PostMetaData[] {
  const fileNames = fs.readdirSync(postsDirectory).filter(fileName => !fileName.includes(' '));

  return fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    if (!fileContents.trim()) {
      return null;
    }

    return {
      id: fileName.replace(/\.mdx$/, ''),
      ...matterResult.data,
    } as PostMetaData;
  }).filter(post => post !== null).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostData(id: string): Promise<PostData & { contentHtml: string }> {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Extract metadata and content
  const matterResult = matter(fileContents);

  // Convert Markdown to HTML using remark
  const processedContent = await remark().use(html).process(matterResult.content);
  let contentHtml = processedContent.toString();

  // Add ids to headers
  contentHtml = addIdsToHeaders(contentHtml);

  // Format links
  contentHtml = formatUrls(contentHtml);

  // Highlight code blocks
  contentHtml = highlightCode(contentHtml);

  return {
    ...(matterResult.data as PostMetaData),
    contentHtml,
  };
}


export async function getPostDataHeader(id: string): Promise<TOCProps> {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Extract metadata and content
  const matterResult = matter(fileContents);

  // Convert Markdown to HTML using remark
  const processedContent = await remark().use(html).process(matterResult.content);
  let contentHtml = processedContent.toString();

  // Add ids to headers
  contentHtml = addIdsToHeaders(contentHtml);

  // Extract headings
  const headings = extractHeadings(contentHtml);

  return {
    headings,
  };
}

function extractHeadings(contentHtml: string): { id: string; title: string; level: number }[] {
  const headingRegex = /<h([1-6]) id="([^"]+)">([^<]+)<\/h\1>/g;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(contentHtml)) !== null) {
    headings.push({
      id: match[2],
      title: match[3],
      level: parseInt(match[1], 10),
    });
  }

  return headings;
}



export function getSortedPostIdsByCategory(category: string): PostMetaData[] {
  const allPosts = getSortedPostsData();
  return allPosts.filter(post => post.category === category).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getSortedPostIdsByTag(tag: string): PostMetaData[] {
  const allPosts = getSortedPostsData();
  return allPosts.filter(post => post.tags.includes(tag)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    params: { id: fileName.replace(/\.md$/, '') },
  }));
}
