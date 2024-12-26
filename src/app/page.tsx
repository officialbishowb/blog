import Navbar from "@/components/Navbar";
import { getSortedPostsData } from "@/libs/post";
import Link from "next/link";

export default async function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allPostsData.map(({ id, title, date }, index) => (
            <div
              key={id}
              className={`bg-gray text-background p-4 rounded-lg shadow-md ${
                index === 0 ? "col-span-3" : ""
              }`}
              style={{ backgroundColor: "#ffffff", borderRadius: "0.75rem" }}
            >
              <Link href={`/posts/${id}`}>
                <p className="text-xl font-semibold text-accent-color hover:underline">{title}</p>
              </Link>
              <br />
              <small className="text-light-gray">{date}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
