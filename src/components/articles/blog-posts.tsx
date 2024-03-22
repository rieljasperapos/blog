import Image from "next/image";
import { Post } from "@/types/blog-type";
import { client, urlFor } from "@/utils/sanity/client";
import { formattedDate } from "@/components/format-date";
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
      <h1 className="font-bold text-3xl lg:text-4xl">Articles</h1>
      <div className="grid flex-col gap-4 mt-16 lg:grid-cols-3 lg:gap-10 lg:max-w-5xl">
        {posts.map((blogs, idx) => (
          <Link key={idx} href={`blogs/${blogs.currentSlug}`}>
            <div className="flex flex-col gap-4 cursor-pointer group overflow-hidden">
              <div className="flex items-center gap-4 mt-6">
                <div>
                  <Image src={urlFor(blogs.author.image).url()} width={40} height={40} alt="author-profile"></Image>
                </div>
                <div>
                  <p className="font-bold text-orange-500">{blogs.author.name}</p>
                  <p className="text-sm">{formattedDate(blogs.publishedAt)}</p>
                </div>
              </div>
              
              <div className="transition duration-300 ease-in-out rounded-xl border">
                <Image src={urlFor(blogs.mainImage).url()} width={500} height={500} alt="recent-post" className="rounded-xl border" style={{ width: '100%', height: '100%' }}></Image>
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <h1 className="text-xl font-semibold text-orange-500 group-hover:underline">{blogs.title}</h1>
                </div>
                <div>
                  <p>{blogs.description}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <span className="font-light text-sm">{blogs.readDuration}</span>
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  <p>Tags:</p>
                  {blogs.categories.map((tag, idx) => (
                    <p key={idx} className="border border-orange-200 py-1 px-3 text-sm">{tag.title}</p>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
export default BlogPosts;
