import React, { useState, useRef, useEffect } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search books"
      className="mx-auto flex w-full max-w-2xl items-center gap-2"
    >
      <input
        ref={inputRef}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cerca titolo, autore, ISBN…"
        className="
          h-11 w-full rounded-xl border border-border bg-card px-3
          text-base text-foreground placeholder:text-muted-foreground/70
          shadow-sm outline-none transition
          focus:border-primary/50 focus:ring-2 focus:ring-primary/40
        "
      />
      <button
        type="submit"
        className="
          inline-flex h-11 items-center justify-center rounded-xl
          bg-primary px-4 text-sm font-medium text-white shadow-sm
          transition hover:opacity-90
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
          disabled:opacity-50 cursor-pointer
        "
      >
        Search
      </button>
    </form>
  );
}
