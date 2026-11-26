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
    <nav>
      <Link href="/">Home</Link>
      <Link href="/blogs">Blogs</Link>
      <Link href="/users">Users</Link>

      {session?.user ? (
        <>
          <span data-testid="logged-in-user">
            {session.user.name} logged in
          </span>

          <form action={logoutUser}>
            <button
              type="submit"
              data-testid="logout-button"
            >
              Logout
            </button>
          </form>
        </>
        ) : (
        <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
        </>
        )}
    </nav>
  );
}