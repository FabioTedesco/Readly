import { useBooks } from "@/context/BooksContext";

const BooksToggle = () => {
  const { handleToggle, toggleShelf } = useBooks();
  return (
    <div className="flex justify-center w-md border-2 rounded-lg p-1 space-x-2 z-50">
      <button
        className={`px-4 py-1 font-medium rounded-lg cursor-pointer  transition ${
          toggleShelf === "read"
            ? "bg-black text-white"
            : "text-gray-400 hover:bg-gray-300"
        }`}
        onClick={() => handleToggle("read")}
      >
        My Shelf
      </button>
      <button
        className={`px-4 py-1  font-medium rounded-lg cursor-pointer transition ${
          toggleShelf === "wishlist"
            ? "bg-lime-500 text-white"
            : "text-gray-400 hover:bg-gray-300"
        }`}
        onClick={() => handleToggle("wishlist")}
      >
        Wishlist
      </button>
    </div>
  );
};

export default BooksToggle;
