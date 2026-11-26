import "server-only";

import { db } from "../../db";
import { users } from "../../db/schema";
import { asc } from "drizzle-orm";

export async function getUsers() {
  return await db
    .select()
    .from(users)
    .orderBy(asc(users.name));
}