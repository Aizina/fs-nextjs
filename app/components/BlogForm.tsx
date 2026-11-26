"use client";

import { createBlog } from "../actions/blogs";
import type { BlogFormState } from "../types/forms";
import { useActionState, useEffect } from "react";
import { useNotification } from "../context/NotificationContext";

const initialState: BlogFormState = {};

export default function BlogForm() {
  const [state, formAction, pending] =
    useActionState(createBlog, initialState);

    const { showNotification } = useNotification();

    useEffect(() => {
    if (state.errors) {
        showNotification(
        Object.values(state.errors).join(". "),
        "error"
        );
    }
    }, [state, showNotification]);

  return (
    <form action={formAction} noValidate>
      <div>
        <label htmlFor="title">Title</label>

        <input
        id="title"
        name="title"
        type="text"
        defaultValue={state.values?.title}
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
          defaultValue={state.values?.author}
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
          defaultValue={state.values?.url}
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