export interface PostMetaData {
    id: string;
    title: string;
    date: string;
  }


  export interface PostData extends PostMetaData {
    content: string;
  }