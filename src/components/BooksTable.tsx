import type { Book } from "@/types/book";
import { useBooks } from "@/context/BooksContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
            <th className="px-4 py-2 text-sm font-semibold text-gray-600">
              Rating ⭐
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-600">
              Notes 📝
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {wishlist.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-400 italic">
                No books found.
              </td>
            </tr>
          ) : (
            chooseShelf.map((chooseShelf: Book) => (
              <tr
                key={chooseShelf.key}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">
                  <img
                    src={
                      chooseShelf.coverId
                        ? `https://covers.openlibrary.org/b/id/${chooseShelf.coverId}-S.jpg`
                        : "no img"
                    }
                    alt={chooseShelf.title}
                    className="w-12 h-16 object-cover rounded-md shadow-sm"
                  />
                </td>

                <td className="px-4 py-2 text-sm font-medium text-gray-800">
                  {chooseShelf.title}
                </td>

                <td className="px-4 py-2 text-sm text-gray-600">
                  {chooseShelf.author || "Unknown"}
                </td>

                <td className="px-4 py-2 text-sm text-gray-600">
                  {/* {chooseShelf.rating ? `${chooseShelf.rating}/5` : "—"} */}
                  aggiungi rating
                </td>

                <td className="px-4 py-2 text-sm text-gray-600">
                  {chooseShelf.notes || "—"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  <div onClick={() => remove(toggleShelf, chooseShelf.key)}>
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
