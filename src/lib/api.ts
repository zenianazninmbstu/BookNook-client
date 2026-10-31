// Base URL of the BookNook Express server
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

// Shape of a book document from the "books" collection
export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image?: string;
  totalCopies?: number;
  createdAt?: string;
}
