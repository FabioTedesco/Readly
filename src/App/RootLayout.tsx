import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BooksProvider } from "@/context/BooksContext";

const RootLayout = () => {
  return (
    <BooksProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50">
          <div className="p-6 text-center text-gray-700">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </BooksProvider>
  );
};

export default RootLayout;
