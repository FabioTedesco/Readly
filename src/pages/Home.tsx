import { useState, useMemo } from "react";
import SearchBar from "../components/Searchbar";
import { searchBook } from "@/services/openLibrary";
import type { Book } from "@/types/book";
import { useInfiniteQuery } from "@tanstack/react-query";
import BookListWithInfiniteScroll from "@/components/BookListWithInfiniteScroll";

const PAGE_SIZE = 20;

export default function Home() {
  const [query, setQuery] = useState("");

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isError,
  } = useInfiniteQuery({
    queryKey: ["books", query],
    enabled: query.trim() !== "",
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const page = pageParam ?? 1;
      const res = await searchBook(query, page, PAGE_SIZE);

      return {
        books: res.books,
        page: res.page,
        hasMore: res.books.length === PAGE_SIZE,
      };
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) return undefined;
      return lastPage.page + 1;
    },
  });

  const allBooks: Book[] = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((p) => p.books);
  }, [data]);

  // Questo lo passiamo alla SearchBar
  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    setQuery(q);
    refetch(); // forza refresh pagina1 per la nuova query
  };

  // loading iniziale (prima pagina)
  if (isLoading && query) {
    return (
      <main className="flex-grow bg-gray-50 p-6 text-center text-gray-700">
        <SearchBar onSearch={handleSearch} />
        <p className="text-gray-500 mt-4">Caricamento...</p>
      </main>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <main className="flex-grow bg-gray-50 p-6 text-center text-gray-700">
        <SearchBar onSearch={handleSearch} />
        <div className="mt-4">
          <p className="text-red-600">Errore: {error.message}</p>
          <button
            onClick={() => refetch()}
            className="bg-red-500 text-white px-3 py-2 rounded shadow mt-2"
          >
            Riprova
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow bg-gray-50 min-h-screen flex flex-col">
      {/* barra di ricerca */}
      <div className="p-6 text-center text-gray-700">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* lista con infinite scroll */}
      <BookListWithInfiniteScroll
        books={allBooks}
        fetchNextPage={fetchNextPage}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        queryActive={query.trim() !== ""}
      />
    </main>
  );
}
