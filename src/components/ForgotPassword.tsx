import { useAuth } from "@/context/AuthContext";
import type { FormEvent } from "react";
import { useState } from "react";

type Props = {
  setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

const ForgotPassword = ({ setForgotPassword }: Props) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState<string>("");

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    resetPassword(email);
    setForgotPassword(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        <form className="flex space-x-2" onSubmit={handleOnSubmit}>
          <input
            placeholder="Inserisci la tua email"
            className="
                w-full rounded-xl border border-border bg-card px-3
                text-sm text-foreground placeholder:text-muted-foreground/70
                shadow-sm transition focus:border-primary/50 focus:ring-2 focus:ring-primary/40
              "
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="
             p-4 rounded-xl bg-primary text-white text-sm font-medium shadow-sm
              transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer
            "
          >
            Conferma
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
