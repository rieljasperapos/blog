import MainWrapper from "@/components/main-wrapper";
import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-screen-2xl lg:mx-10"
      >
        {/* LEFT SIDE PANEL */}
        <ResizablePanel defaultSize={25} className="hidden lg:flex">
          <div className="fixed max-w-64 xl:pl-6">
            <Blogs title={title} />
          </div>
        </ResizablePanel>

        {/* CENTER PANEL */}
        <ResizablePanel defaultSize={50} className="">
          <div className="flex justify-center items-center">
            <div className="flex flex-col h-full gap-6 px-6 xl:px-0">
              <div>
                <h1 className="font-extrabold text-3xl sm:text-5xl">
                  {post?.title}
                </h1>
              </div>
              <div className="text-sm">
                <p>
                  {formattedDate(post.publishedAt)} · {post?.readDuration}
                </p>
              </div>

              <div className="flex gap-4 items-center">
                <div>
                  <Image
                    src={urlFor(post?.author.image).url()}
                    width={50}
                    height={50}
                    alt="profile"
                  />
                </div>
                <div>
                  <h1 className="text-orange-500 font-bold font-sm">
                    {post?.author.name}
                  </h1>
                  <p className="text-xs">Computer Science</p>
                </div>
              </div>

              {/* CONTENT BODY */}
              <div className="max-w-screen-xl prose">
                <PortableText
                  value={post?.body}
                  components={myPortableTextComponents}
                />
              </div>
            </div>
          </div>
        </ResizablePanel>

        {/* RIGHT PANEL */}
        <ResizablePanel defaultSize={25} className="hidden lg:flex">
          <div className="xl:ml-20 fixed max-w-64">
            <Navigation title={title} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </MainWrapper>
  );
};

export const dynamic = "force-dynamic";
export default BlogPage;
