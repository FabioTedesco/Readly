import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
export const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="flex flex-col justify-between px-10 w-1/6 py-4 bg-sidebar border-r-2 min-h-screen">
      {/* Logo + Links */}
      <div>
        <h1 className="text-4xl font-bold mb-10">
          <img src={logo} alt="Readly logo" />
        </h1>

        <Link to="/">
          <div className="px-4 py-2 cursor-pointer text-xl font-semibold mb-3">
            Home
          </div>
        </Link>

        <Link to="/mybooks">
          <div className="px-4 py-2 cursor-pointer text-xl font-semibold mb-3">
            MyBooks
          </div>
        </Link>

        <div
          onClick={logout}
          className="px-4 py-2 cursor-pointer text-xl font-semibold mb-3 text-red-500"
        >
          Sign Out
        </div>
      </div>
      <div className="mt-auto text-xs text-muted-foreground border-t border-border pt-3 text-center">
        © {new Date().getFullYear()} Readly · Design & Code by Fabio Tedesco
      </div>
    </nav>
  );
};
