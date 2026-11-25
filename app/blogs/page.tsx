import { getBlogs } from "../services/blogs";

export const dynamic = "force-dynamic";

export default function BlogsPage() {
  const blogs = getBlogs();

  return (
    <div>
      <h1>Blogs</h1>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title} — {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
}