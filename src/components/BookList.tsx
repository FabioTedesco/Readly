import Card from "./Card";
import type { Book } from "@/types/book";

type Props = {
  books: Book[];
};

const onAddToWishlist = () => {
  console.log("wishlist");
};
const onAddToMyBooks = () => {
  console.log("My books");
};

const BookList = ({ books }: Props) => {
  if (books.length === 0) {
    return <p>Nessun libro trovato</p>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      {books.map((book) => (
        <Card
          key={book.key}
          book={book}
          onAddToWishlist={onAddToWishlist}
          onAddToMyBooks={onAddToMyBooks}
        />
      ))}
    </div>
  );
};

export default BookList;
