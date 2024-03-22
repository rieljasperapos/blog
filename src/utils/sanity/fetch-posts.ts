import { client } from "@/utils/sanity/client";
import { Post } from "@/types/blog-type";

export const fetchPosts = async () => {
  try {
    const posts = await client.fetch<Post[]>(`*[_type == "post"] {
      title,
      "currentSlug": slug.current,
    }`);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};