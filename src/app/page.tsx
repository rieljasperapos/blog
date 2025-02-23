import RecentPost from "@/components/articles/recent-post";
import BlogPosts from "@/components/articles/blog-posts";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto max-w-2xl p-3.5 min-h-screen">
      <RecentPost />
      <div className="border-t mt-16 lg:mt-24">
        <BlogPosts />
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
