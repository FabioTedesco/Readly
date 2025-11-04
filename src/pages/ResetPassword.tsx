import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/services/supabaseClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setMsg(
          "Il link di recupero non è valido o è scaduto. Richiedi di nuovo l'email. Verrai reindirizzato"
        );
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8)
      return setMsg("La password deve contentere almeno 8 caratteri");
    if (newPassword !== confirmPassword)
      return setMsg("Le password non coicidono");

    setLoading(true);
    setMsg(null);

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);

    if (error) {
      console.error("error:", error);
      setMsg(error.message);
    } else {
      setMsg("Password aggiornata con successo");

      logout();
      setTimeout(() => navigate("/login"), 1200);
    }
  };

  return (
    <div className="bg-[url('https://cdn.pixabay.com/photo/2021/10/14/13/50/book-6709160_1280.jpg')] bg-cover min-h-screen ">
      <div className="mx-auto border-2 border-border max-w-md p-4 rounded-2xl text-center relative top-50 bg-white opacity-85">
        <h1>Imposta nuova password</h1>

        <form className="flex flex-col items-center p-6" onSubmit={onSubmit}>
          <input
            type="password"
            placeholder="Nuova password"
            className="p-2 my-2 border-2 rounded-2xl min-w-sm"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Conferma nuova password"
            className="p-2 my-2 border-2 rounded-2xl min-w-sm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            disabled={loading}
            className="p-2 mt-5 border-2 rounded-2xl max-w-md bg-primary text-white hover: opacity-85"
          >
            {loading ? "Aggiornamento" : "Aggiorna Password"}
          </button>
          {msg && <p className="text-red-500 pt-5">{msg}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
