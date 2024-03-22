import Image from "next/image";
import { client, urlFor } from "@/utils/sanity/client";
import { Post } from "@/types/blog-type";
import Link from "next/link";
import { formattedDate } from "@/components/format-date";

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
    <>
      <div className="flex flex-col gap-4 lg:gap-8 lg:max-w-5xl">
        <h1 className="font-bold text-3xl lg:text-4xl">Recent Post</h1>

        <div className="flex items-center gap-4 mt-6">
          <div>
            <Image src={urlFor(posts.author.image).url()} width={40} height={40} alt="author-profile" className="lg:w-14"></Image>
          </div>
          <div>
            <p className="font-bold text-orange-500 lg:text-lg">{posts.author.name}</p>
            <p className="text-sm">{formattedDate(posts.publishedAt)}</p>
          </div>
        </div>

        <Link href={`blogs/${posts.currentSlug}`}>
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 cursor-pointer group overflow-hidden">
            <div>
              <Image src={urlFor(posts.mainImage).url()} width={1500} height={1000} alt="recent-post" className="rounded-xl" style={{ height: '100%' }}></Image>
            </div>

            <div className="flex flex-col gap-4 justify-center">

              <div className="flex flex-col gap-2">
                <div>
                  <h1 className="text-xl lg:text-3xl font-semibold text-orange-500 group-hover:underline">{posts.title}</h1>
                </div>
                <div>
                  <p className="lg:text-xl">{posts.description}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <span className="font-light text-sm">{posts.readDuration}</span>
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  <p>Tags:</p>
                  {posts.categories.map((tag, idx) => (
                    <p key={idx} className="border border-orange-200 py-1 px-3 text-sm lg:py-2 lg:px-4">{tag.title}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
export default RecentPost;
