import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F8F5EE] px-4 text-center">
      <h1 className="text-8xl font-bold text-[#0C1C15]">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-[#0C1C15]">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-[#64746A]">
        Sorry! The page you are looking for does not exist or may have been
        moved.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-[#0C1C15] px-6 py-3 font-medium text-white transition hover:bg-[#244333]"
      >
        Back to Home
      </Link>
    </div>
  );
}