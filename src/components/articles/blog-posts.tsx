import Image from "next/image";
import { Post } from "@/types/blog-type";
import { client, urlFor } from "@/utils/sanity/client";
import { formattedDate } from "@/utils/helper/format-date";
import Link from "next/link";

const BlogPosts = async () => {
  const posts = await client.fetch<Post[]>(`*[_type == "post"] | order(publishedAt desc) {
    title,
    "currentSlug": slug.current,
    description,
    publishedAt,
    _createdAt,
    readDuration,
    mainImage,
    author->,
    categories[]->,
  }`)

  return (
    <div className="mt-16 lg:mt-24">
      <h1 className="font-bold text-2xl lg:text-3xl mb-10 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 bg-clip-text text-transparent">
        All Articles
      </h1>
      <div className="grid flex-col gap-6 mt-8 lg:grid-cols-2 lg:gap-8">
        {posts.map((blogs, idx) => (
          <Link key={idx} href={`blogs/${blogs.currentSlug}`}>
            <article className="group h-[500px] relative flex flex-col overflow-hidden rounded-xl bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm border border-white/10 hover:border-orange-500/20 transition-all duration-300">
              {/* Image Container */}
              <div className="h-[240px] w-full overflow-hidden">
                <Image 
                  src={urlFor(blogs.mainImage).url()} 
                  width={500} 
                  height={500} 
                  alt="blog-post" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-1 gap-4 p-6">
                {/* Categories */}
                <div className="flex gap-2 flex-wrap">
                  {blogs.categories.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    >
                      {tag.title}
                    </span>
                  ))}
                </div>

                {/* Title and Description */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold group-hover:text-orange-500 transition-colors duration-300 mb-3">
                    {blogs.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {blogs.description}
                  </p>
                </div>

                {/* Author and Meta Info */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                  <div className="flex items-center gap-3">
                    <Image 
                      src={urlFor(blogs.author.image).url()} 
                      width={40} 
                      height={40} 
                      alt="author-profile" 
                      className="rounded-full w-9 h-9 object-cover ring-2 ring-orange-500/20"
                    />
                    <div>
                      <p className="font-medium text-sm text-orange-400">{blogs.author.name}</p>
                      <p className="text-xs text-gray-500">{formattedDate(blogs.publishedAt)}</p>
                    </div>
                  </div>
                  
                  <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 font-medium">
                    {blogs.readDuration}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
export default BlogPosts;
