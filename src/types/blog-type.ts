export interface BlogParams {
  params: {
    title: string
  }
};

export interface BlogProps {
  title: string;
};

interface Category {
  title: string,
};

interface Body {
  style: string,
  children?: [
    {
      text: string,
    }
  ],
};

interface Author {
  name: string,
  image: any
};

export type Post = {
  _id: string,
  author: Author,
  title: string,
  currentSlug?: string,
  body?: any,
  categories: [Category],
  _createdAt: string,
  publishedAt: string,
  mainImage?: any,
  description?: string,
  readDuration?: string,
  bodyStyle: [Body],
};