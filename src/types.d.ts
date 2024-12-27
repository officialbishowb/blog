export interface PostMetaData {
    id: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    category: string;
  }


  export interface PostData extends PostMetaData {
    contentHtml: string;
  }


  export interface TOCProps {
    headings: { id: string; title: string; level: number }[];
}

export type PostIdParams = Promise<{ postId: string }>;
