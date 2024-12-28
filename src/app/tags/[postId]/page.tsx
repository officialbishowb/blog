import { getSortedPostIdsByTag } from "@/libs/post";
import PostCard from "@/components/PostCard";
import { Post,PostIdParams } from "@/types";

const TagPosts = async ({ params }: { params: PostIdParams }) => {
  const { postId } = await params;
  const allPostsByTags: Post[] = getSortedPostIdsByTag(postId);

  return (
    <PostCard
      posts={allPostsByTags}
      title="Tag Posts"
      emptyMessage="No posts found for this tag."
    />
  );
};

export default TagPosts;
