import Image from "next/image";
import { BlogList } from "@/static/content";

const BlogPosts = () => {
  return (
    <div className="mt-16">
      <h1 className="font-bold text-3xl lg:text-4xl">Articles</h1>
      <div className="flex flex-col gap-4 mt-16 lg:flex-row lg:gap-10 lg:max-w-5xl">
        {BlogList.map((blogs) => (
          <>
            {blogs.recent == false ? (
              <div className="flex flex-col gap-4 cursor-pointer">
                <div className="flex items-center gap-4 mt-6">
                  <div>
                    <Image src={blogs.author} width={40} alt="author-profile"></Image>
                  </div>
                  <div>
                    <p className="font-bold text-orange-500">{blogs.authorName}</p>
                    <p className="text-sm">{blogs.publishedDate}</p>
                  </div>
                </div>

                <div>
                  <Image src={blogs.image} width={500} alt="recent-post" className="rounded-xl border max-h-44" style={{ height: '100%' }}></Image>
                </div>

                <div className="flex flex-col gap-2">
                  <div>
                    <h1 className="text-xl font-semibold text-orange-500 hover:underline">{blogs.title}</h1>
                  </div>
                  <div>
                    <p>{blogs.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="font-light text-sm">{blogs.readLength}</span>
                  </div>
                  <div className="flex gap-2 items-center flex-wrap">
                    <p>Tags:</p>
                    {blogs.tags.map((tag) => (
                      <p className="border border-orange-200 py-2 px-4 text-sm">{tag}</p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (""

            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default BlogPosts;
