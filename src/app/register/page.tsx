
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  useEffect(() => {
  document.title = "BookNook | Register";
}, []);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!hasUppercase || !hasLowercase || !hasMinLength) {
      setError(
        "Password must contain uppercase, lowercase and at least 6 characters."
      );
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        image: image || undefined,
      });

      if (result.error) {
        setError(result.error.message || "Registration failed.");
        return;
      }

      router.push("/login");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      setError("Google registration failed. Please try again.");
    }
  };

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#F8F5EE] px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-[#DCE5DD] bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-medium tracking-[0.2em] text-[#557563]">
            JOIN BOOKNOOK
          </p>
          <h1 className="font-serif text-4xl text-[#0C1C15]">
            Create Account
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Start your reading journey with us.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#263B30]">
              Full Name
            </label>
            <input
             
  type="text"
  id="name"
  name="name"
  value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#557563]"
            />
          </div>

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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#557563]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#263B30]">
              Photo URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter your photo URL (optional)"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#557563]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#263B30]">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#557563]"
            />

            <ul className="mt-2 space-y-1 text-xs text-gray-500">
              <li className={hasUppercase ? "text-green-700" : ""}>
                {hasUppercase ? "✓" : "○"} At least one uppercase letter
              </li>
              <li className={hasLowercase ? "text-green-700" : ""}>
                {hasLowercase ? "✓" : "○"} At least one lowercase letter
              </li>
              <li className={hasMinLength ? "text-green-700" : ""}>
                {hasMinLength ? "✓" : "○"} Minimum 6 characters
              </li>
            </ul>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#0C1C15] py-3 font-medium text-white transition hover:bg-[#244735] disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        
<button
  type="button"
  onClick={handleGoogleRegister}
  className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-medium text-[#263B30] transition hover:bg-gray-50"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 48 48"
  >
    <path fill="#4285F4" d="M43.6 24.5c0-1.5-.1-3-.4-4.5H24v8.5h11a9.4 9.4 0 0 1-4.1 6.2v5.2h6.7c3.9-3.6 6-8.9 6-15.4Z"/>
    <path fill="#34A853" d="M24 44c5.6 0 10.3-1.9 13.7-5.1L31 33.7c-1.9 1.3-4.2 2.1-7 2.1-5.4 0-10-3.6-11.6-8.5H5.5v5.3A20 20 0 0 0 24 44Z"/>
    <path fill="#FBBC05" d="M12.4 27.3a12 12 0 0 1 0-6.6v-5.3H5.5a20 20 0 0 0 0 17.2l6.9-5.3Z"/>
    <path fill="#EA4335" d="M24 12.2c3 0 5.7 1 7.8 3.1l5.9-5.9A19.7 19.7 0 0 0 24 4 20 20 0 0 0 5.5 15.4l6.9 5.3c1.6-4.9 6.2-8.5 11.6-8.5Z"/>
  </svg>

  <span>Continue with Google</span>
</button>


        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#557563] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
