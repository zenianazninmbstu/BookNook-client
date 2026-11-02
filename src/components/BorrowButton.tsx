
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface BorrowButtonProps {
  bookId: string;
  bookTitle: string;
  bookImage?: string;
  totalCopies: number;
}

export default function BorrowButton({
  bookId,
  bookTitle,
  bookImage,
  totalCopies,
}: BorrowButtonProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBorrow = async () => {
    setLoading(true);
    setMessage("");

    try {
      const tokenResult = await authClient.token();
      const token = tokenResult.data?.token;

      if (!token) {
        setMessage("Please log in again to borrow this book.");
        return;
      }

      const borrowDate = new Date();
      const returnDate = new Date(borrowDate);
      returnDate.setDate(returnDate.getDate() + 7);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/borrows`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookId,
            bookTitle,
            bookImage,
            borrowDate: borrowDate.toISOString(),
            returnDate: returnDate.toISOString(),
          }),
        }
      );

      const result = await response.json();

     if (!response.ok) {
  toast.error(result.message || "Unable to borrow this book.");
  return;
}

     toast.success("Book borrowed successfully!");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Borrow error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-7">
        <button
          onClick={() => {
            setMessage("");
            setIsOpen(true);
          }}
          disabled={totalCopies <= 0}
          className="w-full rounded-lg bg-[#0C1C15] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#294B38] disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {totalCopies <= 0 ? "Not Available" : "Borrow This Book"}
        </button>

        {message && (
          <p role="status" className="mt-3 text-center text-sm text-[#42634F]">
            {message}
          </p>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-[#F8F5EE] p-7 shadow-2xl">
            <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-[#0C1C15]">
              Borrow This Book
            </h2>

            <p className="mt-2 text-sm text-[#718076]">
              Confirm your details before borrowing.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#42634F]">
                  User Name
                </label>
                <input
                  value={session?.user?.name ?? ""}
                  readOnly
                  className="w-full rounded-lg border border-[#E6E0D5] bg-white px-4 py-3 text-sm text-[#0C1C15]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#42634F]">
                  Email
                </label>
                <input
                  value={session?.user?.email ?? ""}
                  readOnly
                  className="w-full rounded-lg border border-[#E6E0D5] bg-white px-4 py-3 text-sm text-[#0C1C15]"
                />
              </div>
            </div>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="flex-1 rounded-lg border border-[#C8D1C8] px-4 py-3 text-sm font-semibold text-[#42634F]"
              >
                Cancel
              </button>

              <button
                onClick={handleBorrow}
                disabled={loading || !session?.user?.email}
                className="flex-1 rounded-lg bg-[#0C1C15] px-4 py-3 text-sm font-semibold text-white disabled:bg-gray-400"
              >
                {loading ? "Processing..." : "Confirm Borrow"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
