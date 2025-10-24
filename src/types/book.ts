export type Book = {
  shelf: Shelf;
  key: string;
  title: string;
  author: string;
  coverId: string;
  personalRating?: number;
  notes?: string;
};

export type Shelf = "Read" | "WishList";
