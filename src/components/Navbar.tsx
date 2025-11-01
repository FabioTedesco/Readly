import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
export const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="sm:flex sm:flex-col sm:justify-between px-10 sm:w-2/6 md:w-1/6 py-4 bg-sidebar border-r-2 sm:min-h-screen overflow-x-auto">
      {/* Logo + Links */}
      <div className="flex justify-center sm:flex-col">
        <h1 className="text-4xl font-bold mb-10 hidden sm:block">
          <img src={logo} alt="Readly logo" />
        </h1>

        <Link to="/">
          <div className="px-4  sm:py-2 cursor-pointer sm:text-xl font-semibold mb-3">
            Home
          </div>
        </Link>

        <Link to="/mybooks">
          <div className="px-4  sm:py-2 cursor-pointer sm:text-xl font-semibold mb-3">
            MyBooks
          </div>
        </Link>

        <div
          onClick={logout}
          className="px-4  sm:py-2 cursor-pointer sm:text-xl font-semibold mb-3 text-red-500"
        >
          Sign Out
        </div>
      </div>
      <div className="hidden sm:block mt-auto text-xs text-muted-foreground border-t border-border pt-3 text-center">
        © {new Date().getFullYear()} Readly · Design & Code by Fabio Tedesco
      </div>
    </nav>
  );
};
