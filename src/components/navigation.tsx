"use client"
import { useScrollContext } from '@/context/scroll.context';
import { Content } from '@/static/content';
import Link from 'next/link';

const Navigation: React.FC = () => {
  const { scrollToContent } = useScrollContext();

  return (
    <nav>
      <div>
        <div className="mb-4">
          <h1 className="font-semibold">{Content.title}</h1>
        </div>
        <div>
          <ul className="border-l">
            {Content.content.map((content) => (
              <div className="ml-4 mb-2" key={content.header}>
                <li
                  className="hover:text-orange-500 cursor-pointer"
                  onClick={() => scrollToContent(content.header)}
                >
                  <Link href={`#${content.header}`} scroll={false}>
                    <p className='text-sm'># {content.header}</p>
                  </Link>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
