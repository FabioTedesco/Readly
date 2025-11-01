import RatingStars from "./RatingStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import type { Book } from "@/types/book";
import StatusBadge from "./StatusBadge";

export default function BookCard({
  book,
  isRead,
  onRemove,
  onNoteChange,
  onMove,
}: {
  book: Book;
  isRead: boolean;
  onRemove: () => void;
  onNoteChange: (notes: string) => void;
  onMove: () => void;
}) {
  return (
    <div className="relative flex flex-col md:flex-row gap-4 rounded-xl border border-gray-200 bg-sidebar p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Pulsante rimuovi in alto a destra */}
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition cursor-pointer"
        aria-label="Remove book"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>

      {/* Cover */}
      <div className="flex-shrink-0 self-start">
        <img
          src={
            book.coverId
              ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
              : "https://cdn.pixabay.com/photo/2018/01/18/20/43/literature-3091212_1280.jpg"
          }
          alt={book.title}
          className="w-24 h-32 object-cover rounded-md shadow-sm bg-gray-100 flex items-center justify-center text-[10px] text-gray-400"
        />
      </div>

      {/* Contenuto testuale */}
      <div className="flex-1 flex flex-col gap-3">
        {/* Titolo + autore */}
        <div>
          <div className="text-base font-semibold text-gray-800 flex flex-wrap items-start gap-2 pr-8">
            <span>{book.title}</span>
            {book.author && (
              <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                {book.author}
              </span>
            )}
          </div>
        </div>

        {/* Rating utente (solo se è nella shelf "read") */}
        {isRead && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Your rating
            </span>
            <RatingStars book={book} />
            <span className="text-xs text-gray-500">
              {book.personalRating ?? 0}/5
            </span>
          </div>
        )}

        {/* Note personali (solo se è nella shelf "read") */}
        {isRead && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Notes
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 shadow-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[70px] resize-none"
              placeholder="Cosa ti è rimasto di questo libro? 🤔"
              defaultValue={book.notes ?? ""}
              onChange={(e) => onNoteChange(e.target.value)}
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
          <StatusBadge isRead={isRead} />
        </div>
        {!isRead && (
          <button
            className="absolute bottom-3 right-4 hover:opacity-80 transition border-2 rounded-xl p-3 bg-lime-400 cursor-pointer"
            onClick={onMove}
          >
            Sposta in MyShelf
          </button>
        )}
      </div>
    </div>
  );
}
