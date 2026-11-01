
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { API_BASE, type Book } from "@/lib/api";

export default function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchLatestBooks() {
      try {
        const res = await fetch(`${API_BASE}/books?sort=newest&limit=6`);

        if (!res.ok) {
          throw new Error("Failed to load books");
        }

        const data: Book[] = await res.json();

        if (!cancelled) {
          setBooks(data);
        }
      } catch {
        if (!cancelled) {
          setError("Could not load new arrivals. Is the server running?");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchLatestBooks();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#06170F] px-4 py-16 sm:px-6 md:px-8 md:py-20">
      {/* Decorative Leaves */}
      <svg
        aria-hidden="true"
        viewBox="0 0 180 220"
        fill="none"
        className="pointer-events-none absolute -left-12 -top-8 hidden w-48 text-[#315D43]/45 md:block"
      >
        <path d="M12 190C48 130 75 75 150 20" stroke="currentColor" strokeWidth="2" />
        <path d="M48 133C12 112 4 82 15 48C49 59 65 88 48 133Z" fill="currentColor" />
        <path d="M78 91C73 49 94 22 132 10C140 48 119 77 78 91Z" fill="currentColor" />
        <path d="M25 166C-5 143 -12 115 -1 87C31 101 42 130 25 166Z" fill="currentColor" />
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 180 220"
        fill="none"
        className="pointer-events-none absolute -right-12 -top-8 hidden w-48 -scale-x-100 text-[#315D43]/45 md:block"
      >
        <path d="M12 190C48 130 75 75 150 20" stroke="currentColor" strokeWidth="2" />
        <path d="M48 133C12 112 4 82 15 48C49 59 65 88 48 133Z" fill="currentColor" />
        <path d="M78 91C73 49 94 22 132 10C140 48 119 77 78 91Z" fill="currentColor" />
        <path d="M25 166C-5 143 -12 115 -1 87C31 101 42 130 25 166Z" fill="currentColor" />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center">
          <p className="font-[var(--font-playfair)] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C6A58A] sm:text-xs">
            Fresh On The Shelf
          </p>

        <h2 className="mt-3 font-[var(--font-playfair)] text-[32px] font-bold tracking-tight text-[#F8F5EE] sm:text-4xl md:text-[44px] lg:text-5xl">
  New Arrivals
</h2>

          <p className="mx-auto mt-4 max-w-xl font-[var(--font-playfair)] text-sm text-[#B9DCCB] sm:text-base md:text-lg">
            The latest books added by our readers.
          </p>

          <div className="mx-auto mt-5 h-[3px] w-16 rounded-full bg-[#B9DCCB]" />
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-xl border border-[#B9DCCB]/25 bg-[#0C1C15]"
              >
                <div className="aspect-[3/4] w-full bg-[#B9DCCB]/10" />
                <div className="space-y-3 p-3">
                  <div className="h-2 w-1/2 rounded bg-[#B9DCCB]/10" />
                  <div className="h-3 w-3/4 rounded bg-[#B9DCCB]/10" />
                  <div className="h-2 w-2/3 rounded bg-[#B9DCCB]/10" />
                  <div className="h-8 w-full rounded-full bg-[#B9DCCB]/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <p className="mt-12 rounded-2xl border border-[#C6A58A]/30 bg-[#0C1C15] px-6 py-8 text-center text-sm text-[#C6A58A]">
            {error}
          </p>
        )}

        {/* Empty State */}
        {!loading && !error && books.length === 0 && (
          <p className="mt-12 rounded-2xl border border-[#B9DCCB]/20 bg-[#0C1C15] px-6 py-8 text-center text-sm text-[#AAB9AD]">
            No books in the library yet. Check back soon!
          </p>
        )}

        {/* Book Cards */}
        {!loading && !error && books.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {books.map((book) => (
              <article
                key={book._id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#B9DCCB]/25 bg-gradient-to-b from-[#10251A] to-[#091B12] shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#B9DCCB]/60 hover:shadow-xl hover:shadow-[#B9DCCB]/10"
              >
                {/* Cover Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#10231A]">
                  {book.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        className="h-12 w-12 text-[#B9DCCB]/40"
                      >
                        <path d="M12 7v14m0-14C9 4 5 4 2 5v14c4-1 7-1 10 2m0-14c3-3 7-3 10-2v14c-4-1-7-1-10 2" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Book Information */}
                <div className="flex flex-1 flex-col p-3">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-[#91B5A0]">
                    {book.category}
                  </p>

                  <h3 className="mt-2 min-h-10 line-clamp-2 font-[var(--font-playfair)] text-xs font-semibold leading-snug text-[#F5F1E8] sm:text-[13px]">
                    {book.title}
                  </h3>

                  <p className="mt-2 line-clamp-1 text-[10px] text-[#AAB9AD] sm:text-[11px]">
                    by {book.author}
                  </p>

                  {/* View Details */}
                  <Link
                    href={`/books/${book._id}`}
                    className="mt-auto block w-full rounded-full bg-[#B9DCCB] px-4 py-2 text-center text-[11px] font-semibold tracking-wide text-[#0C1C15] shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#E7F1EA] sm:text-xs"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* See All Books */}
        <div className="mt-12 flex items-center justify-center gap-4 sm:gap-6">
          <div className="hidden h-px flex-1 bg-[#B9DCCB]/50 sm:block" />

          <Link
            href="/books"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#B9DCCB] px-4 py-2 text-[11px] font-semibold tracking-wide text-[#0C1C15] shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#E7F1EA] sm:text-xs"
          >
            See All Books
            <span aria-hidden="true" className="text-lg">→</span>
          </Link>

          <div className="hidden h-px flex-1 bg-[#B9DCCB]/50 sm:block" />
        </div>
      </div>
    </section>
  );
}
