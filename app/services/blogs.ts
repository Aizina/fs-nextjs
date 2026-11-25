import "server-only";

export type Blog = {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
};

const initialBlogs: Blog[] = [
  {
    id: "1",
    title: "Learning Next.js",
    author: "John Smith",
    url: "https://nextjs.org",
    likes: 5,
  },
  {
    id: "2",
    title: "React Best Practices",
    author: "Jane Doe",
    url: "https://react.dev",
    likes: 12,
  },
  {
    id: "3",
    title: "Full Stack Development",
    author: "Alice Brown",
    url: "https://fullstackopen.com",
    likes: 8,
  },
];

const store = globalThis as typeof globalThis & {
  blogList?: Blog[];
};

const blogs = (store.blogList ??= initialBlogs);

export function getBlogs(): Blog[] {
  return [...blogs];
}