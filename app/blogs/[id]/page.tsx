import Link from "next/link";
import { notFound } from "next/navigation";

import { getBlog } from "../../services/blogs";
import { getCurrentUser } from "../../services/users";
import { isInReadingList } from "../../services/readingList";

import { incrementLikes } from "../../actions/blogs";
import { addToReadingList } from "../../actions/readingList";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BlogPage({
  params,
}: Props) {
  const { id } = await params;

  const blogId = Number(id);

  if (!Number.isSafeInteger(blogId) || blogId <= 0) {
    notFound();
  }

  const blog = await getBlog(blogId);

  if (!blog) {
    notFound();
  }

  const user = await getCurrentUser();

  const inReadingList = user
    ? await isInReadingList(user.id, blog.id)
    : false;

  return (
    <div className="panel" data-testid="blog-detail">
      <h1 data-testid="blog-title">
        {blog.title}
      </h1>

      <p className="my-3" data-testid="blog-author">
        Author: {blog.author}
      </p>

      <p className="my-3" data-testid="blog-url">
        URL: <a href={blog.url}>{blog.url}</a>
      </p>

      <p
        data-testid="blog-likes"
        className="my-4 font-semibold"
      >
        Likes: {blog.likes}
      </p>

      <form action={incrementLikes}>
        <input
          type="hidden"
          name="id"
          value={blog.id}
        />

        <button
          type="submit"
          data-testid="like-button"
        >
          Like
        </button>
      </form>

      {user &&
        blog.userId !== user.id &&
        !inReadingList && (
          <form
            action={addToReadingList}
            className="mt-4"
          >
            <input
              type="hidden"
              name="blogId"
              value={blog.id}
            />

            <button
              type="submit"
              data-testid="add-to-reading-list-button"
            >
              Add to reading list
            </button>
          </form>
        )}

      {user && inReadingList && (
        <p className="mt-4 text-green-700">
          Already in reading list
        </p>
      )}

      <Link
        href="/blogs"
        className="mt-6 inline-block"
      >
        Back to blogs
      </Link>
    </div>
  );
}