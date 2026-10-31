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
        const res = await fetch(`${API_BASE}/books/latest`);

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
    <section className="w-full bg-[#081810] px-6 py-16 sm:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center">
          <p className="font-[var(--font-playfair)] text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C6A58A]/80 sm:text-xs">
            Fresh On The Shelf
          </p>

          <h2 className="mt-3 font-[var(--font-playfair)] text-2xl font-bold text-[#F8F5EE] sm:text-3xl md:text-4xl">
            New Arrivals
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-[#AAB9AD] sm:text-[13px]">
            The latest books added by our readers.
          </p>

          <div className="mx-auto mt-5 h-[2px] w-16 rounded-full bg-[#B9DCCB]" />
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-xl border border-[#B9DCCB]/15 bg-[#0C1C15]"
              >
                <div className="aspect-[2/3] w-full bg-[#B9DCCB]/10" />
                <div className="space-y-2.5 p-3.5">
                  <div className="h-2 w-1/2 rounded bg-[#B9DCCB]/10" />
                  <div className="h-3 w-3/4 rounded bg-[#B9DCCB]/10" />
                  <div className="h-2 w-2/3 rounded bg-[#B9DCCB]/10" />
                  <div className="h-7 w-full rounded-md bg-[#B9DCCB]/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <p className="mt-12 rounded-2xl border border-[#C6A58A]/30 bg-[#0C1C15] px-6 py-8 text-center text-xs text-[#C6A58A] sm:text-sm">
            {error}
          </p>
        )}

        {/* Empty State */}
        {!loading && !error && books.length === 0 && (
          <p className="mt-12 rounded-2xl border border-[#B9DCCB]/15 bg-[#0C1C15] px-6 py-8 text-center text-xs text-[#AAB9AD] sm:text-sm">
            No books in the library yet. Check back soon!
          </p>
        )}

        {/* Book Cards */}
        {!loading && !error && books.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {books.map((book) => (
              <article
                key={book._id}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#B9DCCB]/15 bg-[#0C1C15] shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#B9DCCB]/45 hover:shadow-xl hover:shadow-[#B9DCCB]/10"
              >
                {/* Cover Image */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#10231A]">
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
                        className="h-14 w-14 text-[#B9DCCB]/40"
                      >
                        <path d="M12 7v14m0-14C9 4 5 4 2 5v14c4-1 7-1 10 2m0-14c3-3 7-3 10-2v14c-4-1-7-1-10 2" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-3.5">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#91A397]">
                    {book.category}
                  </p>

                  <h3 className="mt-1.5 font-[var(--font-playfair)] text-[13px] font-semibold leading-snug text-[#F5F1E8] line-clamp-2">
                    {book.title}
                  </h3>

                  <p className="mt-1 text-[11px] text-[#AAB9AD]">
                    by {book.author}
                  </p>

                  {/* View Details */}
                  <Link
                    href={`/books/${book._id}`}
                    className="mt-3 w-full rounded-md bg-[#B9DCCB] px-3 py-2 text-center text-[11px] font-semibold tracking-wide text-[#0C1C15] transition-all duration-300 hover:bg-[#E7F1EA] sm:text-xs"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* See All Books */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-full bg-[#B9DCCB] px-7 py-3 text-xs font-semibold tracking-wide text-[#0C1C15] shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#E7F1EA] sm:text-sm"
          >
            See All Books
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
