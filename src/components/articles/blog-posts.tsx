import Image from "next/image";
import { Content2 } from "@/static/content";
import { useRouter } from "next/navigation";

const BlogPosts = () => {
  const navigate = useRouter();
  const handleClick = (title: string) => {
    navigate.push(`blogs/${title.replaceAll(" ", "-")}`);
  }

  return (
    <div className="mt-16 lg:mt-24">
      <h1 className="font-bold text-3xl lg:text-4xl">Articles</h1>
      <div className="grid flex-col gap-4 mt-16 lg:grid-cols-3 lg:gap-10 lg:max-w-5xl">
        {Content2.map((blogs) => (
            blogs.recent == false ? (
              <div key={blogs.id} className="flex flex-col gap-4 cursor-pointer group overflow-hidden" onClick={() => handleClick(blogs.title)}>
                <div className="flex items-center gap-4 mt-6">
                  <div>
                    <Image src={blogs.profile} width={40} alt="author-profile"></Image>
                  </div>
                  <div>
                    <p className="font-bold text-orange-500">{blogs.author}</p>
                    <p className="text-sm">{blogs.date}</p>
                  </div>
                </div>

                <div className="group-hover:scale-110 transition duration-300 ease-in-out rounded-xl border">
                  <Image src={blogs.image} alt="recent-post" className="rounded-xl border" style={{ width: '100%', height: '100%' }}></Image>
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
                    {blogs.tags.map((tag, indx) => (
                      <p key={indx} className="border border-orange-200 py-1 px-3 text-sm">{tag}</p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )
        ))}
      </div>
    </div>
  );
}

export default BlogPosts;
