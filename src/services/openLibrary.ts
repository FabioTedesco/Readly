import axios from "axios";
import type { Book, BookDetails } from "@/types/book";

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
): Promise<{
  books: Book[];
  page: number;
  numFound: number;
}> => {
  const response = await api.get<OLSearchResponse>(`/search.json?`, {
    params: { q, page, limit },
  });

  const books = response.data.docs.map((doc) => ({
    key: doc.key,
    title: doc.title,
    author: doc.author_name?.[0] ?? "Unknown",
    coverId: doc.cover_i ? String(doc.cover_i) : "",
  }));

  // console.log(books);

  return {
    books,
    page,
    numFound: response.data.numFound,
  };
};

export const fetchDetails = async (id: string): Promise<BookDetails> => {
  try {
    const workRes = await api.get(`/works/${id}.json`);
    const work = workRes.data;

    let authorName = "Unknown Author";
    const firstAuthorKey: string | undefined = work?.authors?.[0]?.author?.key;

    if (firstAuthorKey) {
      const authorId = firstAuthorKey.replace("/authors/", "");
      const authorRes = await api.get(`/authors/${authorId}.json`);
      authorName = authorRes.data?.name ?? authorName;
    }

    let description: string | undefined;
    if (typeof work.description === "string") {
      description = work.description;
    } else if (work.description?.value) {
      description = work.description.value;
    }

    // console.log("details:", {
    //   title: work.title,
    //   author: authorName,
    //   key: work.key, // es: "/works/OL12345W"
    //   description,
    // });

    return {
      title: work.title,
      author: authorName,
      key: work.key, // es: "/works/OL12345W"
      description,
    };
  } catch (error) {
    // Log utile per debug
    console.error("fetchDetails error:", error);
    throw error; // rilancia per farlo gestire al caller
  }
};
