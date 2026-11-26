import "server-only";

import { db } from "../../db";
import { blogs } from "../../db/schema";
import { desc, eq, sql } from "drizzle-orm";

export type Blog = typeof blogs.$inferSelect;

export async function getBlogs(
  filter = ""
): Promise<Blog[]> {
  const allBlogs = await db
    .select()
    .from(blogs)
    .orderBy(desc(blogs.likes));

  const search = filter.trim().toLowerCase();

  return allBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(search)
  );
}

export async function getBlog(
  id: number
): Promise<Blog | undefined> {
  const result = await db
    .select()
    .from(blogs)
    .where(eq(blogs.id, id))
    .limit(1);

  return result[0];
}

export async function addBlog(
  title: string,
  author: string,
  url: string,
  userId: number
): Promise<Blog> {
  const result = await db
    .insert(blogs)
    .values({
      title,
      author,
      url,
      likes: 0,
      userId,
    })
    .returning();

  return result[0];
}

export async function likeBlog(
  id: number
): Promise<boolean> {
  const result = await db
    .update(blogs)
    .set({
      likes: sql`${blogs.likes} + 1`,
    })
    .where(eq(blogs.id, id))
    .returning({
      id: blogs.id,
    });

  return result.length > 0;
}