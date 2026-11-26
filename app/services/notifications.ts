import "server-only";
import { cookies } from "next/headers";

export async function setNotification(message: string) {
  const cookieStore = await cookies();

  cookieStore.set(
    "blog-notification",
    message,
    {
      path: "/",
      maxAge: 60,
      sameSite: "lax",
      httpOnly: false,
    }
  );
}