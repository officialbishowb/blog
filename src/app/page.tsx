import { getSortedPostsData } from "@/libs/post";
import PostCard from "@/components/PostCard";
import { Post } from "@/types";

const Home = async () => {
  const allPostsData: Post[] = getSortedPostsData();

  return (
    <PostCard
      posts={allPostsData}
      title="Blog Posts"
      emptyMessage="No posts found."
    />
  );
};

export default Home;
