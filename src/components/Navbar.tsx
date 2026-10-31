
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#B9DCCB]/15 bg-[#0C1C15]/95 shadow-md backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#B9DCCB] text-[#123629] shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
            >
              <path d="M12 7v14m0-14C9 4 5 4 2 5v14c4-1 7-1 10 2m0-14c3-3 7-3 10-2v14c-4-1-7-1-10 2" />
            </svg>
          </div>

          <div>
            <h1 className="font-[var(--font-playfair)] text-xl font-bold leading-none tracking-tight text-[#F5F1E8]">
              BookNook
            </h1>
            <p className="mt-1 text-[9px] tracking-[0.08em] text-[#B6C4B8]">
              A small online library
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2.5 font-[var(--font-dm-sans)] text-[12px] font-medium tracking-wide transition-colors duration-300 ${
                  isActive
                    ? "text-[#B9DCCB]"
                    : "text-[#E2E5DC]/90 hover:text-[#B9DCCB]"
                }`}
              >
                {link.name}

                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-[#B9DCCB] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Theme Icon */}
          <span
            aria-label="Light theme icon"
            title="Theme"
            className="text-[#B9DCCB]/75"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-5 w-5"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
            </svg>
          </span>

          <div className="mx-1 h-6 w-px bg-white/15" />

          <Link
            href="/login"
            className="rounded-full border border-[#B9DCCB]/50 px-4 py-2 text-[11px] font-medium tracking-wide text-[#F5F1E8] transition-all duration-300 hover:border-[#B9DCCB] hover:bg-[#B9DCCB]/10 sm:text-xs"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-[#B9DCCB] px-4 py-2 text-[11px] font-semibold tracking-wide text-[#15392D] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D3E9DA] hover:shadow-md sm:text-xs"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          className="rounded-lg border border-[#B9DCCB]/30 px-3 py-1.5 text-lg text-[#F5F1E8] transition hover:bg-[#B9DCCB]/10 lg:hidden"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-[#B9DCCB]/15 bg-[#10231A] px-5 py-4 shadow-xl lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-4 py-2.5 font-[var(--font-dm-sans)] text-xs tracking-wide transition ${
                    isActive
                      ? "bg-[#B9DCCB]/10 font-semibold text-[#B9DCCB]"
                      : "text-[#E2E5DC] hover:bg-white/5 hover:text-[#B9DCCB]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="mx-auto mt-4 flex max-w-6xl gap-3 border-t border-white/10 pt-4">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex-1 rounded-full border border-[#B9DCCB]/50 py-2 text-center text-xs font-medium text-white transition hover:bg-[#B9DCCB]/10"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="flex-1 rounded-full bg-[#B9DCCB] py-2 text-center text-xs font-semibold text-[#15392D] transition hover:bg-[#D3E9DA]"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
