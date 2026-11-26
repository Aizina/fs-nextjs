"use client";

import { useActionState, useEffect } from "react";
import { loginUser } from "../actions/auth";
import { useNotification } from "../context/NotificationContext";

export default function LoginPage() {
  const [error, formAction, pending] =
    useActionState(loginUser, "");

    const { showNotification } = useNotification();

    useEffect(() => {
      if (error) {
        showNotification(error, "error");
      }
    }, [error, showNotification]);

  return (
    <div className="panel mx-auto max-w-md">
      <h1>Login</h1>

      <form action={formAction}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <p role="alert" data-testid="error-message">
            {error}
          </p>
        )}

        <button
          type="submit"
          data-testid="login-button"
          disabled={pending}
        >
          Login
        </button>
      </form>
    </div>
  );
}