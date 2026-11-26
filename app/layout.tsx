import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import { NotificationProvider } from "./context/NotificationContext";

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
        <NotificationProvider>
          <Navbar />
          <main>{children}</main>
        </NotificationProvider>
      </body>
    </html>
  );
}