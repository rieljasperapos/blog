import { IoReturnUpBackOutline } from "react-icons/io5";
import Link from "next/link";
import { client } from "@/utils/sanity/client";
import { Post, BlogProps } from "@/types/blog-type";

const Blogs: React.FC<BlogProps> = async ({ title }) => {
  const blogs = await client.fetch<Post[]>(`*[_type == "post"] {
    title,
    "currentSlug": slug.current,
  }`)

  return (
    <>
      <div className="cursor-pointer flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-4 hover:text-orange-500 hover:font-bold">
          <IoReturnUpBackOutline />
          <p>Go back</p>
        </Link>
        <h1 className="font-bold text-lg">Blog Posts</h1>
        <ul>
          {blogs.map((blog, idx) => (
            <Link key={idx} href={`${blog.currentSlug}`}>
              <li 
                className={`${blog.currentSlug === title ? "text-orange-500" : ""} mb-2 hover:text-orange-500 hover:underline text-sm`}
                >
                  {blog.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Blogs;