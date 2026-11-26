"use server";

import bcrypt from "bcryptjs";
import { db } from "../../db";
import { users } from "../../db/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import type { RegisterFormState } from "../types/forms";

export async function registerUser(
  previousState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();

  const password = String(formData.get("password") ?? "");

  const passwordConfirm = String(
    formData.get("passwordConfirm") ?? ""
  );

  const errors: NonNullable<RegisterFormState["errors"]> = {};

  if (username.length < 4) {
    errors.username =
      "Username must be at least 4 characters";
  }

  if (!name) {
    errors.name = "Name is required";
  }

  if (password.length < 4) {
    errors.password =
      "Password must be at least 4 characters";
  }

  if (!passwordConfirm || password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { username, name },
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const inserted = await db
    .insert(users)
    .values({
      username,
      name,
      passwordHash,
    })
    .onConflictDoNothing({
      target: users.username,
    })
    .returning({ id: users.id });

  if (inserted.length === 0) {
    return {
      errors: {
        username: "Username already exists",
      },
      values: { username, name },
    };
  }

  revalidatePath("/users");

  redirect("/login");
}