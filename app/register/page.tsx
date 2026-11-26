import { registerUser } from "../actions/users";

export default function RegisterPage() {
  return (
    <div>
      <h1>Register</h1>

      <form action={registerUser}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" required />
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          data-testid="register-button"
        >
          Register
        </button>
      </form>
    </div>
  );
}