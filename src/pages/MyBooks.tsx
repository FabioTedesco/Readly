import BooksTable from "@/components/BooksTable";
import BooksToggle from "@/components/BooksToggle";
import { useState } from "react";

const MyBooks = () => {
  return (
    <>
      <BooksToggle />
      <BooksTable />
    </>
  );
};

export default MyBooks;
