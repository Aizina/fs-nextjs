import BlogForm from "../../components/BlogForm";
import { getCurrentUser } from "../../services/users";
import { redirect } from "next/navigation";

export default async function NewBlogPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Create a new blog</h1>
      <BlogForm />
    </div>
  );
}