
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { API_BASE, type Book } from "@/lib/api";
import { auth } from "@/lib/auth";
import BorrowButton from "@/components/BorrowButton";

interface BookDetails extends Book {
  description?: string;
  addedBy?: string;
  addedByEmail?: string;
}

async function getBook(id: string): Promise<BookDetails | null> {
  try {
    const response = await fetch(`${API_BASE}/books/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    console.error("Book details loading error:", error);
    return null;
  }
}

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Check whether the user is logged in
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8F5EE] px-4 py-14 md:py-20">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#42634F] transition hover:text-[#0C1C15]"
        >
          <span>←</span> Back to All Books
        </Link>

        <div className="grid overflow-hidden rounded-2xl border border-[#E6E0D5] bg-white shadow-[0_8px_30px_rgba(12,28,21,0.06)] md:grid-cols-2">

          {/* Book Image */}
          <div className="relative flex min-h-[380px] items-center justify-center bg-[#F0EEE6] p-8 md:min-h-[580px]">
            {book.image ? (
              <Image
                src={book.image}
                alt={book.title}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-8"
              />
            ) : (
              <p className="text-sm text-[#849087]">
                No Cover Available
              </p>
            )}
          </div>

          {/* Book Information */}
          <div className="flex flex-col justify-center p-7 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#789482]">
              BookNook Collection
            </p>

            <span className="mt-5 w-fit rounded-full border border-[#B9DCCB] bg-[#EAF1EB] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#42634F]">
              {book.category}
            </span>

            <h1 className="mt-5 font-[var(--font-playfair)] text-3xl font-bold leading-tight text-[#0C1C15] md:text-4xl">
              {book.title}
            </h1>

            <p className="mt-4 text-sm text-[#718076]">
              Written by{" "}
              <span className="font-semibold text-[#42634F]">
                {book.author}
              </span>
            </p>

            <div className="my-7 border-t border-[#EEEAE1]" />

            {/* Description */}
            <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#0C1C15]">
              About This Book
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#66736A]">
              {book.description ||
                "No description available for this book yet."}
            </p>

            {/* Added By Information */}
            <div className="mt-7 rounded-xl border border-[#E6E0D5] bg-[#FAF9F5] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#849087]">
                Added to BookNook by
              </p>

              <p className="mt-2 text-sm font-semibold text-[#0C1C15]">
                {book.addedBy || "Information unavailable"}
              </p>

              {book.addedByEmail && (
                <p className="mt-1 break-all text-xs text-[#7C877E]">
                  {book.addedByEmail}
                </p>
              )}
            </div>

            {/* Available Copies */}
            <div className="mt-5 flex items-center justify-between rounded-xl bg-[#EAF1EB] p-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#42634F]">
                Available Copies
              </span>

              <span className="text-2xl font-bold text-[#0C1C15]">
                {book.totalCopies ?? 0}
              </span>
            </div>

            {/* Borrow Button */}
            <BorrowButton
              bookId={book._id}
              bookTitle={book.title}
              bookImage={book.image}
              totalCopies={book.totalCopies ?? 0}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
