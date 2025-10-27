import { useEffect, useRef } from "react";
import type { Book } from "@/types/book";
import BookList from "@/components/BookList";

type Props = {
  books: Book[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  queryActive: boolean;
};

export default function BookListWithInfiniteScroll({
  books,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  queryActive,
}: Props) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;
    if (isFetchingNextPage) return;
    if (!loadMoreRef.current) return;

    const el = loadMoreRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Caso: nessuna ricerca ancora fatta
  if (!queryActive) {
    return (
      <div className="flex flex-col items-center text-gray-500 mt-10">
        <p>Cerca un libro per iniziare 📚</p>
      </div>
    );
  }

  // Caso: ricerca fatta ma nessun risultato
  if (queryActive && books.length === 0 && !isFetchingNextPage) {
    return (
      <div className="flex flex-col items-center text-gray-500 mt-10">
        <p>Nessun libro trovato 😕</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <BookList books={books} />

      {isFetchingNextPage && (
        <div className="flex justify-center py-4 text-gray-500 text-sm">
          Caricamento altri titoli...
        </div>
      )}

      {/* sentinel per l'intersection observer */}
      <div ref={loadMoreRef} className="h-10" />

      {!hasNextPage && books.length > 0 && !isFetchingNextPage && (
        <div className="flex justify-center py-6 text-gray-400 text-xs">
          Fine risultati ✨
        </div>
      )}
    </div>
  );
}
