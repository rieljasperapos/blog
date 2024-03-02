import MainWrapper from "@/components/main-wrapper";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Image from "next/image";
import profile from "../../../../public/profilepic.png";
import { Content } from "@/static/content";
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
              <div className="flex h-full p-6 fixed max-w-64">
                <Blogs />
              </div>
            </ResizablePanel>
            {/* <ResizableHandle withHandle /> */}
            <ResizablePanel defaultSize={50} className="md:px-16">
              <div className="flex flex-col h-full gap-6 p-6">
                <div>
                  <h1 className="font-extrabold text-3xl sm:text-5xl">{Content.title}</h1>
                </div>
                <div className="text-sm">
                  <p>{Content.date} · {Content.readDuration}</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div>
                    <Image src={profile} width={50} alt="profile" />
                  </div>
                  <div>
                    <h1 className="text-orange-500 font-bold font-sm">Riel Jasper Apos</h1>
                    <p className="text-xs">Computer Science</p>
                  </div>
                </div>
                <div className="flex flex-col max-w-3xl gap-12">
                  {Content.content.map((content, idx) => (
                    <div key={idx}>
                    {content.headerImage ? (
                      <div className="mb-12">
                        <Image src={content.headerImage} alt="DSA"></Image>
                      </div>
                    ): ""
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
                            <Image src={content.bodyImage} width={768} alt="Body Image"/>
                          ): ""}
                          <p className="font-light">{content.body1}</p>
                          <p className="font-light">{content.body2}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ResizablePanel>
            {/* <ResizableHandle withHandle /> */}
            <ResizablePanel defaultSize={25} className="hidden xl:flex">
              <div className="flex h-full fixed max-w-64">
                <Navigation />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </MainWrapper>
        </ScrollProvider>
  )
}

export default BlogPage;