import Link from "next/link";
import { notFound } from "next/navigation";
import { getUser } from "../../services/users";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserPage({
  params,
}: Props) {
  const { username } = await params;

  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1>{user.name}</h1>

      <p>Username: {user.username}</p>

      <h2>Added blogs</h2>

      {user.blogs.length === 0 && (
        <p>No blogs added yet.</p>
      )}

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>

            {" — "}
            Likes: {blog.likes}
          </li>
        ))}
      </ul>

      <Link href="/users">Back to users</Link>
    </div>
  );
}