import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { logout } = useAuth();
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-indigo-600 text-white shadow-sm">
      {/* Logo / Brand */}
      <div className="text-2xl font-semibold tracking-wide">
        <Link to={"/"}>Readly</Link>
      </div>

      {/* Right-side buttons */}
      <div className="flex items-center gap-4">
        <Link to="/mybooks">
          <div className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 transition">
            MyBooks
          </div>
        </Link>

        <div
          onClick={logout}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 transition cursor-pointer"
        >
          Sign Out
        </div>
      </div>
    </nav>
  );
};
