import { client } from "@/utils/sanity/client";
import { Post, BlogProps } from "@/types/blog-type";

const Navigation: React.FC<BlogProps> = async ({ title }) => {
  const headerTitle =
    await client.fetch<Post>(`*[_type == "post" && slug.current == "${title}"][0] {
    "bodyStyle": body[],
    title,
  }`);

  return (
    <nav>
      <div>
        <div className="mb-4">
          <h1 className="font-semibold">{headerTitle.title}</h1>
        </div>
        <div>
          <ul className="border-l">
            {headerTitle?.bodyStyle.map((content, idx) => (
              <div key={idx} className="ml-4">
                {content.style === "h1" ? (
                  content.children?.map((childContent, idx) => (
                    <li
                      key={idx}
                      className="hover:text-orange-500 cursor-pointer mb-2"
                    >
                      <a href={`#${childContent.text}`}>
                        <p className="text-sm"># {childContent.text}</p>
                      </a>
                    </li>
                  ))
                ) : (
                  ""
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export const dynamic = "force-dynamic";
export default Navigation;
