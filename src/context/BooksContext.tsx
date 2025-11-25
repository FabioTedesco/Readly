import type { Book } from "@/types/book";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
  useReducer,
} from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/services/supabaseClient";
import { upsertUserBook, addPersonalRating } from "@/services/booksService";

type Shelf = "read" | "wishlist";

type ShelvesIndex = {
  read: Record<string, true>;
  wishlist: Record<string, true>;
};

type State = {
  booksByKey: Record<string, Book>;
  shelves: ShelvesIndex;
  toggleShelf: Shelf;
};

type Action =
  | { type: "HYDRATE"; state: State }
  | { type: "ADD"; shelf: Shelf; book: Book }
  | { type: "MOVE"; book: Book }
  | { type: "SET_RATING"; personalRating: number; book: Book }
  | { type: "SET_NOTES"; notes: string; book: Book }
  | { type: "REMOVE"; shelf: Shelf; key: string }
  | { type: "TOGGLE"; shelf: Shelf }
  | { type: "RESET" };

type BooksContextValue = {
  read: Book[];
  wishlist: Book[];
  toggleShelf: Shelf;

  //azioni
  add: (shelf: Shelf, book: Book) => void;
  remove: (shelf: Shelf, key: string) => void;
  move: (book: Book) => void;
  handleToggle: (shelf: Shelf) => void;
  addRating: (personaRating: number, book: Book) => void;
  addNotes: (notes: string, book: Book) => void;

  isInWishlist: (key: string) => boolean;
  isInRead: (key: string) => boolean;

  reset: () => void;
};

type UserBookRow = {
  id: string;
  user_id: string;
  book_key: string;
  shelf: Shelf;
  book_data: Book;
  personal_rating: number | null;
  notes: string | null;
};

type PersistedState = {
  booksByKey: Record<string, Book>;
  shelves: ShelvesIndex;
  toggleShelf?: Shelf;
  personalRating?: number;
  notes?: string;
};

const initState: State = {
  booksByKey: {},
  shelves: { wishlist: {}, read: {} },
  toggleShelf: "read",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATE": {
      return action.state;
    }

    case "ADD": {
      const { shelf, book } = action;

      const booksByKey = state.booksByKey[book.key]
        ? state.booksByKey
        : { ...state.booksByKey, [book.key]: book };

      if (state.shelves[shelf][book.key]) {
        return { ...state, booksByKey };
      }

      const shelves: ShelvesIndex = {
        ...state.shelves,
        [shelf]: { ...state.shelves[shelf], [book.key]: true },
      };

      return { ...state, booksByKey, shelves };
    }

    case "SET_RATING": {
      const { personalRating, book } = action;

      return {
        ...state,
        booksByKey: {
          ...state.booksByKey,
          [book.key]: {
            ...state.booksByKey[book.key],
            personalRating,
          },
        },
      };
    }

    case "MOVE": {
      const { book } = action;

      if (!state.shelves["wishlist"][book.key]) return state;

      const { [book.key]: _, ...rest } = state.shelves["wishlist"];

      const shelves: ShelvesIndex = {
        ...state.shelves,
        wishlist: rest,
        read: { ...state.shelves["read"], [book.key]: true },
      };

      return { ...state, shelves };
    }

    case "SET_NOTES": {
      const { notes, book } = action;

      return {
        ...state,
        booksByKey: {
          ...state.booksByKey,
          [book.key]: {
            ...state.booksByKey[book.key],
            notes,
          },
        },
      };
    }

    case "REMOVE": {
      const { shelf, key } = action;

      if (!state.shelves[shelf][key]) return state;

      const { [key]: _, ...rest } = state.shelves[shelf];
      const nextShelves: ShelvesIndex = { ...state.shelves, [shelf]: rest };

      const isStillUSed = !!(
        nextShelves.read[key] || nextShelves.wishlist[key]
      );

      const nextBooksByKey = isStillUSed
        ? state.booksByKey
        : (() => {
            const { [key]: _, ...restBooks } = state.booksByKey;
            return restBooks;
          })();

      return { ...state, shelves: nextShelves, booksByKey: nextBooksByKey };
    }

    case "TOGGLE": {
      return { ...state, toggleShelf: action.shelf };
    }

    case "RESET": {
      return initState;
    }

    default:
      return state;
  }
}

const BooksContext = createContext<BooksContextValue | undefined>(undefined);

export function BooksProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const userId = user?.id ?? null;

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_books")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const booksByKey: Record<string, Book> = {};
      const shelves: ShelvesIndex = { read: {}, wishlist: {} };
      const rows = (data ?? []) as UserBookRow[];

      rows.forEach((row) => {
        const book: Book = {
          ...row.book_data,
          personalRating: row.personal_rating ?? row.book_data.personalRating,
          notes: row.notes ?? row.book_data.notes,
        };

        booksByKey[row.book_key] = book;

        if (row.shelf === "read" || row.shelf === "wishlist") {
          shelves[row.shelf][row.book_key] = true;
        }
      });

      dispatch({
        type: "HYDRATE",
        state: {
          booksByKey,
          shelves,
          toggleShelf: "read",
        },
      });

      setLoading(false);
    };

    load();
  }, [userId]);

  const add = async (shelf: Shelf, book: Book) => {
    dispatch({ type: "ADD", shelf, book });

    if (!userId) return;

    try {
      upsertUserBook(userId, shelf, book);
    } catch (error) {
      console.error(error);
    }
  };

  const addRating = async (personalRating: number, book: Book) => {
    dispatch({ type: "SET_RATING", personalRating, book });

    if (!userId) return;

    try {
      addPersonalRating(userId, personalRating, book);
    } catch (error) {
      console.error(error);
    }
  };

  const addNotes = async (notes: string, book: Book) => {
    dispatch({ type: "SET_NOTES", notes, book });

    if (!userId) return;
  };

  const remove = async (shelf: Shelf, key: string) => {
    dispatch({ type: "REMOVE", shelf, key });

    if (!userId) return;

    const { error } = await supabase
      .from("user_books")
      .delete()
      .eq("user_id", userId)
      .eq("book_key", key);

    if (error) console.error("Errore supabase REMOVE", error);
  };

  const move = async (book: Book) => {
    dispatch({ type: "MOVE", book });

    if (!userId) return;

    const { error } = await supabase
      .from("user_books")
      .update({ shelf: "read" })
      .eq("user_id", userId)
      .eq("book_key", book.key);

    if (error) console.error("Errore supabase MOVE", error);
  };

  const handleToggle = (shelf: Shelf) => {
    dispatch({ type: "TOGGLE", shelf });
  };
  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const isInShelf = (shelf: Shelf, key: string) => !!state.shelves[shelf][key];
  const isInRead = (key: string) => isInShelf("read", key);
  const isInWishlist = (key: string) => isInShelf("wishlist", key);

  //trasforma oggetti in array per mostrarli:
  const read = useMemo(
    () =>
      Object.keys(state.shelves.read)
        .map((k) => state.booksByKey[k])
        .filter(Boolean),
    [state.shelves.read, state.booksByKey]
  );
  const wishlist = useMemo(
    () =>
      Object.keys(state.shelves.wishlist)
        .map((k) => state.booksByKey[k])
        .filter(Boolean),
    [state.shelves.wishlist, state.booksByKey]
  );

  const toggleShelf = state.toggleShelf;

  const value: BooksContextValue = {
    read,
    wishlist,
    toggleShelf,
    add,
    move,
    addRating,
    addNotes,
    remove,
    handleToggle,
    reset,

    isInRead,
    isInWishlist,
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
