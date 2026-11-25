import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlog } from "../../services/blogs";
import { incrementLikes } from "../../actions/blogs";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { id } = await params;

  const blog = getBlog(id);

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h1>{blog.title}</h1>

      <p>Author: {blog.author}</p>

      <p>
        URL: <a href={blog.url}>{blog.url}</a>
      </p>

      <p>Likes: {blog.likes}</p>

      <form action={incrementLikes}>
        <input
          type="hidden"
          name="id"
          value={blog.id}
        />

        <button type="submit">Like</button>
      </form>

      <Link href="/blogs">Back to blogs</Link>
    </div>
  );
}