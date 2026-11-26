import { getCurrentUser } from "../services/users";
import { generateToken } from "../actions/me";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function MePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

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
    </div>
  );
}