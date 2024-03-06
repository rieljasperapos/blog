"use client"

import { useEffect, useState, useRef } from "react";

const Header = () => {
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
    <div className={`border-b p-4 text-center sticky top-0 z-10 bg-white shadow-sm ${isNavHidden ? 'transform translate-y-full transition ease-in' : 'transition ease-in'}`}>
      <h1>riel blogs</h1>
    </div>
  )
}

export default Header;