import { supabase } from "./supabaseClient";
import type { Book, Shelf } from "@/types/book";

export async function upsertUserBook(userId: string, shelf: Shelf, book: Book) {
  const { error } = await supabase.from("user_books").upsert(
    {
      user_id: userId,
      book_key: book.key,
      shelf,
      book_data: book,
      personal_rating: book.personalRating ?? null,
      notes: book.notes ?? null,
    },
    { onConflict: "user_id,book_key" }
  );

  if (error) {
    throw error;
  }
}

export async function addPersonalRating(
  userId: string,
  personalRating: number,
  book: Book
) {
  const { error } = await supabase
    .from("user_books")
    .update({ personal_rating: personalRating })
    .eq("user_id", userId)
    .eq("book_key", book.key);

  if (error) console.error("Errore supabase SET_RATING", error);
}

export async function addPersonalNotes(
  userId: string,
  notes: string,
  book: Book
) {
  const { error } = await supabase
    .from("user_books")
    .update({ notes })
    .eq("user_id", userId)
    .eq("book_key", book.key);

  if (error) console.error("Errore supabase SET_NOTES", error);
}
