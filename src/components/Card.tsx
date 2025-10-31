import { useBooks } from "@/context/BooksContext";
import type { Book } from "@/types/book";

type Props = {
  book: Book;
};

const Card = ({ book }: Props) => {
  const { add, isInRead, isInWishlist } = useBooks();

  const isRead = isInRead(book.key);
  const isWhishlist = isInWishlist(book.key);

  // console.log(isInWishlist(book.key));

  // Costruisci URL della copertina
  const coverUrl = book.coverId
    ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
    : "https://cdn.pixabay.com/photo/2020/04/26/17/45/books-5096427_1280.jpg";

  // console.log(coverUrl);

  return (
    <div className="bg-card rounded-xl border-2 shadow border-border hover:shadow-lg transition flex flex-col justify-between">
      {/* Copertina */}
      <div className="flex justify-center py-2 bg-gray-200">
        <img src={coverUrl} alt={book.title} className="w-36 h-44 rounded-md" />
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
        <div className="p-4">
          <p className="w-full p-1.5 border-2 border-border bg-primary text-secondary rounded-sm font-medium transition  mb-2 text-center">
            Already in MyBooks
          </p>
        </div>
      ) : isWhishlist ? (
        <div className="p-4">
          <p className="w-full p-1.5 border-2 border-border bg-primary text-secondary rounded-sm font-medium transition  mb-2 text-center">
            Already in Wishlist
          </p>
        </div>
      ) : (
        <div className="p-4">
          <button
            onClick={() => add("wishlist", book)}
            className="w-full p-1.5 border-2 border-border hover:bg-border rounded-sm font-medium transition cursor-pointer mb-2"
          >
            Add to Wishlist
          </button>
          <button
            onClick={() => add("read", book)}
            className="w-full p-1.5 border-2 border-border hover:bg-border rounded-sm font-medium transition cursor-pointer"
          >
            Add to My Books
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
