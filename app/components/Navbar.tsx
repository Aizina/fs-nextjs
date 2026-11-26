"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import type { Session } from "next-auth";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [session, setSession] =
    useState<Session | null | undefined>(undefined);

  useEffect(() => {
    let active = true;

    getSession().then((result) => {
      if (active) {
        setSession(result);
      }
    });

    return () => {
      active = false;
    };
  }, [pathname]);

  const handleLogout = async () => {
    await signOut({ redirect: false });

    setSession(null);

    router.push("/");
    router.refresh();
  };

  return (
    <nav className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-5 px-6 py-4">

        <Link
          href="/"
          className="mr-4 text-xl font-bold text-white"
        >
          Blog App
        </Link>

        <Link href="/" className="text-white">
          home
        </Link>

        <Link href="/blogs" className="text-white">
          blogs
        </Link>

        <Link href="/users" className="text-white">
          users
        </Link>

        <div className="ml-auto flex items-center gap-4">
          {session?.user ? (
            <>
              <Link href="/me" className="text-white">
                me
              </Link>

              <span
                data-testid="logged-in-user"
                className="text-sm text-slate-300"
              >
                {session.user.name} logged in
              </span>

              <button
                type="button"
                data-testid="logout-button"
                onClick={handleLogout}
                className="bg-slate-700 hover:bg-slate-600"
              >
                Logout
              </button>
            </>
          ) : session === null ? (
            <>
              <Link href="/login" className="text-white">
                login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                register
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}