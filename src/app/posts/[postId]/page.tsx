import { getPostData, getSortedPostsData } from "@/libs/post";
import { notFound } from "next/navigation";

export function generateMetaData({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const posts = getSortedPostsData();

  const post = posts.find((post) => post.id === postId);
  if (!post) {
    return notFound();
  }

  return {
    title: post.title,
    date: post.date,
  };
}

const Post = ({ params }: { params: { postId: string } }) => {
  const { postId } = params;
  const posts = getSortedPostsData();

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return notFound();
  }

  const {title,date,content} = getPostData(postId);

  return <div>
    <h1>{title}</h1>
    <p>{date}</p>
    <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>;
    
};

export default Post;
