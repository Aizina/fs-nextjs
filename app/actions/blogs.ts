"use server";

import { addBlog, likeBlog } from "../services/blogs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlog(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();

  if (!title || !author || !url) {
    throw new Error("All fields are required");
  }

  const parsedUrl = new URL(url);

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error("Invalid URL");
  }

  addBlog(title, author, url);

  revalidatePath("/blogs");

  redirect("/blogs");
}

export async function incrementLikes(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (!id || !likeBlog(id)) {
    throw new Error("Blog not found");
  }

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
}