import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog App",
  description: "Full Stack Open Next.js exercises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/users">Users</Link>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}