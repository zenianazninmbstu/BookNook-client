
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage?: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function MyBorrowsPage() {
  useEffect(() => {
  document.title = "BookNook | My Borrows";
}, []);
  const { data: session, isPending } = authClient.useSession();

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [returningId, setReturningId] = useState("");

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      window.location.href = "/login?callbackUrl=/my-borrows";
      return;
    }

    const loadBorrows = async () => {
      try {
        const tokenResult = await authClient.token();
        const token = tokenResult.data?.token;

        if (!token) {
          setMessage("Please log in again.");
          return;
        }

        const response = await fetch(`${API_URL}/borrows`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          setMessage(result.message || "Failed to load borrowed books.");
          return;
        }

        setBorrows(result);
      } catch (error) {
        console.error(error);
        setMessage("Something went wrong while loading borrowed books.");
      } finally {
        setLoading(false);
      }
    };

    loadBorrows();
  }, [session, isPending]);

  const handleReturn = async (borrowId: string) => {
    setReturningId(borrowId);
    setMessage("");

    try {
      const tokenResult = await authClient.token();
      const token = tokenResult.data?.token;

      if (!token) {
        setMessage("Please log in again.");
        return;
      }

      const response = await fetch(`${API_URL}/borrows/${borrowId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Failed to return book.");
        return;
      }

      setBorrows((previous) =>
        previous.filter((borrow) => borrow._id !== borrowId)
      );

      setMessage("Book returned successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setReturningId("");
    }
  };

  if (isPending || loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F8F5EE]">
        <p className="text-[#42634F]">Loading your borrowed books...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5EE] px-4 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#789482]">
          Your Reading Journey
        </p>

        <h1 className="mt-3 font-[var(--font-playfair)] text-3xl font-bold text-[#0C1C15] md:text-4xl">
          My Borrowed Books
        </h1>

        <p className="mt-3 text-sm text-[#718076]">
          Keep track of the books you have borrowed from BookNook.
        </p>

        {message && (
          <p role="status" className="mt-5 text-sm text-[#42634F]">
            {message}
          </p>
        )}

        {borrows.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[#E6E0D5] bg-white px-6 py-16 text-center">
            <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-[#0C1C15]">
              No Borrowed Books Yet
            </h2>
            <p className="mt-3 text-sm text-[#718076]">
              Explore our collection and borrow your first book.
            </p>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto rounded-2xl border border-[#E6E0D5] bg-white">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-[#EAF1EB] text-xs uppercase tracking-wider text-[#42634F]">
                <tr>
                  <th className="px-6 py-5">Book</th>
                  <th className="px-6 py-5">Borrow Date</th>
                  <th className="px-6 py-5">Return Date</th>
                  <th className="px-6 py-5">Action</th>
                </tr>
              </thead>

              <tbody>
                {borrows.map((borrow) => (
                  <tr key={borrow._id} className="border-t border-[#EEEAE1]">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        {borrow.bookImage ? (
                          <div className="relative h-16 w-12 shrink-0">
                            <Image
                              src={borrow.bookImage}
                              alt={borrow.bookTitle}
                              fill
                              unoptimized
                              sizes="48px"
                              className="rounded object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-16 w-12 shrink-0 rounded bg-[#EAF1EB]" />
                        )}

                        <span className="font-semibold text-[#0C1C15]">
                          {borrow.bookTitle}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-[#718076]">
                      {new Date(borrow.borrowDate).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5 text-sm text-[#718076]">
                      {new Date(borrow.returnDate).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5">
                      <button
                        onClick={() => handleReturn(borrow._id)}
                        disabled={returningId === borrow._id}
                        className="rounded-lg bg-[#0C1C15] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#294B38] disabled:bg-gray-400"
                      >
                        {returningId === borrow._id
                          ? "Returning..."
                          : "Return Book"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
