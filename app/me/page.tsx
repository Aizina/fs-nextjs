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

      <section
        className="panel"
        data-testid="user-profile"
      >
        <h2 data-testid="user-name">
          {user.name}
        </h2>

        <p data-testid="user-username">
          Username: {user.username}
        </p>

        <div data-testid="api-token-section">
          <h2>API Token</h2>

          {user.token ? (
            <div data-testid="token-display">
              <code
                data-testid="api-token"
                className="block break-all rounded-lg bg-slate-100 p-3 text-sm"
              >
                {user.token}
              </code>
            </div>
          ) : (
            <p data-testid="no-token-message">
              No token generated yet.
            </p>
          )}

          <form action={generateToken} className="mt-4">
            <button
              type="submit"
              data-testid="generate-token-button"
            >
              Generate new token
            </button>
          </form>
        </div>
      </section>

      <section
        data-testid="reading-list-section"
        className="panel mt-6"
      >
        <h2>Reading list</h2>

        {items.length === 0 ? (
          <p data-testid="empty-reading-list">
            Your reading list is empty.
          </p>
        ) : (
          <>
            <div data-testid="unread-section">
              <h3 className="mb-3 text-lg font-semibold">
                Unread ({unread.length})
              </h3>

              <ul className="space-y-3">
                {unread.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3"
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
                        data-testid={`mark-read-${item.id}`}
                        className="bg-green-600 text-sm hover:bg-green-700"
                      >
                        Mark as read
                      </button>
                    </form>
                  </li>
                ))}
              </ul>

              {unread.length === 0 && (
                <p
                  data-testid="no-unread-blogs"
                  className="text-slate-500"
                >
                  No unread blogs.
                </p>
              )}
            </div>

            <div data-testid="read-section">
              <h3 className="mb-3 mt-8 text-lg font-semibold">
                Read ({read.length})
              </h3>

              <ul className="space-y-3">
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
                <p
                  data-testid="no-read-blogs"
                  className="text-slate-500"
                >
                  No read blogs.
                </p>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}