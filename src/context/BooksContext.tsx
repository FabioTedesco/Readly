import type { Book } from "@/types/book";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Shelf = "read" | "wishlist";

type ShelvesIndex = {
  read: Record<string, true>;
  wishlist: Record<string, true>;
};

type BooksContextValue = {
  read: Book[];
  wishlist: Book[];
  toggleShelf: Shelf;

  //azioni
  add: (shelf: Shelf, book: Book) => void;
  remove: (shelf: Shelf, key: string) => void;
  handleToggle: (shelf: Shelf) => void;

  isInWishlist: (shelf: Shelf, book: Book[]) => boolean;
  isInRead: (shelf: Shelf, book: Book[]) => boolean;

  reset: () => void;
};

const STORAGE_KEY = "readly-state";

type PersistedState = {
  booksByKey: Record<string, Book>;
  shelves: ShelvesIndex;
};

const BooksContext = createContext<BooksContextValue | undefined>(undefined);

export function BooksProvider({ children }: { children: ReactNode }) {
  const [booksByKey, setBooksByKey] = useState<Record<string, Book>>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PersistedState).booksByKey : {};
  });
  const [shelves, setShelves] = useState<ShelvesIndex>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw
      ? (JSON.parse(raw) as PersistedState).shelves
      : { wishlist: {}, read: {} };
  });
  const [toggleShelf, setToggleShelf] = useState<Shelf>("read");

  // --- persistenza
  useEffect(() => {
    const snapshot: PersistedState = { booksByKey, shelves };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }, [booksByKey, shelves]);

  const add = (shelf: Shelf, book: Book) => {
    setBooksByKey((prev) =>
      prev[book.key] ? prev : { ...prev, [book.key]: book }
    );
    setShelves((prev) => {
      if (prev[shelf][book.key]) return prev;
      return { ...prev, [shelf]: { ...prev[shelf], [book.key]: true } };
    });

    console.log(shelves, booksByKey);
  };

  const remove = (shelf: Shelf, key: string) => {
    setShelves((prev) => {
      if (!prev[shelf][key]) return prev;
      const { [key]: _, ...rest } = prev[shelf];
      const next = { ...prev, [shelf]: rest };

      const stillUSed = (s: ShelvesIndex) => !!(s.read[key] || s.wishlist[key]);
      if (!stillUSed(next)) {
        setBooksByKey((b) => {
          const { [key]: _, ...restBooks } = b;
          return restBooks;
        });
      }
      return next;
    });
  };

  const handleToggle = (shelf: Shelf) => {
    setToggleShelf(shelf);
  };

  const reset = () => {
    setBooksByKey({});
    setShelves({ read: {}, wishlist: {} });
  };

  const isInShelf = (shelf: Shelf, key: string) => !!shelves[shelf][key];
  const isInRead = (key: string) => isInShelf("read", key);
  const isInWishlist = (key: string) => isInShelf("wishlist", key);

  //trasforma oggetti in array per mostrarli:

  const read = useMemo(
    () =>
      Object.keys(shelves.read)
        .map((k) => booksByKey[k])
        .filter(Boolean),
    [shelves.read, booksByKey]
  );
  const wishlist = useMemo(
    () =>
      Object.keys(shelves.wishlist)
        .map((k) => booksByKey[k])
        .filter(Boolean),
    [shelves.wishlist, booksByKey]
  );

  const value: BooksContextValue = {
    wishlist,
    read,
    toggleShelf,
    add,
    remove,
    handleToggle,
    isInWishlist,
    isInRead,
    reset,
  };

  return (
    <BooksContext.Provider value={value}> {children} </BooksContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BooksContext);
  if (!context)
    throw new Error("useBooks deve essere usato dentro <BooksProvider/>");
  return context;
}
