"use server";

import { getCurrentUser } from "../services/users";
import { getBlog } from "../services/blogs";
import { addReadingListItem } from "../services/readingList";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function addToReadingList(
  formData: FormData
) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const blogId = Number(formData.get("blogId"));

  if (!Number.isSafeInteger(blogId) || blogId <= 0) {
    throw new Error("Invalid blog id");
  }

  const blog = await getBlog(blogId);

  if (!blog) {
    throw new Error("Blog not found");
  }

  await addReadingListItem(user.id, blogId);

  revalidatePath(`/blogs/${blogId}`);
  revalidatePath("/me");
}