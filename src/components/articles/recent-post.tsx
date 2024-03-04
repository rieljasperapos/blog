"use client"
import Image from "next/image";
import { BlogList } from "@/static/content";
import { useRouter } from "next/navigation";
import { IBlog } from "@/types/blog-type";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const initialValue: IBlog = {
  title: "",
  author: "",
  description: "",
  readDuration: "",
  image: "",
};

const RecentPost = () => {
  const [recentBlog, setRecentBlog] = useState<IBlog>(initialValue);
  const navigate = useRouter();

  // useEffect(() => {
  //   fetch("http://localhost:8080/blog-recent", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //   })
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error(`Error ${res.status}`);
  //     }
  //     return res.json();
  //   })
  //   .then((data) => {
  //     if (data.valid) {
  //       setRecentBlog(data.blog[0]);
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(`error`);
  //   })
  // }, [])

  const handleClick = (title: string) => {
    navigate.push(`/blogs/${title}`);
  }

  console.log(recentBlog);

  return (
    <>
        {BlogList.map((blogs) => (
            blogs.recent &&
              <div key={blogs.id} className="flex flex-col gap-4 lg:gap-8 lg:max-w-5xl">
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
                {/* {recentBlog.image ? ( */}
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 justify-evenly cursor-pointer" onClick={() => handleClick(blogs.title)}>
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
                        {blogs.tags.map((tag, idx) => (
                          <p key={idx} className="border border-orange-200 py-1 px-3 text-sm lg:py-2 lg:px-4">{tag}</p>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
                {/* ) : ( */}
                  {/* <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 justify-evenly cursor-pointer" onClick={() => handleClick(blogs.title)}>
                    <div>
                        <Skeleton className="lg:w-[400px] h-96 rounded-xl"></Skeleton>
                    </div>

                    <div className="flex flex-col gap-4 justify-center">

                      <div className="flex flex-col gap-2">
                        <div>
                          <Skeleton className="lg:w-[500px] h-8 mb-2"></Skeleton>
                          <Skeleton className="lg:w-[500px] h-8 mb-2"></Skeleton>
                        </div>
                        <div>
                          <Skeleton className="lg:w-[500px] h-24"></Skeleton>
                          <Skeleton className="lg:w-[500px] h-24"></Skeleton>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <div>
                          <Skeleton className="w-[150px] h-4"></Skeleton>
                        </div>
                        <div className="flex gap-2 items-center flex-wrap">
                          <Skeleton className="lg:w-[60px] w-[40px] h-6"></Skeleton>
                          {blogs.tags.map((tag, idx) => (
                            <Skeleton key={idx} className="w-[100px] h-6 lg:h-10 py-1 px-2 lg:py-2 lg:px-4"></Skeleton>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div> */}
                {/* )} */}
                
              </div>
        ))}
    </>
  );
}

export default RecentPost;
