"use server";

import bcrypt from "bcryptjs";
import { db } from "../../db";
import { users } from "../../db/schema";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !name || !password) {
    throw new Error("All fields are required");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  });

  redirect("/login");
}