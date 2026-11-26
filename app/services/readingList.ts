import "server-only";

import { db } from "../../db";
import { readingList } from "../../db/schema";
import { and, eq } from "drizzle-orm";

export async function getReadingList(userId: number) {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: {
      blog: true,
    },
  });
}

export async function isInReadingList(
  userId: number,
  blogId: number
) {
  const item = await db.query.readingList.findFirst({
    where: and(
      eq(readingList.userId, userId),
      eq(readingList.blogId, blogId)
    ),
  });

  return Boolean(item);
}

export async function addReadingListItem(
  userId: number,
  blogId: number
) {
  await db
    .insert(readingList)
    .values({
      userId,
      blogId,
      read: false,
    })
    .onConflictDoNothing();
}

export async function markReadingListItemAsRead(
  id: number,
  userId: number
) {
  const updated = await db
    .update(readingList)
    .set({
      read: true,
    })
    .where(
      and(
        eq(readingList.id, id),
        eq(readingList.userId, userId)
      )
    )
    .returning({
      id: readingList.id,
    });

  return updated.length > 0;
}