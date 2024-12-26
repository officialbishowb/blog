export interface PostMetaData {
    id: string;
    title: string;
    description: string;
    date: string;
    heroImage: string;
    tags: string[];
    category: string;
  }


  export interface PostData extends PostMetaData {
    contentHtml: string;
  }


  export interface TOCProps {
    headings: { id: string; title: string; level: number }[];
}