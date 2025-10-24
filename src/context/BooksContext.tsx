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
  | { type: "ADD"; shelf: Shelf; book: Book }
  | { type: "SET_RATING"; personalRating: number; book: Book }
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
  handleToggle: (shelf: Shelf) => void;
  addRating: (personaRating: number, book: Book) => void;

  isInWishlist: (key: string) => boolean;
  isInRead: (key: string) => boolean;

  reset: () => void;
};

const STORAGE_KEY = "readly-state-v1";

type PersistedState = {
  booksByKey: Record<string, Book>;
  shelves: ShelvesIndex;
  toggleShelf?: Shelf;
  personalRating?: number;
};

const initState: State = {
  booksByKey: {},
  shelves: { wishlist: {}, read: {} },
  toggleShelf: "read",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
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

function initFromStorage(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initState;

    const persisted = JSON.parse(raw) as PersistedState;

    return {
      booksByKey: persisted.booksByKey ?? {},
      shelves: persisted.shelves ?? { wishlist: {}, read: {} },
      toggleShelf: persisted.toggleShelf ?? "read",
    };
  } catch (error) {
    console.error(error);
    return initState;
  }
}

const BooksContext = createContext<BooksContextValue | undefined>(undefined);

export function BooksProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    reducer,
    undefined as unknown as State,
    initFromStorage
  );

  const add = (shelf: Shelf, book: Book) => {
    dispatch({ type: "ADD", shelf, book });
  };
  const addRating = (personalRating: number, book: Book) => {
    dispatch({ type: "SET_RATING", personalRating, book });
  };
  const remove = (shelf: Shelf, key: string) => {
    dispatch({ type: "REMOVE", shelf, key });
  };
  const handleToggle = (shelf: Shelf) => {
    dispatch({ type: "TOGGLE", shelf });
  };
  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: "RESET" });
  };

  const isInShelf = (shelf: Shelf, key: string) => !!state.shelves[shelf][key];
  const isInRead = (key: string) => isInShelf("read", key);
  const isInWishlist = (key: string) => isInShelf("wishlist", key);

  useEffect(() => {
    const snapshot: PersistedState = {
      booksByKey: state.booksByKey,
      shelves: state.shelves,
      toggleShelf: state.toggleShelf,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }, [state.booksByKey, state.shelves, state.toggleShelf]);

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
    addRating,
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
