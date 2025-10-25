import axios from "axios";
import type { Book } from "@/types/book";

const api = axios.create({
  baseURL: "https://openlibrary.org",
});

type OLSearchDoc = {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
};

type OLSearchResponse = {
  docs: OLSearchDoc[];
  numFound: number;
  start: number;
};

export const searchBook = async (
  q: string,
  page = 1,
  limit = 20
): Promise<Book[]> => {
  const response = await api.get<OLSearchResponse>(`/search.json?`, {
    params: { q, page, limit },
  });

  const books = response.data.docs.map((doc) => ({
    key: doc.key,
    title: doc.title,
    author: doc.author_name?.[0] ?? "Unknown",
    coverId: doc.cover_i ? String(doc.cover_i) : "",
  }));

  console.log(books);

  return books;
};
