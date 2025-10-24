import { useBooks } from "@/context/BooksContext";
import type { Book } from "@/types/book";

type Props = {
  book: Book;
};

const Card = ({ book }: Props) => {
  const { add, isInRead, isInWishlist } = useBooks();

  const isRead = isInRead(book.key);
  const isWhishlist = isInWishlist(book.key);

  // Costruisci URL della copertina
  const coverUrl = book.coverId
    ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
    : "https://via.placeholder.com/128x180?text=No+Cover";

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col justify-between">
      {/* Copertina */}
      <div className="flex justify-center">
        <img
          src={coverUrl}
          alt={book.title}
          className="w-32 h-44 object-cover rounded-md"
        />
      </div>
      {/* Testo */}
      <div className="mt-3 flex-1 text-center">
        <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {book.author || "Unknown Author"}
        </p>
      </div>
      {/* Pulsanti */}
      {isRead ? (
        <p>gia letto</p>
      ) : isWhishlist ? (
        <p>in wishlist</p>
      ) : (
        <>
          <button
            onClick={() => add("wishlist", book)}
            className="mt-3 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-1.5 rounded-lg text-sm font-medium transition"
          >
            Add to Wishlist
          </button>
          <button
            onClick={() => add("read", book)}
            className="mt-3 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-1.5 rounded-lg text-sm font-medium transition"
          >
            Add to My Books
          </button>
        </>
      )}
    </div>
  );
};

export default Card;
