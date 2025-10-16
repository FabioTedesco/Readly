import { useBooks } from "@/context/BooksContext";

const BooksToggle = () => {
  const { handleToggle, toggleShelf } = useBooks();
  return (
    <div className="flex justify-center w-auto rounded-lg p-1 space-x-1 z-50">
      <button
        className={`px-4 py-1 text-sm font-medium rounded-lg transition ${
          toggleShelf === "read"
            ? "bg-black text-white"
            : "text-gray-400 hover:bg-gray-300"
        }`}
        onClick={() => handleToggle("read")}
      >
        My Shelf
      </button>
      <button
        className={`px-4 py-1 text-sm font-medium rounded-lg transition ${
          toggleShelf === "wishlist"
            ? "bg-red-500 text-white"
            : "text-gray-400 hover:bg-gray-300"
        }`}
        onClick={() => handleToggle("wishlist")}
      >
        Want to read
      </button>
    </div>
  );
};

export default BooksToggle;
