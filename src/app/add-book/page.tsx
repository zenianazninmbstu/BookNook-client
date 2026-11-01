
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [totalCopies, setTotalCopies] = useState(1);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3500);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file.");
      return;
    }

    setUploading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      if (!apiKey) {
        showToast("ImgBB API key is missing.");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        showToast("Image upload failed. Please try again.");
        return;
      }

 setImage(result.data.display_url);
showToast("Image uploaded successfully!");
} catch (error) {
  console.error(error);
  showToast("Unable to upload image.");
} finally {
  setUploading(false);
}
};

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!session?.user?.email) {
      showToast("Please log in to add a book.");
      return;
    }

    if (!image) {
      showToast("Please upload a book image first.");
      return;
    }

    setSaving(true);

    try {
      const tokenResult = await authClient.token();
      const token = tokenResult.data?.token;

      if (!token) {
        showToast("Please log in again.");
        return;
      }

      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          author,
          category,
          image,
          description,
          totalCopies: Number(totalCopies),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        showToast(result.message || "Failed to add book.");
        return;
      }

      showToast("Book added successfully!");

      setTitle("");
      setAuthor("");
      setCategory("Fiction");
      setDescription("");
      setImage("");
      setTotalCopies(1);

      router.refresh();
    } catch (error) {
      console.error(error);
      showToast("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F8F5EE]">
        <p className="text-[#42634F]">Loading...</p>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F8F5EE]">
        <p className="text-[#42634F]">Please log in to add a book.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5EE] px-4 py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#789482]">
          Grow Our Collection
        </p>

        <h1 className="mt-3 font-[var(--font-playfair)] text-3xl font-bold text-[#0C1C15] md:text-4xl">
          Add a New Book
        </h1>

        <p className="mt-3 text-sm text-[#718076]">
          Share a new story with the BookNook community.
        </p>

        {toast && (
          <div
            role="status"
            className="fixed right-5 top-5 z-[100] rounded-lg bg-[#0C1C15] px-5 py-3 text-sm font-medium text-white shadow-xl"
          >
            {toast}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 rounded-2xl border border-[#E6E0D5] bg-white p-6 shadow-sm md:p-9"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#42634F]">
              Book Title
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
              className="w-full rounded-lg border border-[#E6E0D5] bg-[#FDFCFA] px-4 py-3 text-sm outline-none focus:border-[#42634F]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#42634F]">
              Author Name
            </label>
            <input
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              className="w-full rounded-lg border border-[#E6E0D5] bg-[#FDFCFA] px-4 py-3 text-sm outline-none focus:border-[#42634F]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#42634F]">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-[#E6E0D5] bg-[#FDFCFA] px-4 py-3 text-sm outline-none focus:border-[#42634F]"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#42634F]">
              Book Image
            </label>
            <input
              required
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="w-full rounded-lg border border-[#E6E0D5] bg-[#FDFCFA] px-4 py-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-[#EAF1EB] file:px-4 file:py-2 file:font-semibold file:text-[#294B38]"
            />

            {uploading && (
              <p className="mt-2 text-sm text-[#42634F]">
                Uploading image...
              </p>
            )}

            {image && (
              <div className="mt-4">
                <img
                  src={image}
                  alt="Uploaded book cover"
                  className="h-40 w-28 rounded-lg border border-[#E6E0D5] object-cover"
                />
                <p className="mt-2 text-xs text-green-700">
                  Image uploaded successfully.
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#42634F]">
              Short Description
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description about the book..."
              className="w-full rounded-lg border border-[#E6E0D5] bg-[#FDFCFA] px-4 py-3 text-sm outline-none focus:border-[#42634F]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#42634F]">
              Total Copies
            </label>
            <input
              required
              type="number"
              min="1"
              value={totalCopies}
              onChange={(e) => setTotalCopies(Number(e.target.value))}
              className="w-full rounded-lg border border-[#E6E0D5] bg-[#FDFCFA] px-4 py-3 text-sm outline-none focus:border-[#42634F]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#42634F]">
              User Name
            </label>
            <input
              readOnly
              value={session.user.name ?? ""}
              className="w-full rounded-lg border border-[#E6E0D5] bg-gray-100 px-4 py-3 text-sm text-[#718076]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#42634F]">
              Email
            </label>
            <input
              readOnly
              value={session.user.email ?? ""}
              className="w-full rounded-lg border border-[#E6E0D5] bg-gray-100 px-4 py-3 text-sm text-[#718076]"
            />
          </div>

          <button
            type="submit"
            disabled={saving || uploading}
            className="w-full rounded-lg bg-[#0C1C15] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#294B38] disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {saving ? "Adding Book..." : uploading ? "Uploading Image..." : "Add Book"}
          </button>
        </form>
      </div>
    </main>
  );
}
