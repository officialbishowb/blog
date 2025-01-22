import Link from "next/link";
import { formatDate } from "@/libs/formatDate";
import { PostDisplayProps } from "@/types";

const PostCard: React.FC<PostDisplayProps> = ({ posts, title, emptyMessage }) => {
  return (
    <div className="min-h-screen bg-gray-100 mt-10 sm:mt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        {posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-foreground">{emptyMessage}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {posts.map(({ id, title, description, date, category }, index) => (
              <div
                key={id}
                className={`bg-gray text-foreground rounded-lg shadow-md flex flex-col ${
                  index === 0 ? "border-2 border-foreground" : ""
                }`}
              >
                <Link href={`/posts/${id}`}>
                  <div className="p-4 flex-grow">
                    <p className="text-xl font-semibold text-accent hover:underline">{title}</p>
                    <p className="text-gray-700 mt-4">{description}</p>
                    <small className="text-light-gray mt-2 block">
                      Published on {formatDate(new Date(date))}
                    </small>
                  </div>
                </Link>
                <div className="mt-auto pl-4 py-2">
                  <p className="text-md block text-gray-500">
                    <Link href={`/categories/${category}`} className="bg-gray text-light_gray rounded-lg mr-2">
                      {category}
                    </Link>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
