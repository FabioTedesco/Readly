import BackToTop from "@/components/BackToTop";
import BooksTable from "@/components/BooksTable";
import BooksToggle from "@/components/BooksToggle";
import { useState } from "react";

const MyBooks = () => {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight ml-5 py-4">My Books</h1>
      <div className="mx-10">
        <BooksToggle />
      </div>
      <BooksTable />
      <BackToTop />
    </>
  );
};

export default MyBooks;
