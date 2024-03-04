"use client"
import { BlogList } from "@/static/content";
import { Content2 } from "@/static/content";
import { useRouter } from "next/navigation";

interface BlogProps {
  title: string;
}

const Blogs: React.FC<BlogProps> = ({ title }) => {
  const navigate = useRouter();
  const handleClick = (title: string) => {
    navigate.push(`${title}`)
  }
  return (
    <>
      <div className="cursor-pointer flex flex-col gap-4">
        <h1 className="font-bold text-lg">Blog Posts</h1>
        <ul>
          {Content2.map((blog, idx) => (
            <li 
              key={idx} 
              className={`${blog.title === decodeURIComponent(title) ? "text-orange-500" : ""} mb-4 hover:text-orange-500 hover:underline`}
              onClick={() => handleClick(blog.title)}
              >
                {blog.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Blogs;