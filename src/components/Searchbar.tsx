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
      className="flex w-full max-w-xl mx-auto gap-2"
      role="search"
      aria-label="Search books"
    >
      <input
        className="flex-1 border rounded-lg px-3 py-2"
        placeholder="Cerca titolo, autore, ISBN…"
        value={q}
        ref={inputRef}
        onChange={(e) => setQ(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
      >
        Search
      </button>
    </form>
  );
}
