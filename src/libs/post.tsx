import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { PostData, PostMetaData } from '@/types';

const postsDirectory = path.join(process.cwd(), 'posts');


export function getSortedPostsData(): PostMetaData[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id: fileName.replace(/\.mdx$/, ''),
      ...matterResult.data,
    } as PostMetaData;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostData(id: string): PostData {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    ...matterResult.data,
    content: matterResult.content,
  } as PostData;
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    params: { id: fileName.replace(/\.md$/, '') },
  }));
}
