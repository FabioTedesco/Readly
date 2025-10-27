import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BooksProvider } from "@/context/BooksContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
