"use client";

import { useActionState } from "react";
import { createBlog } from "../actions/blogs";
import type { BlogFormState } from "../types/forms";

const initialState: BlogFormState = {};

export default function BlogForm() {
  const [state, formAction, pending] =
    useActionState(createBlog, initialState);

  return (
    <form action={formAction} noValidate>
      <div>
        <label htmlFor="title">Title</label>

        <input
          id="title"
          name="title"
          type="text"
        />

        {state.errors?.title && (
          <p role="alert">{state.errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="author">Author</label>

        <input
          id="author"
          name="author"
          type="text"
        />

        {state.errors?.author && (
          <p role="alert">{state.errors.author}</p>
        )}
      </div>

      <div>
        <label htmlFor="url">URL</label>

        <input
          id="url"
          name="url"
          type="text"
        />

        {state.errors?.url && (
          <p role="alert">{state.errors.url}</p>
        )}
      </div>

      <button
        type="submit"
        data-testid="create-blog-button"
        disabled={pending}
      >
        {pending ? "Creating..." : "Create blog"}
      </button>
    </form>
  );
}