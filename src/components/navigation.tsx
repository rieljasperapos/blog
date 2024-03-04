"use client"
import { useScrollContext } from '@/context/scroll.context';
// import { Content } from '@/static/content';
import { Content2 } from '@/static/content';
import Link from 'next/link';

interface BlogProps {
  title: string;
}

const Navigation: React.FC<BlogProps> = ({ title }) => {
  const { scrollToContent } = useScrollContext();

  return (
    <nav>
      {Content2.map((content, idx) => (
        content.title === decodeURIComponent(title) ? (
          <div key={idx}>
            <div className="mb-4">
              <h1 className="font-semibold">{content.title}</h1>
            </div>
            <div>
              <ul className="border-l">
                <div className="ml-4" key={idx}>
                  {content.contents?.map((content, idx) => (
                    content.body.map((body, idx) => (
                      <li
                        key={idx}
                        className="hover:text-orange-500 cursor-pointer mb-2"
                        onClick={() => scrollToContent(body.header)}
                      >
                        <Link href={`#${body.header}`} scroll={false}>
                          <p className='text-sm'># {body.header}</p>
                        </Link>
                      </li>
                    ))
                  ))}
                </div>
                {/* {Content.content.map((content) => (
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
            ))} */}
              </ul>
            </div>
          </div>
        ) : (
          ""
        )
      ))}
      <div>
      </div>
    </nav>
  );
};

export default Navigation;
