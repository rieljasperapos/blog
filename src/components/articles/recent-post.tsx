import Image from "next/image";
import { client, urlFor } from "@/utils/sanity/client";
import { Post } from "@/types/blog-type";
import Link from "next/link";
import { formattedDate } from "@/utils/helper/format-date";

const RecentPost = async () => {
  const posts = await client.fetch<Post>(`*[_type == "post"] | order(publishedAt desc)[0] {
    title,
    "currentSlug": slug.current,
    body,
    description,
    _createdAt,
    publishedAt,
    readDuration,
    mainImage,
    author->,
    categories[]->,
  }`)

  return (
    <div className="w-full">
      <h2 className="font-bold text-2xl lg:text-3xl mb-10 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 bg-clip-text text-transparent">
        Featured Post
      </h2>

      <Link href={`blogs/${posts.currentSlug}`}>
        <article className="group relative flex flex-col overflow-hidden rounded-xl bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm border border-white/10 hover:border-orange-500/20 transition-all duration-300">
          {/* Image Container */}
          <div className="aspect-[16/9] w-full overflow-hidden">
            <Image 
              src={urlFor(posts.mainImage).url()} 
              width={1500} 
              height={1000} 
              alt="featured-post" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content Container */}
          <div className="flex flex-col gap-6 p-6">
            {/* Categories */}
            <div className="flex gap-2 flex-wrap">
              {posts.categories.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20"
                >
                  {tag.title}
                </span>
              ))}
            </div>

            {/* Title and Description */}
            <div className="space-y-3">
              <h3 className="text-xl lg:text-2xl font-bold group-hover:text-orange-500 transition-colors duration-300">
                {posts.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                {posts.description}
              </p>
            </div>

            {/* Author and Meta Info */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <Image 
                  src={urlFor(posts.author.image).url()} 
                  width={40} 
                  height={40} 
                  alt="author-profile" 
                  className="rounded-full w-9 h-9 object-cover ring-2 ring-orange-500/20"
                />
                <div>
                  <p className="font-medium text-sm text-orange-400">{posts.author.name}</p>
                  <p className="text-xs text-gray-500">{formattedDate(posts.publishedAt)}</p>
                </div>
              </div>
              
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 font-medium">
                {posts.readDuration}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

export const dynamic = "force-dynamic";
export default RecentPost;
