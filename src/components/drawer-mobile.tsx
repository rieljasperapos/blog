"use client"
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { RxHamburgerMenu } from "react-icons/rx";
import { Button } from "@/components/ui/button"
import { IoHomeOutline } from "react-icons/io5";
import { fetchPosts } from "@/utils/sanity/fetch-posts";
import { useRouter } from "next/navigation";
import { Post } from "@/types/blog-type";

const Drawer = () => {
  const [blogPosts, setBlogPosts] = useState<Post[]>();
  const [currentURL, setCurrentURL] = useState('');
  const navigate = useRouter();

  const handleClick = (title: string | undefined) => {
    if (title === "/") {
      setCurrentURL('/');
      navigate.push('/');
    } else {
      const newUrl = `/blogs/${title}`;
      setCurrentURL(newUrl);
      navigate.push(newUrl);
    }
  }

  useEffect(() => {
    fetchPosts().then(posts => {
      setBlogPosts(posts);
    }).catch(error => {
      console.error("Error:", error);
    });

    setCurrentURL(window.location.pathname);
    const handlePopState = () => {
      setCurrentURL(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [])

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <RxHamburgerMenu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="mb-10">
            <SheetClose asChild>
              <SheetTitle asChild>
                <div className="flex">
                  <h1>riel blogs</h1>
                </div>
              </SheetTitle>
            </SheetClose>
          </SheetHeader>
          <SheetClose asChild>
            <div className="flex items-center gap-4 hover:text-orange-500 hover:font-bold mb-4" onClick={() => handleClick("/")}>
              <div className="flex items-center gap-2">
                <IoHomeOutline />
                <span>Home</span>
              </div>
            </div>
          </SheetClose>
          <hr></hr>
          <div className="flex flex-col gap-4 mt-4">
            <h1 className="font-medium">Articles</h1>
            {blogPosts?.map((blog, idx) => (
              <div key={idx} className="hover:text-orange-500 hover:underline hover:font-medium transition duration-300">
                <SheetClose asChild>
                  <div className="flex items-center gap-4" onClick={() => handleClick(blog.currentSlug)}>
                    <p className={`text-sm ${`/blogs/${blog.currentSlug}` === currentURL ? `text-orange-500` : ``}`}>{blog.title}</p>
                  </div>
                </SheetClose>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Drawer;