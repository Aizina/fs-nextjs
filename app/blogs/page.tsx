import Link from "next/link";
import { getBlogs } from "../services/blogs";
import { getCurrentUser } from "../services/users";

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

  const blogs = await getBlogs(search);
  const user = await getCurrentUser();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="mb-0">Blogs</h1>

        {user && (
          <Link
            href="/blogs/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Create new blog
          </Link>
        )}
      </div>

      <form
        action="/blogs"
        method="GET"
        className="mb-6 flex items-end gap-3 space-y-0"
      >
        <div className="flex-1">
          <label htmlFor="filter">Search</label>

          <input
            id="filter"
            name="filter"
            data-testid="filter-input"
            placeholder="Search blogs..."
            defaultValue={search}
          />
        </div>

        <button
          type="submit"
          data-testid="search-button"
        >
          Search
        </button>
      </form>

      {blogs.length === 0 && (
        <p>No blogs found.</p>
      )}

      <ul
        data-testid="blogs-list"
        className="space-y-3"
      >
        {blogs.map((blog) => (
          <li
            key={blog.id}
            data-testid="blog-item"
            className="panel flex items-center justify-between gap-4"
          >
            <div>
              <Link
                href={`/blogs/${blog.id}`}
                className="text-lg font-semibold"
              >
                {blog.title}
              </Link>

              <p className="mt-1 text-sm text-slate-500">
                {blog.author}
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
              {blog.likes} likes
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}