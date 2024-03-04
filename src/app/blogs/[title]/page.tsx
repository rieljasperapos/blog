import MainWrapper from "@/components/main-wrapper";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Image from "next/image";
import profile from "../../../../public/profilepic.png";
// import { Content } from "@/static/content";
import { Content2 } from "@/static/content";
import Blogs from "@/components/blog-list";
import Navigation from "@/components/navigation";
import Link from "next/link";
import { ScrollProvider } from "@/context/scroll.context";
import { BlogParams } from "@/types/blog-type";

const BlogPage = ({ params: { title } }: BlogParams) => {
  return (
    <ScrollProvider>
      <MainWrapper>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25} className="hidden xl:flex">
            <div className="fixed max-w-64">
              <Blogs />
            </div>
          </ResizablePanel>
          {/* <ResizableHandle withHandle /> */}
          <ResizablePanel defaultSize={50} className="md:px-12">
            {Content2.map((content) => (
              content.title === decodeURIComponent(title) ? (
                <div className="flex flex-col h-full gap-6 p-6">
                  <div>
                    <h1 className="font-extrabold text-3xl sm:text-5xl">{content.title}</h1>
                  </div>
                  <div className="text-sm">
                    <p>{content.date} · {content.readDuration}</p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div>
                      <Image src={profile} width={50} alt="profile" />
                    </div>
                    <div>
                      <h1 className="text-orange-500 font-bold font-sm">{content.author}</h1>
                      <p className="text-xs">Computer Science</p>
                    </div>
                  </div>

                  <div className="flex flex-col max-w-3xl gap-12">
                    <div>
                      {content.image ? (
                        <div>
                          <Image src={content.image} alt="DSA"></Image>
                        </div>
                      ) : (
                        ""
                      )}
                      {content.contents?.map((blog, idx) => (
                        <div className="flex flex-col">
                          {blog.body.map((body, idx) => (
                            <div className="mt-12">
                              <div>
                                <Link href={`#${body.header}`}>
                                  <h1 className="font-bold text-xl sm:text-3xl" id={body.header}>{body.header}</h1>
                                </Link>
                              </div>
                              {body.paragraphs.map((paragraph, idx) => (
                                <div className="flex flex-col">
                                  <p className="font-light my-4">{paragraph.paragraph}</p>
                                  {paragraph.image ? (
                                    <Image src={paragraph.image} width={768} alt="Body Image" />
                                  ) : ""}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>

                  </div>

                </div>
              ) : (
                ""
              )
            ))}
              {/* {Content.content.map((content, idx) => (
                  <div key={idx}>
                    {content.headerImage ? (
                      <div className="mb-12">
                        <Image src={content.headerImage} alt="DSA"></Image>
                      </div>
                    ) : ""
                    }
                    <div>
                      <div className="mb-4">
                        <Link href={`#${content.header}`}>
                          <h1 className="font-bold text-xl sm:text-3xl" id={content.header}>{content.header}</h1>
                        </Link>
                      </div>
                      <div className="flex flex-col gap-4">
                        <p className="font-light">{content.body}</p>
                        {content.bodyImage ? (
                          <Image src={content.bodyImage} width={768} alt="Body Image" />
                        ) : ""}
                        <p className="font-light">{content.body1}</p>
                        <p className="font-light">{content.body2}</p>
                      </div>
                    </div>
                  </div>
                ))} */}
        </ResizablePanel>
        {/* <ResizableHandle withHandle /> */}
        <ResizablePanel defaultSize={25} className="hidden xl:flex">
          {Content2.map((content, idx) => (
            content.title === decodeURIComponent(title) ? (
              <div className="ml-8 fixed max-w-64">
                <Navigation title={content.title} />
              </div>
            ) : (
              ""
            )
          ))}
        </ResizablePanel>
      </ResizablePanelGroup>
    </MainWrapper>
    </ScrollProvider >
  )
}

export default BlogPage;