import { getSortedPostIdsByCategory } from "@/libs/post";
import PostCard from "@/components/PostCard";
import { Post, PostIdParams} from "@/types"

const CategoryPosts = async ({ params }: { params: PostIdParams }) => {
  const { postId } = await params;
  const allPostsByCategories: Post[] = getSortedPostIdsByCategory(postId);

  return (
    <PostCard
      posts={allPostsByCategories}
      title="Category Posts"
      emptyMessage="No posts found for this category."
    />
  );
};

export default CategoryPosts;
