"use client"
import { useEffect, useState, useRef } from "react";
import Drawer from "@/components/drawer-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const Header = () => {
  const { setTheme } = useTheme()
  const prevScrollPosRef = useRef(0);
  const [isNavHidden, setIsNavHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop > prevScrollPosRef.current) {
        setIsNavHidden(true);
      } else {
        setIsNavHidden(false);
      }

      prevScrollPosRef.current = scrollTop;
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  console.log(prevScrollPosRef);

  return (
    <div className={` backdrop-blur-lg flex items-center lg:justify-center gap-4 border-b p-4 text-center sticky top-0 z-10 shadow-sm ${isNavHidden ? 'transform translate-y-full transition ease-in' : 'transition ease-in'}`}>
      <Drawer />
      <h1>riel blogs</h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Header;