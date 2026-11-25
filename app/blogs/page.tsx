import Link from "next/link";
import { getBlogs } from "../services/blogs";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{
    filter?: string | string[];
  }>;
};

export default async function BlogsPage({
  searchParams,
}: Props) {
  const { filter } = await searchParams;

  const search =
    typeof filter === "string"
      ? filter
      : filter?.[0] ?? "";

  const blogs = getBlogs(search);

  return (
    <div>
      <h1>Blogs</h1>

      <Link href="/blogs/new">Create new blog</Link>

      <form action="/blogs" method="GET">
        <input
          type="text"
          name="filter"
          placeholder="Search blogs..."
          defaultValue={search}
        />

        <button type="submit">Search</button>
      </form>

      {blogs.length === 0 && (
        <p>No blogs found.</p>
      )}

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>

            {" — "}
            {blog.author}
            {" — "}
            Likes: {blog.likes}
          </li>
        ))}
      </ul>
    </div>
  );
}