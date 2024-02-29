import Image from "next/image";
import { BlogList } from "@/static/content";

const RecentPost = () => {
  return (
    <>
        {BlogList.map((blogs) => (
          <div className="flex flex-col gap-4 lg:gap-8 lg:max-w-5xl">
            {blogs.recent &&
              <>
                <h1 className="font-bold text-3xl lg:text-4xl">Recent Post</h1>

                <div className="flex items-center gap-4 mt-6">
                  <div>
                    <Image src={blogs.author} width={40} alt="author-profile" className="lg:w-14"></Image>
                  </div>
                  <div>
                    <p className="font-bold text-orange-500 lg:text-lg">{blogs.authorName}</p>
                    <p className="text-sm">{blogs.publishedDate}</p>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 justify-evenly cursor-pointer">
                    <div>
                      <Image src={blogs.image} width={1500} alt="recent-post" className="rounded-xl" style={{ height: '100%' }}></Image>
                    </div>

                    <div className="flex flex-col gap-4 justify-center">

                      <div className="flex flex-col gap-2">
                        <div>
                          <h1 className="text-xl lg:text-3xl font-semibold text-orange-500 hover:underline">{blogs.title}</h1>
                        </div>
                        <div>
                          <p className="lg:text-xl">{blogs.description}</p>
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
                  </div>
              </>
            }
          </div>
        ))}
    </>
  );
}

export default RecentPost;
