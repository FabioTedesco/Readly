import type { Book } from "@/types/book";
import { useState } from "react";
import { useBooks } from "@/context/BooksContext";

type StarRatingProps = {
  value?: number;
  max?: number;
  book: Book;
};

export default function RatingStars({ max = 5, book }: StarRatingProps) {
  const { addRating } = useBooks();
  console.log(book);

  const [hovered, setHovered] = useState<number | null>(null);

  const handleClick = (newValue: number) => {
    addRating(newValue, book);
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;

        // se sto hoverando, usa hovered
        // se no, usa rating salvato
        const active =
          hovered !== null
            ? starValue <= hovered
            : starValue <= (book.personalRating ?? 0);

        return (
          <button
            key={starValue}
            type="button"
            className="p-0.5"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(null)}
            aria-label={`Set rating to ${starValue}`}
          >
            <StarIcon
              filled={active}
              className={`w-6 h-6 transition-colors ${
                active ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

// Icona stella (inline SVG)
function StarIcon({
  filled,
  className,
}: {
  filled: boolean;
  className?: string;
}) {
  // versione piena vs contorno
  if (filled) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
      >
        <path d="M11.48 3.499a.75.75 0 011.04 0l2.598 2.55 3.53.513a.75.75 0 01.416 1.279l-2.557 2.49.604 3.52a.75.75 0 01-1.088.791L12 13.97l-3.023 1.57a.75.75 0 01-1.088-.79l.604-3.521-2.557-2.49a.75.75 0 01.416-1.28l3.53-.513 2.598-2.55z" />
      </svg>
    );
  }

  // vuota (solo contorno)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.75.75 0 011.04 0l2.598 2.55 3.53.513a.75.75 0 01.416 1.279l-2.557 2.49.604 3.52a.75.75 0 01-1.088.791L12 13.97l-3.023 1.57a.75.75 0 01-1.088-.79l.604-3.521-2.557-2.49a.75.75 0 01.416-1.28l3.53-.513 2.598-2.55z"
      />
    </svg>
  );
}
