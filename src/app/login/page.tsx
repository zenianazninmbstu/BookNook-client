
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  useEffect(() => {
  document.title = "BookNook | Login";
}, []);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const redirect =
      new URLSearchParams(window.location.search).get("redirect") || "/";

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || "Login failed. Please try again.");
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
  setError("");

  const redirect =
    new URLSearchParams(window.location.search).get("redirect") || "/";

  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirect,
    });
  } catch {
    setError("Google login failed. Please try again.");
  }
};
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#F8F5EE] px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-[#DCE5DD] bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-medium tracking-[0.2em] text-[#557563]">
            WELCOME BACK
          </p>
          <h1 className="font-[var(--font-playfair)] text-4xl text-[#0C1C15]">
            Login to BookNook
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Continue your reading journey with us.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#263B30]">
              Email
            </label>
            <input
              
  type="email"
  id="email"
  name="email"
  value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="input input-bordered h-auto min-h-0 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#263B30] focus:border-[#557563] focus:outline-none"
            />
          </div>

<div>
  <label
    htmlFor="password"
    className="mb-2 block text-sm font-medium text-[#263B30]"
  >
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter your password"
      required
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-[#263B30] outline-none focus:border-[#557563]"
    />

    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3 top-1/2 -translate-y-1/2 border-0 bg-transparent p-1 text-[#557563] hover:text-[#0C1C15]"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
          <path d="M3 3l18 18" />
          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
          <path d="M9.9 5.2A10.9 10.9 0 0 1 12 5c5 0 9 5 9 7a9.8 9.8 0 0 1-2.1 3.3" />
          <path d="M6.2 6.2C3.8 7.8 2 10.2 2 12c0 2 4 7 10 7 1.4 0 2.7-.3 3.8-.8" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  </div>
</div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-[#557563] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn w-full rounded-lg border-0 bg-[#0C1C15] py-3 font-medium text-white transition hover:bg-[#244735] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
  type="button"
  onClick={handleGoogleLogin}
  className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-medium text-[#263B30] transition hover:bg-gray-50"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="h-5 w-5"
  >
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.98 46.98 31.8 46.98 24.55Z"/>
    <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.78-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.54 2.56 10.78l7.97-6.19Z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.88 2.3-8.18 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"/>
  </svg>
  Continue with Google
</button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#557563] hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
