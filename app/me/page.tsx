import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "../services/users";
import { getReadingList } from "../services/readingList";

import { generateToken } from "../actions/me";
import { markAsRead } from "../actions/readingList";

export const dynamic = "force-dynamic";

export default async function MePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const items = await getReadingList(user.id);

  const unread = items.filter((item) => !item.read);
  const read = items.filter((item) => item.read);

  return (
    <div>
      <h1>My page</h1>

      <section className="panel">
        <h2>{user.name}</h2>

        <p>Username: {user.username}</p>

        <h2>API Token</h2>

        {user.token ? (
          <p
            data-testid="api-token"
            className="break-all rounded-lg
              bg-slate-100 p-3 font-mono text-sm"
          >
            {user.token}
          </p>
        ) : (
          <p>No token generated yet.</p>
        )}

        <form action={generateToken} className="mt-4">
          <button
            type="submit"
            data-testid="generate-token-button"
          >
            Generate new token
          </button>
        </form>
      </section>

      <section
        data-testid="reading-list"
        className="panel mt-6"
      >
        <h2>Reading list</h2>

        <h3 className="mb-3 text-lg font-semibold">
          Unread ({unread.length})
        </h3>

        <ul
          data-testid="unread-list"
          className="space-y-3"
        >
          {unread.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center
                justify-between gap-3 border-b
                border-slate-200 pb-3"
            >
              <Link href={`/blogs/${item.blog.id}`}>
                {item.blog.title}
              </Link>

              <form action={markAsRead}>
                <input
                  type="hidden"
                  name="id"
                  value={item.id}
                />

                <button
                  type="submit"
                  data-testid="mark-as-read-button"
                  className="bg-green-600 text-sm
                    hover:bg-green-700"
                >
                  Mark as read
                </button>
              </form>
            </li>
          ))}
        </ul>

        {unread.length === 0 && (
          <p className="text-slate-500">
            No unread blogs.
          </p>
        )}

        <h3 className="mb-3 mt-8 text-lg font-semibold">
          Read ({read.length})
        </h3>

        <ul
          data-testid="read-list"
          className="space-y-3"
        >
          {read.map((item) => (
            <li key={item.id}>
              <Link href={`/blogs/${item.blog.id}`}>
                {item.blog.title}
              </Link>

              <span className="ml-3 text-green-700">
                ✓ Read
              </span>
            </li>
          ))}
        </ul>

        {read.length === 0 && (
          <p className="text-slate-500">
            No read blogs.
          </p>
        )}
      </section>
    </div>
  );
}