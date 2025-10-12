import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar in alto */}
      <Navbar />
      {/* Contenuto principale */}
      <main className="flex-grow bg-gray-50">
        <div className="p-6 text-center text-gray-700">
          <RouterProvider router={router} />
        </div>
      </main>

      {/* Footer in basso */}
      <Footer />
    </div>
  );
}
