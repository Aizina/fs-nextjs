"use server";

import { signIn, signOut } from "../../auth";
import { AuthError } from "next-auth";

export async function loginUser(
  previousState: string,
  formData: FormData
): Promise<string> {
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirectTo: "/blogs",
    });

    return "";
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return "Invalid username or password";
      }

      return "Something went wrong";
    }

    throw error;
  }
}

export async function logoutUser() {
  await signOut({ redirectTo: "/" });
}