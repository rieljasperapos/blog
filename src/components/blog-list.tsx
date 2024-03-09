"use client"
import { BlogList } from "@/static/content";
import { Content2 } from "@/static/content";
import { useRouter } from "next/navigation";
import { IoReturnUpBackOutline } from "react-icons/io5";
import Link from "next/link";

interface BlogProps {
  title: string;
}

const Blogs: React.FC<BlogProps> = ({ title }) => {
  const navigate = useRouter();
  const handleClick = (title: string) => {
    navigate.push(`${title.replaceAll(" ", "-")}`)
  }
  return (
    <>
      <div className="cursor-pointer flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-4 hover:text-orange-500 hover:font-bold">
          <IoReturnUpBackOutline />
          <p>Go back</p>
        </Link>
        <h1 className="font-bold text-lg">Blog Posts</h1>
        <ul>
          {Content2.map((blog, idx) => (
            <li 
              key={idx} 
              className={`${blog.title === title.replaceAll("-", " ") ? "text-orange-500" : ""} mb-2 hover:text-orange-500 hover:underline text-sm`}
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