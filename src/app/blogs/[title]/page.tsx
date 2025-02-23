import MainWrapper from "@/components/main-wrapper";
import Image from "next/image";
import Blogs from "@/components/blog-list";
import Navigation from "@/components/navigation";
import { BlogParams } from "@/types/blog-type";
import { client, urlFor } from "@/utils/sanity/client";
import { Post } from "@/types/blog-type";
import { PortableText } from "next-sanity";
import { myPortableTextComponents } from "@/utils/components/portable-component";
import { formattedDate } from "@/utils/helper/format-date";

const BlogPage = async ({ params: { title } }: BlogParams) => {
  const post =
    await client.fetch<Post>(`*[_type == "post" && slug.current == "${title}"][0] {
    title,
    "currentSlug": slug.current,
    body,
    _createdAt,
    publishedAt,
    readDuration,
    mainImage,
    author->,
    categories[]->,
  }`);

  return (
    <MainWrapper>
      <div className="flex w-full justify-center">
        {/* LEFT SIDE PANEL */}
        <div className="hidden xl:block w-64 fixed left-0 top-24 pl-8">
          <Blogs title={title} />
        </div>

        {/* CENTER PANEL */}
        <main className="max-w-2xl w-full px-4 mx-auto">
          <div className="flex flex-col h-full">
            {/* Article Container */}
            <article className="rounded-2xl">
              {/* Title Section */}
              <div className="space-y-6 mb-8">
                <h1 className="font-extrabold text-3xl sm:text-4xl bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 bg-clip-text text-transparent leading-tight">
                  {post?.title}
                </h1>
                <div className="flex gap-2 flex-wrap">
                  {post?.categories.map((category, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-zinc-500">
                  {formattedDate(post.publishedAt)} · {post?.readDuration}
                </div>
              </div>

              {/* Author Section */}
              <div className="flex gap-4 items-center border-t border-zinc-100 py-6">
                <Image
                  src={urlFor(post?.author.image).url()}
                  width={50}
                  height={50}
                  alt="profile"
                  priority={true}
                  className="rounded-full ring-2 ring-orange-500/20"
                />
                <div>
                  <h2 className="text-orange-500 font-bold text-sm">
                    {post?.author.name}
                  </h2>
                  <p className="text-xs text-zinc-500">Computer Science</p>
                </div>
              </div>

              {/* Content Body */}
              <div className=" max-w-none
                prose-headings:font-display
                prose-headings:font-bold
                prose-headings:tracking-tight
                prose-headings:scroll-mt-24
                prose-h1:text-3xl
                prose-h1:mb-6
                prose-h1:leading-tight
                prose-h2:text-2xl
                prose-h2:mt-10
                prose-h2:mb-4
                prose-h3:text-xl
                prose-h3:mt-8
                prose-h3:mb-3
                prose-p:leading-7
                prose-p:mb-5
                prose-ul:my-6
                prose-ul:ml-6
                prose-ul:list-disc
                prose-ol:my-6
                prose-ol:ml-6
                prose-li:text-base
                prose-li:leading-7
                prose-li:mb-2
                prose-img:rounded-xl
                prose-img:shadow-lg
                prose-strong:font-semibold
                prose-code:bg-orange-50
                prose-code:rounded
                prose-code:px-1.5
                prose-code:py-0.5
                prose-code:text-[13px]
                prose-code:before:content-none
                prose-code:after:content-none
                prose-pre:border
                prose-pre:p-4
                prose-pre:rounded-lg
                prose-blockquote:bg-orange-50
                prose-blockquote:px-6
                prose-blockquote:py-4
                prose-blockquote:rounded-r-lg
                prose-blockquote:not-italic
                prose-blockquote:leading-7
                prose-a:text-orange-600
                prose-a:font-medium
                prose-a:underline
                prose-a:underline-offset-2
                prose-a:decoration-orange-500/30
                prose-a:transition-colors
                hover:prose-a:text-orange-500
                prose-hr:border-zinc-200
              ">
                <PortableText
                  value={post?.body}
                  components={myPortableTextComponents}
                />
              </div>
            </article>
          </div>
        </main>

        {/* RIGHT SIDE PANEL */}
        <div className="hidden xl:block w-64 fixed right-0 top-24 pr-8">
          <Navigation title={title} />
        </div>
      </div>
    </MainWrapper>
  );
};

export const dynamic = "force-dynamic";
export default BlogPage;
