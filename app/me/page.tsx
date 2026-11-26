import { getCurrentUser } from "../services/users";
import { generateToken } from "../actions/me";
import { redirect } from "next/navigation";
import { getReadingList } from "../services/readingList";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const items = await getReadingList(user.id);

  return (
    <div>
      <h1>My page</h1>

        <section className="panel mt-6">
        <h2>Reading list</h2>

        {items.length === 0 && (
            <p>Your reading list is empty.</p>
        )}

        <ul data-testid="reading-list" className="space-y-3">
            {items.map((item) => (
            <li key={item.id}>
                <Link href={`/blogs/${item.blog.id}`}>
                {item.blog.title}
                </Link>
            </li>
            ))}
        </ul>
        </section>
    </div>
  );
}