import { formatDate } from "@/libs/formatDate";
import {
  getPostData,
  getSortedPostsData,
  getPostDataHeader,
} from "@/libs/post";
import { notFound } from "next/navigation";
import { calculateReadTime } from "@/libs/calculateReadTime";
import Image from "next/image";
import styles from "@/app/styles/Post.module.css";
import TOC from "@/components/TOC";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { Metadata } from "next";


export async function generateMetadata({ params }: { params: { postId: string } }): Promise<Metadata> {
  const { postId } = params;
  const posts = getSortedPostsData();

  const post = posts.find((post) => post.id === postId);
  if (!post) {
    return notFound();
  }

  return {
    title: post.title,
    description: post.description,
  };
}


const Post = async ({ params }: { params: { postId: string } }) => {
  const { postId } = await params;
  const posts = getSortedPostsData();

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return notFound();
  }

  const { title, date, contentHtml } = await getPostData(postId);

  // Format the date
  const formattedDate = formatDate(new Date(date));
  const postHeadings = await getPostDataHeader(postId);
  const postUrl = `https://blog.officialbishowb.com/posts/${postId}`;


  return (
    <div className="container mx-auto px-10 py-8 mt-40 flex justify-center">
      <div className="w-full flex flex-col md:flex-row">
        {/* Table of Contents */}
        <div className="hidden xl:block xl:w-1/3 mr-8">
          <TOC headings={postHeadings.headings} />
        </div>

        {/* Main Content Section */}
        <div className="w-full max-w-4xl xl:max-w-3xl">
          {/* Published Date & Read Time  & Share link*/}
          <div className="flex justify-between items-center text-light_gray">
            <p>
              Published on <strong>{formattedDate}</strong> -{" "}
              <strong>{calculateReadTime(contentHtml)} min</strong> read
            </p>

            <div className="share-icons flex items-center">
              <a
                href={`https://twitter.com/intent/tweet?url=${postUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2"
              >
                <FaSquareXTwitter size={24} />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold mt-4">{title}</h1>

          {/* Tags */}
            <div className="flex flex-wrap mt-4">
                {post.tags.map((tag) => (
                <a
                    key={tag}
                    href={`/tags/${tag}`}
                    className="bg-gray text-light_gray px-2 py-1 rounded-lg mr-2"
                >
                    <span
                    key={tag}
                    className="text-foreground px-2 py-1 rounded-full mr-2 mb-2"
                >
                    {tag}
                </span>
                </a>
                ))}
            </div>

          {/* Hero Image */}
          <Image
            src={post.heroImage}
            alt={title}
            width={800}
            height={400}
            className="rounded-lg w-full mt-6"
          />

          {/* Table of Contents for medium screens */}
          <div className="block xl:hidden mt-8">
            <TOC headings={postHeadings.headings} />
          </div>

          {/* Divider */}
          <hr className="my-8 text-light_gray" />

          {/* Post Content */}
          <div
            className={`prose max-w-none ${styles.content}`}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
