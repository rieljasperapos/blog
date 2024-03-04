"use client"
import RecentPost from "@/components/articles/recent-post";
import BlogPosts from "@/components/articles/blog-posts";
import { IBlog } from "@/types/blog-type";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogPost, setBlogPost] = useState<IBlog | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data) {
        setBlogPost(data);
      }
    })
    .catch((err: Error) => {
      console.log(`${err}`);
    })
  }, [])

  return (
    <div className="mx-6 lg:mx-24 flex flex-col justify-center items-center">
      <RecentPost />
      <div className="border-t mt-16 lg:mt-24">
        <BlogPosts />
      </div>
    </div>
  );
}
