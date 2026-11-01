
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";




interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  addedByEmail: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function MyBooksPage() {

 useEffect(() => {
  console.log("My Books title effect running");
  document.title = "BookNook | My Books";
}, []);

  const router = useRouter();
 const { data: session, isPending } = authClient.useSession();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");

  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "Fiction",
    image: "",
    description: "",
    totalCopies: 1,
  });

  const showToast = (text: string) => {
    setToast(text);
    window.setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    if (isPending) return;

    if (!session?.user?.email) {
      router.replace("/login?callbackUrl=/my-books");
      return;
    }

    const loadBooks = async () => {
      try {
        const tokenResult = await authClient.token();
        const token = tokenResult.data?.token;

        if (!token) {
          setMessage("Please log in again.");
          return;
        }

        const response = await fetch(`${API_URL}/books`, {
          cache: "no-store",
        });

        if (!response.ok) {
          setMessage("Failed to load books.");
          return;
        }

        const result: Book[] = await response.json();

        // Show only books added by the logged-in user
        setBooks(
          result.filter(
            (book) => book.addedByEmail === session.user.email
          )
        );
      } catch (error) {
        console.error(error);
        setMessage("Something went wrong while loading books.");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [session, isPending, router]);

  const openEditModal = (book: Book) => {
    setEditingBook(book);

    setForm({
      title: book.title ?? "",
      author: book.author ?? "",
      category: book.category ?? "Fiction",
      image: book.image ?? "",
      description: book.description ?? "",
      totalCopies: book.totalCopies ?? 1,
    });
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingBook) return;

    setSaving(true);

    try {
      const tokenResult = await authClient.token();
      const token = tokenResult.data?.token;

      if (!token) {
        showToast("Please log in again.");
        return;
      }

      const response = await fetch(
        `${API_URL}/books/${editingBook._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            totalCopies: Number(form.totalCopies),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        showToast(result.message || "Failed to update book.");
        return;
      }

      setBooks((previous) =>
        previous.map((book) =>
          book._id === editingBook._id
            ? { ...book, ...form, totalCopies: Number(form.totalCopies) }
            : book
        )
      );

      setEditingBook(null);
      showToast("Book updated successfully!");
    } catch (error) {
      console.error(error);
      showToast("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingBook) return;

    setSaving(true);

    try {
      const tokenResult = await authClient.token();
      const token = tokenResult.data?.token;

      if (!token) {
        showToast("Please log in again.");
        return;
      }

      const response = await fetch(
        `${API_URL}/books/${deletingBook._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        showToast(result.message || "Failed to delete book.");
        return;
      }

      setBooks((previous) =>
        previous.filter((book) => book._id !== deletingBook._id)
      );

      setDeletingBook(null);
      showToast("Book deleted successfully!");
    } catch (error) {
      console.error(error);
      showToast("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (isPending || loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F8F5EE]">
        <p className="text-[#42634F]">Loading your books...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5EE] px-4 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#789482]">
          Your Collection
        </p>

        <h1 className="mt-3 font-[var(--font-playfair)] text-3xl font-bold text-[#0C1C15] md:text-4xl">
          My Books
        </h1>

        <p className="mt-3 text-sm text-[#718076]">
          Manage the books you have added to BookNook.
        </p>

        {toast && (
          <div
            role="status"
            className="fixed right-5 top-5 z-[100] rounded-lg bg-[#0C1C15] px-5 py-3 text-sm font-medium text-white shadow-xl"
          >
            {toast}
          </div>
        )}

        {message && (
          <p role="alert" className="mt-6 text-sm text-red-600">
            {message}
          </p>
        )}

        {books.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[#E6E0D5] bg-white px-6 py-16 text-center">
            <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-[#0C1C15]">
              No Books Added Yet
            </h2>
            <p className="mt-3 text-sm text-[#718076]">
              Add your first book to manage your collection here.
            </p>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto rounded-2xl border border-[#E6E0D5] bg-white">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-[#EAF1EB] text-xs uppercase tracking-wider text-[#42634F]">
                <tr>
                  <th className="px-6 py-5">Book</th>
                  <th className="px-6 py-5">Category</th>
                  <th className="px-6 py-5">Copies</th>
                  <th className="px-6 py-5">Actions</th>
                </tr>
              </thead>

              <tbody>
                {books.map((book) => (
                  <tr key={book._id} className="border-t border-[#EEEAE1]">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        {book.image ? (
                          <div className="relative h-16 w-12 shrink-0">
                            <Image
                              src={book.image}
                              alt={book.title}
                              fill
                              unoptimized
                              sizes="48px"
                              className="rounded object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-16 w-12 shrink-0 rounded bg-[#EAF1EB]" />
                        )}

                        <div>
                          <p className="font-semibold text-[#0C1C15]">
                            {book.title}
                          </p>
                          <p className="mt-1 text-sm text-[#718076]">
                            {book.author}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-[#718076]">
                      {book.category}
                    </td>

                    <td className="px-6 py-5 text-sm text-[#718076]">
                      {book.totalCopies}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(book)}
                          className="rounded-lg bg-[#EAF1EB] px-4 py-2.5 text-xs font-semibold text-[#294B38] hover:bg-[#D8E6DA]"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => setDeletingBook(book)}
                          className="rounded-lg bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-8">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-[#F8F5EE] p-6 shadow-2xl md:p-8">
            <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-[#0C1C15]">
              Edit Book
            </h2>

            <form onSubmit={handleUpdate} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#42634F]">
                  Book Title
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#E6E0D5] bg-white px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#42634F]">
                  Author
                </label>
                <input
                  required
                  value={form.author}
                  onChange={(e) =>
                    setForm({ ...form, author: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#E6E0D5] bg-white px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#42634F]">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#E6E0D5] bg-white px-4 py-3 text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#42634F]">
                  Image URL
                </label>
                <input
                  required
                  type="url"
                  value={form.image}
                  onChange={(e) =>
                    setForm({ ...form, image: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#E6E0D5] bg-white px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#42634F]">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#E6E0D5] bg-white px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#42634F]">
                  Total Copies
                </label>
                <input
                  required
                  type="number"
                  min="0"
                  value={form.totalCopies}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      totalCopies: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-lg border border-[#E6E0D5] bg-white px-4 py-3 text-sm"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  disabled={saving}
                  className="flex-1 rounded-lg border border-[#C8D1C8] px-4 py-3 text-sm font-semibold text-[#42634F]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-lg bg-[#0C1C15] px-4 py-3 text-sm font-semibold text-white disabled:bg-gray-400"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-[#F8F5EE] p-7 shadow-2xl">
            <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-[#0C1C15]">
              Delete Book?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#718076]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#0C1C15]">
                {deletingBook.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setDeletingBook(null)}
                disabled={saving}
                className="flex-1 rounded-lg border border-[#C8D1C8] px-4 py-3 text-sm font-semibold text-[#42634F]"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={saving}
                className="flex-1 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
              >
                {saving ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
