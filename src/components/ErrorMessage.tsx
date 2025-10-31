import React from "react";

type ErrorMessageProps = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center shadow-sm">
      <p className="text-destructive font-medium">
        {message || "Si è verificato un errore inatteso 😕"}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="
            mt-4 inline-flex items-center justify-center rounded-lg
            bg-primary px-4 py-2 text-white text-sm font-medium shadow-sm
            transition hover:opacity-90 focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-primary/40
          "
        >
          Riprova
        </button>
      )}
    </div>
  );
}
