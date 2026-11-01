
"use client";


import { useEffect } from "react";
import NewArrivals from "@/components/NewArrivals";
import HowBorrowingWorks from "@/components/HowBorrowingWorks";
import ReaderReviews from "@/components/ReaderReviews";
import Banner from "@/components/Banner";



export default function Home() {
  useEffect(() => {
    document.title = "BookNook | Home";
  }, []);

  return (
    <main className="w-full overflow-hidden bg-[#081810]">

      <Banner />
      <NewArrivals />

      <HowBorrowingWorks />

      <ReaderReviews />
    </main>
  );
}
