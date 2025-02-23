import Image from "next/image";
import { urlFor } from "../sanity/client";
import { PortableText } from "next-sanity";

export const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8 overflow-hidden rounded-xl">
          <Image
            src={urlFor(value).url()}
            width={800}
            height={500}
            alt="Blog image"
            priority={true}
            className="w-full h-auto object-cover"
          />
        </div>
      );
    },
    block: (props: any) => {
      const style = props.value.style || 'normal';
      
      if (style === 'h1') {
        return (
          <h1 
            id={props.value.children[0].text}
            style={{ scrollMarginTop: "100px" }}
            className="text-3xl font-bold mt-8 mb-4"
          >
            {props.value.children[0].text}
          </h1>
        );
      }
      
      return <PortableText value={props.value} />;
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      return (
        <a 
          href={value.href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-orange-500 hover:text-orange-400 transition-colors duration-200"
        >
          {children}
        </a>
      );
    },
    code: ({ children }: any) => {
      return (
        <code className="bg-orange-950/20 text-orange-500 rounded px-1 py-0.5">
          {children}
        </code>
      );
    },
  },
};
