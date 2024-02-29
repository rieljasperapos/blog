import { BlogList } from "@/static/content";

const Blogs = () => {
  return (
    <>
      <div className="cursor-pointer flex flex-col gap-4">
        <h1 className="font-bold text-lg">Blog Posts</h1>
        <ul>
          {BlogList.map((blog, idx) => (
            <li key={idx} className={`${blog.active ? 'text-orange-500' : ''} mb-4 hover:text-orange-500 hover:underline`}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Blogs;