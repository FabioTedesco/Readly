import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { BooksProvider } from "@/context/BooksContext";

const RootLayout = () => {
  return (
    <div className="sm:flex">
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        {/* BooksProvider solo per le pagine “app” */}
        <BooksProvider>
          <Outlet />
        </BooksProvider>
      </main>
    </div>
  );
};

export default RootLayout;
