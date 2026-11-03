
import Link from "next/link";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Books", href: "/books" },
  { name: "Add a Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#B9DCCB]/15 bg-[#0B1913] text-[#E5E9DF]">

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-12">

        {/* Brand */}
        <div>
          <Link href="/" className="group inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#B9DCCB] text-[#123629] shadow-sm transition duration-300 group-hover:scale-105">
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
              <h2 className="font-[var(--font-playfair)] text-xl font-bold leading-none tracking-tight text-[#F5F1E8]">
                BookNook<span className="text-[#B9DCCB]">.</span>
              </h2>
              <p className="mt-1 text-[9px] tracking-[0.08em] text-[#A6B8AA]">
                A small online library
              </p>
            </div>
          </Link>

          <p className="mt-5 max-w-xs text-xs leading-6 text-[#AAB9AD] sm:text-[13px]">
            Every book has a story. Every reader has a journey.
            Discover, share and borrow books to make every reading
            moment meaningful.
          </p>

          <p className="mt-5 font-[var(--font-playfair)] text-sm italic text-[#B9DCCB]/90">
            "A little space for endless stories."
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-[var(--font-playfair)] text-base font-semibold text-[#F5F1E8]">
            Explore
          </h3>

          <div className="mt-5 flex flex-col gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link link-hover w-fit text-xs tracking-wide text-[#AAB9AD] no-underline transition duration-300 hover:translate-x-1 hover:text-[#B9DCCB]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-[var(--font-playfair)] text-base font-semibold text-[#F5F1E8]">
            Get in Touch
          </h3>

          <p className="mt-5 text-xs leading-6 text-[#AAB9AD] sm:text-[13px]">
            Have a question, feedback or a book suggestion?
            We would love to hear from you.
          </p>

          <a
            href="mailto:hello@booknook.com"
            className="mt-4 flex items-center gap-2.5 text-xs text-[#B9DCCB] transition hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#B9DCCB]/10">
              ✉
            </span>
            hello@booknook.com
          </a>

          <p className="mt-3 flex items-center gap-2.5 text-xs text-[#AAB9AD]">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#B9DCCB]/10 text-[#B9DCCB]">
              ⌖
            </span>
            Bangladesh
          </p>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-[var(--font-playfair)] text-base font-semibold text-[#F5F1E8]">
            Stay Connected
          </h3>

          <p className="mt-5 text-xs leading-6 text-[#AAB9AD] sm:text-[13px]">
            Follow us for book discoveries, reading inspiration
            and updates from our library.
          </p>

          <div className="mt-5 flex gap-2.5">

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
             className="btn btn-ghost btn-circle h-9 min-h-9 w-9 rounded-full border border-white/15 p-0 text-[#C7D5C9] transition duration-300 hover:-translate-y-1 hover:border-[#B9DCCB] hover:bg-[#B9DCCB] hover:text-[#123629]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="btn btn-ghost btn-circle h-9 min-h-9 w-9 rounded-full border border-white/15 p-0 text-[#C7D5C9] transition duration-300 hover:-translate-y-1 hover:border-[#B9DCCB] hover:bg-[#B9DCCB] hover:text-[#123629]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="btn btn-ghost btn-circle h-9 min-h-9 w-9 rounded-full border border-white/15 p-0 text-[#C7D5C9] transition duration-300 hover:-translate-y-1 hover:border-[#B9DCCB] hover:bg-[#B9DCCB] hover:text-[#123629]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M5.2 3.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM3.6 8.5h3.2V20H3.6V8.5Zm5.3 0H12v1.6h.1a3.5 3.5 0 0 1 3.2-1.8c3.4 0 4 2.2 4 5.1V20h-3.2v-5.8c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1V20H8.9V8.5Z" />
              </svg>
            </a>

            
                  {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="btn btn-ghost btn-circle h-9 min-h-9 w-9 rounded-full border border-white/15 p-0 text-[#C7D5C9] transition duration-300 hover:-translate-y-1 hover:border-[#B9DCCB] hover:bg-[#B9DCCB] hover:text-[#123629]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.3L5.7 22H2.5l7.3-8.4L1.8 2h6.5l4.4 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
              </svg>
            </a>

          </div>
        </div>
      </div>


      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-4 text-center sm:flex-row sm:text-left">
          <p className="text-[10px] tracking-wide text-[#91A397]">
            © {new Date().getFullYear()} BookNook. All rights reserved.
          </p>

          <p className="text-[10px] text-[#91A397]">
            Crafted with <span className="text-[#B9DCCB]">♥</span> for book lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}
