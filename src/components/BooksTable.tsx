import type { Book } from "@/types/book";
import { useBooks } from "@/context/BooksContext";
import BookCard from "./BookCard";

export default function BooksList() {
  const { read, wishlist, toggleShelf, remove, addNotes, move } = useBooks();

  const books = toggleShelf === "read" ? read : wishlist;

  return (
    <div className="space-y-4 mx-10 my-5">
      {books.length === 0 ? (
        <div className="text-center text-gray-400 italic py-8 border border-dashed rounded-xl">
          No books here yet 📚
        </div>
      ) : (
        books.map((book: Book) => (
          <BookCard
            key={book.key}
            book={book}
            isRead={toggleShelf === "read"}
            onRemove={() => remove(toggleShelf, book.key)}
            onNoteChange={(val) => addNotes(val, book)}
            onMove={() => move(book)}
          />
        ))
      )}
    </div>
  );
}
