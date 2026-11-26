import type { Metadata } from "next";
import Navbar from "./components/Navbar";
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
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}