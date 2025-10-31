import { useState, useMemo } from "react";
import SearchBar from "../components/Searchbar";
import { searchBook } from "@/services/openLibrary";
import type { Book } from "@/types/book";
import { useInfiniteQuery } from "@tanstack/react-query";
import BookListWithInfiniteScroll from "@/components/BookListWithInfiniteScroll";
import BackToTop from "@/components/BackToTop";
import BooksSkeleton from "@/components/BooksSkeleton";
import ErrorMessage from "@/components/ErrorMessage";

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
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <SearchBar onSearch={handleSearch} />
          <BooksSkeleton />
        </div>
      </main>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <SearchBar onSearch={handleSearch} />
          <div className="mt-8">
            <ErrorMessage message={error.message} onRetry={() => refetch()} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className=" px-4 py-4">
        <h1 className="text-4xl font-bold tracking-tight ml-5">Home</h1>

        <div className="mt-10">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="mt-8">
          <BookListWithInfiniteScroll
            books={allBooks}
            fetchNextPage={fetchNextPage}
            hasNextPage={!!hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            queryActive={query.trim() !== ""}
          />
        </div>
        <BackToTop />
      </div>
    </main>
  );
}
