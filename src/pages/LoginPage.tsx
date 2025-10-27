import { useAuth } from "@/context/AuthContext";
import { useState, type FormEvent } from "react";
import { supabase } from "@/services/supabaseClient";
import { Link, Navigate } from "react-router-dom";

const LoginPage = () => {
  const { login, signup, user, loading, logout } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrorMsg] = useState("");

  if (loading) {
    return (
      <p className="p-4 text-center text-gray-500">
        caricamento stato utente...
      </p>
    );
  }

  if (user) {
    // return (
    //   <div className="max-w-sm mx-auto p-4 bg-white rounded shadow text-center">
    //     <p className="text-gray-700 mb-2">Ciao {user.email}</p>
    //     <button
    //       onClick={logout}
    //       className="px-4 py-2 bg-red-500 text-white rounded shadow"
    //     >
    //       Logout
    //     </button>
    //   </div>
    // );
    return <Navigate to={"/"} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (mode === "login") {
      const { error } = await login(email, password);
      if (error) setErrorMsg(error);
    } else {
      const { error } = await signup(email, password);
      if (error) setErrorMsg(error);
      console.log("click");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center ">
        {mode === "login" ? "Accedi" : "Crea account"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {errMsg && <p className="text-red-600 text-sm">{errMsg}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded py-2 text-sm font-medium shadow cursor-pointer"
        >
          {mode === "login" ? "Accedi" : "Registrati"}
        </button>
      </form>

      <div className="text-center mt-4 text-sm text-gray-600 cursor-pointer">
        {mode === "login" ? (
          <>
            Non hai un account?{" "}
            <button
              className="text-blue-600 underline cursor-pointer"
              onClick={() => setMode("signup")}
            >
              Registrati
            </button>
          </>
        ) : (
          <>
            Hai già un account?{" "}
            <button
              className="text-blue-600 underline cursor-pointer"
              onClick={() => setMode("login")}
            >
              Accedi
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
