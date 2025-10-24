import type { Book } from "@/types/book";
import { useBooks } from "@/context/BooksContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import RatingStars from "./RatingStars";

export default function BooksTable() {
  const { read, wishlist, toggleShelf, remove } = useBooks();
  const chooseShelf = toggleShelf === "read" ? read : wishlist;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-sm font-semibold text-gray-600">
              Cover
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-600">
              Title
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-600">
              Author
            </th>
            {toggleShelf === "read" && (
              <>
                <th className="px-4 py-2 text-sm font-semibold text-gray-600">
                  Rating ⭐
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-600">
                  Notes 📝
                </th>
              </>
            )}

            <th className="px-4 py-2 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {chooseShelf.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-400 italic">
                No books found.
              </td>
            </tr>
          ) : (
            chooseShelf.map((book: Book) => (
              <tr
                key={book.key}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">
                  <img
                    src={
                      book.coverId
                        ? `https://covers.openlibrary.org/b/id/${book.coverId}-S.jpg`
                        : "no img"
                    }
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded-md shadow-sm"
                  />
                </td>

                <td className="px-4 py-2 text-sm font-medium text-gray-800">
                  {book.title}
                </td>

                <td className="px-4 py-2 text-sm text-gray-600">
                  {book.author || "Unknown"}
                </td>

                {toggleShelf === "read" && (
                  <>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      <RatingStars book={book} />
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {/* {book.notes || "—"} */}
                      <input type="text" placeholder="inserisci note" />
                    </td>
                  </>
                )}

                <td className="px-4 py-2 text-sm text-gray-600">
                  <div onClick={() => remove(toggleShelf, book.key)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
