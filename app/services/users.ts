import "server-only";

import { db } from "../../db";
import { users } from "../../db/schema";
import { asc, eq } from "drizzle-orm";
import { auth } from "../../auth";

export async function getUsers() {
  return await db
    .select()
    .from(users)
    .orderBy(asc(users.name));
}

export async function getUser(
  username: string
) {
  return await db.query.users.findFirst({
    where: eq(users.username, username),

    with: {
      blogs: true,
    },
  });
}

export async function getCurrentUser() {
  const session = await auth();

  const username = session?.user?.email;

  if (!username) {
    return undefined;
  }

  return db.query.users.findFirst({
    where: eq(users.username, username),
  });
}