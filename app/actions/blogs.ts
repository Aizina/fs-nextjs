"use server";

import {
  addBlog,
  likeBlog,
} from "../services/blogs";
import type { BlogFormState } from "../types/forms";
import { getCurrentUser } from "../services/users";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlog(
  previousState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();

  const errors: NonNullable<BlogFormState["errors"]> = {};

  if (title.length < 5) {
    errors.title = "Title must be at least 5 characters";
  }

  if (author.length < 5) {
    errors.author = "Author must be at least 5 characters";
  }

  if (url.length < 5) {
    errors.url = "URL must be at least 5 characters";
  } else {
    try {
      const parsedUrl = new URL(url);

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        errors.url = "Invalid URL";
      }
    } catch {
      errors.url = "Invalid URL";
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { title, author, url },
    };
  }

  await addBlog(title, author, url, user.id);

  revalidatePath("/blogs");
  revalidatePath(`/users/${user.username}`);

  redirect("/blogs");
}

export async function incrementLikes(
  formData: FormData
) {
  const id = Number(formData.get("id"));

  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error("Invalid blog id");
  }

  const updated = await likeBlog(id);

  if (!updated) {
    throw new Error("Blog not found");
  }

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
}