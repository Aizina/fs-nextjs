import BlogForm from "../../components/BlogForm";

export default function NewBlogPage() {
  return (
    <div className="panel mx-auto max-w-xl">
      <h1>Create a new blog</h1>
      <BlogForm />
    </div>
  );
}