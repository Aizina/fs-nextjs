"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";
import { logoutUser } from "../actions/auth";

export default function Navbar() {
  const pathname = usePathname();
  const [session, setSession] =
    useState<Session | null>(null);

  useEffect(() => {
    let active = true;

    getSession().then((result) => {
      if (active) setSession(result);
    });

    return () => {
      active = false;
    };
  }, [pathname]);

    return (
    <nav className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap
        items-center gap-5 px-6 py-4">

        <Link
            href="/"
            className="mr-4 text-xl font-bold text-white"
        >
            Blog App
        </Link>

        <Link href="/" className="text-white">Home</Link>
        <Link href="/blogs" className="text-white">Blogs</Link>
        <Link href="/users" className="text-white">Users</Link>

        <div className="ml-auto flex items-center gap-4">
            {session?.user ? (
            <>

                <Link href="/me" className="text-white">
                    My page
                </Link>

                <span
                data-testid="logged-in-user"
                className="text-sm text-slate-300"
                >
                {session.user.name} logged in
                </span>

                <form action={logoutUser}>
                <button
                    type="submit"
                    data-testid="logout-button"
                    className="bg-slate-700 hover:bg-slate-600"
                >
                    Logout
                </button>
                </form>
            </>
            ) : (
            <>
                <Link href="/login" className="text-white">
                Login
                </Link>

                <Link
                href="/register"
                className="rounded-lg bg-blue-600
                    px-4 py-2 text-white"
                >
                Register
                </Link>
            </>
            )}
        </div>
        </div>
    </nav>
    );
}