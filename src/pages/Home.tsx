import { useState } from "react";
import SearchBar from "../components/Searchbar";
import { searchBook } from "@/services/openLibrary";
import type { Book } from "@/types/book";
import BookList from "@/components/BookList";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // console.log(books);

  const handleSearch = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);

    try {
      const results = await searchBook(q);
      setBooks(results);
    } catch (error) {
      console.error(error);
      setError("errore nel caricamento");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading</p>;

  if (error)
    return (
      <>
        <p>Error: {error} </p>
        <button
          onClick={() => setError(null)}
          className="bg-red-400 py-2 border-1"
        >
          torna indietro
        </button>
      </>
    );

  return (
    <div>
      {/* Contenuto principale */}
      <main className="flex-grow bg-gray-50">
        <div className="p-6 text-center text-gray-700">
          <SearchBar onSearch={handleSearch} />
        </div>
        <BookList books={books} />
      </main>
    </div>
  );
};

export default Home;
