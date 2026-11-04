"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  useEffect(() => {
    document.title = "BookNook | My Profile";

    if (!isPending && !user) {
      router.push("/login");
    }
  }, [isPending, user, router]);

  if (isPending || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#F8F5EE]">
        <p className="text-[#557563]">Loading profile...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#F8F5EE] px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-[#DCE5DD] bg-white p-8 text-center shadow-sm">
        <h1 className="mb-8 font-[var(--font-playfair)] text-4xl text-[#0C1C15]">
          My Profile
        </h1>

        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            className="mx-auto mb-5 h-28 w-28 rounded-full border-4 border-[#DCE5DD] object-cover"
          />
        ) : (
          <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-[#B9DCCB] text-4xl font-bold text-[#15392D]">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}

        <h2 className="text-2xl font-semibold text-[#0C1C15]">
          {user.name}
        </h2>

        <p className="mt-2 text-gray-500">{user.email}</p>
      </div>
    </main>
  );
}