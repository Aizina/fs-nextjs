"use client";

import { useActionState } from "react";
import { registerUser } from "../actions/users";
import type { RegisterFormState } from "../types/forms";

const initialState: RegisterFormState = {};

export default function RegisterPage() {
  const [state, formAction, pending] =
    useActionState(registerUser, initialState);

  return (
    <div className="panel mx-auto max-w-md">
      <h1>Register</h1>

      <form action={formAction} noValidate>
        <div>
          <label htmlFor="username">Username</label>

          <input
            id="username"
            name="username"
            defaultValue={state.values?.username}
          />

            {state.errors?.username && (
            <p role="alert" data-testid="username-error">
                {state.errors.username}
            </p>
            )}
        </div>

        <div>
          <label htmlFor="name">Name</label>

          <input
            id="name"
            name="name"
            defaultValue={state.values?.name}
          />

          {state.errors?.name && (
            <p role="alert">{state.errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
          />

            {state.errors?.passwordConfirm && (
            <p role="alert" data-testid="passwordConfirm-error">
                {state.errors.passwordConfirm}
            </p>
            )}
        </div>

        <div>
          <label htmlFor="passwordConfirm">
            Confirm Password
          </label>

          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            autoComplete="new-password"
          />

          {state.errors?.passwordConfirm && (
            <p role="alert">
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>

        <button
          type="submit"
          data-testid="register-button"
          disabled={pending}
        >
          {pending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}