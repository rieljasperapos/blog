import Image from "next/image";
import { urlFor } from "../sanity/client";
import { PortableText } from "next-sanity";

export const myPortableTextComponents = {
  types: {
    image: (value: any) => {
      return (
        <Image src={urlFor(value.value).url()} width={500} height={500} style={{ width: '100%', height: '100%' }} alt="image"/>
      )
    },
    block: (props: any) => {
      return (
        <div>
          {props.value.style === "h1" ? (
            props.value.children.map((title: any, idx: number) => (
              <h1 key={idx} className="font-bold text-2xl sm:text-4xl" id={title.text} style={{scrollMarginTop: '100px'}}>{title.text}</h1>
            ))
          ) : (
            <PortableText value={props.value} />
          )}
        </div>
      )
    }
  },
};