import type { BookDetails, Book } from "@/types/book";
import { useBooks } from "@/context/BooksContext";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  bookDetails: BookDetails | null;
  cover: string;
  isRead: boolean;
  isWishlist: boolean;
  book: Book;
};

const BookDetailsModal = ({
  isOpen,
  onClose,
  bookDetails,
  cover,
  isRead,
  isWishlist,
  book,
}: Props) => {
  const { add } = useBooks();

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[999]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-[#F9FAFB] shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {bookDetails?.title}{" "}
            </h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              Close
            </button>
          </div>

          {/* Body */}
          <div className="p-5 grid grid-cols-1 md:grid-cols-[160px,1fr] gap-5">
            {/* Cover */}
            <div>
              <img
                src={cover}
                alt={bookDetails?.title}
                className="h-56 w-full md:w-40 object-cover rounded-xl border border-gray-200 shadow-sm"
              />
            </div>

            {/* Info */}
            <div className="space-y-4 ml-5">
              <div>
                <p className="text-sm text-gray-600">
                  Author:{" "}
                  <span className="font-bold">{bookDetails?.author}</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 leading-6 line-clamp-4">
                {bookDetails?.description ?? "No description avalaible"}
              </p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="flex justify-center gap-3 px-5 py-1 border-t border-gray-200">
            {isRead ? (
              <div className="flex p-4">
                <p className="w-full p-1.5 border-2 border-border bg-primary text-secondary rounded-sm font-medium transition  mb-2 text-center">
                  Already in MyBooks
                </p>
              </div>
            ) : isWishlist ? (
              <div className="flex p-4">
                <p className="w-full p-1.5 border-2 border-border bg-primary text-secondary rounded-sm font-medium transition  mb-2 text-center">
                  Already in Wishlist
                </p>
              </div>
            ) : (
              <div className="flex space-x-3 p-4">
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
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;
