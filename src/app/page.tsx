import { getSortedPostsData } from "@/libs/post";
import Link from "next/link";
import { formatDate } from "@/libs/formatDate";
import Image from "next/image";

export default async function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
        {allPostsData.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-foreground">No posts found.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {allPostsData.map(({ id, title, description, date, heroImage, category }, index) => (
            <div
              key={id}
              className={`bg-gray text-foreground rounded-lg shadow-md ${
                index === 0 ? "col-span-3" : ""
              }`}
            >
              <Link href={`/posts/${id}`}>
                <Image 
                  src={heroImage} 
                  alt={title} 
                  className="w-full h-48 object-cover rounded-t-lg" 
                  width={300} 
                  height={200} 
                />
                <div className="p-4">
                  <p className="text-xl font-semibold text-accent-color hover:underline">{title}</p>
                  <p className="text-gray-700 mt-2">{description}</p>
                  <small className="text-light-gray mt-2 block">Published on {formatDate(new Date(date))}</small>
                </div>
              </Link>

              <p className="text-md block text-gray-500 mt-5 p-4">
                <Link href={`/categories/${category}`} className="bg-gray text-light_gray px-2 py-1 rounded-lg mr-2">
                {category}</Link>
                 
              </p>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}
