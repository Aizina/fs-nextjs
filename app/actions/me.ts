"use server";

import { randomUUID } from "node:crypto";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

import { getCurrentUser } from "../services/users";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function generateToken() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const token = randomUUID();

  await db
    .update(users)
    .set({ token })
    .where(eq(users.id, user.id));

  revalidatePath("/me");
}