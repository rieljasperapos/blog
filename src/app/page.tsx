import RecentPost from "@/components/articles/recent-post";
import BlogPosts from "@/components/articles/blog-posts";

export default function Home() {
  return (
    <div className="mx-6 lg:mx-24 flex flex-col justify-center items-center">
      <RecentPost />
      <div className="border-t mt-16 lg:mt-24">
        <BlogPosts />
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
