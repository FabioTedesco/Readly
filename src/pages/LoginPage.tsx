import ForgotPassword from "@/components/ForgotPassword";
import { useAuth } from "@/context/AuthContext";
import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, signup, user, loading } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-muted-foreground">
        caricamento stato utente...
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const { error } =
      mode === "login"
        ? await login(email, password)
        : await signup(email, password);
    if (error) setErrorMsg(error);
  };

  return (
    <main className="flex min-h-screen items-center justify-center  bg-[url('https://cdn.pixabay.com/photo/2021/10/14/13/50/book-6709160_1280.jpg')] bg-cover text-foreground px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card opacity-85 p-8 shadow-md">
        {/* Titolo */}
        <h1 className="text-center text-2xl font-semibold tracking-tight mb-6">
          {mode === "login" ? "Accedi a Readly" : "Crea il tuo account"}
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">
              Email
            </label>
            <input
              className="
                w-full h-11 rounded-xl border border-border bg-card px-3
                text-sm text-foreground placeholder:text-muted-foreground/70
                shadow-sm transition focus:border-primary/50 focus:ring-2 focus:ring-primary/40
              "
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-1">
              Password
            </label>
            <input
              className="
                w-full h-11 rounded-xl border border-border bg-card px-3
                text-sm text-foreground placeholder:text-muted-foreground/70
                shadow-sm transition focus:border-primary/50 focus:ring-2 focus:ring-primary/40
              "
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {errMsg && (
            <p className="text-destructive text-sm text-center">{errMsg}</p>
          )}

          <button
            type="submit"
            className="
              w-full h-11 rounded-xl bg-primary text-white text-sm font-medium shadow-sm
              transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer
            "
          >
            {mode === "login" ? "Accedi" : "Registrati"}
          </button>
        </form>

        {/* Switch login/signup */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          {mode === "login" ? (
            <>
              Non hai un account?{" "}
              <button
                className="text-primary hover:underline cursor-pointer"
                onClick={() => setMode("signup")}
              >
                Registrati
              </button>
            </>
          ) : (
            <>
              Hai già un account?{" "}
              <button
                className="text-primary hover:underline cursor-pointer"
                onClick={() => setMode("login")}
              >
                Accedi
              </button>
            </>
          )}
          <>
            <div className="flex justify-center">
              <p> Password dimenticata? </p>
              <button
                className="text-primary  hover:underline cursor-pointer"
                onClick={() => setForgotPassword(true)}
              >
                Recupera
              </button>
            </div>
          </>
        </div>
      </div>
      {forgotPassword && (
        <ForgotPassword setForgotPassword={setForgotPassword} />
      )}
    </main>
  );
};

export default LoginPage;
