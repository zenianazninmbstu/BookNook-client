
import Image from "next/image";
import Link from "next/link";
import { API_BASE, type Book } from "@/lib/api";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "BookNook | All Books",
  description: "Explore all books available in the BookNook library.",
};


async function getBooks(): Promise<Book[]> {
  try {
    const response = await fetch(`${API_BASE}/books`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    return response.json();
  } catch (error) {
    console.error("Books loading error:", error);
    return [];
  }
}

export default async function AllBookPage() {
  const books = await getBooks();

  return (
    <main className="min-h-screen bg-[#F8F5EE] px-4 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#789482]">
            The BookNook Collection
          </p>

          <h1 className="font-[var(--font-playfair)] text-4xl font-bold tracking-tight text-[#0C1C15] md:text-5xl">
            Explore All Books
          </h1>

          <div className="mx-auto my-5 h-[2px] w-16 bg-[#B9DCCB]" />

          <p className="mx-auto max-w-xl text-sm leading-7 text-[#66736A] md:text-base">
            Discover inspiring stories, explore new ideas, and find
            your next favorite book in our growing collection.
          </p>
        </div>

        {/* Collection Info */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[#DCDCCF] pb-5">
          <div>
            <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#0C1C15]">
              Our Library
            </h2>
            <p className="mt-1 text-xs text-[#849087]">
              A collection made for curious minds
            </p>
          </div>

          <span className="rounded-full border border-[#B9DCCB] bg-[#EAF1EB] px-4 py-2 text-xs font-semibold tracking-wide text-[#42634F]">
            {books.length} BOOKS AVAILABLE
          </span>
        </div>

        {/* Empty State */}
        {books.length === 0 ? (
          <div className="rounded-2xl border border-[#E5E0D5] bg-white px-6 py-20 text-center shadow-sm">
            <p className="font-[var(--font-playfair)] text-2xl font-bold text-[#0C1C15]">
              No Books Found
            </p>
            <p className="mt-3 text-sm text-gray-500">
              Our collection is waiting for new stories.
            </p>
          </div>
        ) : (

          /* Book Grid */
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <article
                key={book._id}
                className="group overflow-hidden rounded-2xl border border-[#E6E0D5] bg-white shadow-[0_4px_20px_rgba(12,28,21,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_35px_rgba(12,28,21,0.12)]"
              >
                {/* Book Cover */}
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#F0EEE6] p-5">
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-[#9AA59B]">
                      No Cover Available
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#42634F] shadow-sm backdrop-blur">
                    {book.category}
                  </span>
                </div>

                {/* Book Information */}
                <div className="p-5 md:p-6">
                  <h3 className="line-clamp-2 min-h-[3.5rem] font-[var(--font-playfair)] text-xl font-bold leading-snug text-[#0C1C15] transition-colors group-hover:text-[#42634F]">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#7C877E]">
                    Written by{" "}
                    <span className="font-medium text-[#4E5C52]">
                      {book.author}
                    </span>
                  </p>

                  <div className="my-5 border-t border-[#EEEAE1]" />

                  {/* Availability and Details */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9AA49B]">
                        Availability
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#42634F]">
                        {book.totalCopies ?? 0} Copies
                      </p>
                    </div>

                    <Link
                      href={`/books/${book._id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#0C1C15] px-4 py-3 text-xs font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#294B38]"
                    >
                      View Details
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
