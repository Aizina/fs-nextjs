import BlogForm from "../../components/BlogForm";
import { getCurrentUser } from "../../services/users";
import { redirect } from "next/navigation";

export default async function NewBlogPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="panel mx-auto max-w-xl">
      <h1>Create a new blog</h1>
      <BlogForm />
    </div>
  );
}