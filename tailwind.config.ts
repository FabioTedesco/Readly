/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // oppure "./app/**/*.{ts,tsx}" se usi Next 13+
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        card: "#FFFFFF",
        border: "#E5E5E5",
        foreground: "#111827",
        "muted-foreground": "#6B7280",
        sidebar: "#F9FAFB",
        primary: "#2563EB",
        "primary-hover": "#1E40AF",
        secondary: "#D1D5DB",
        accent: "#F3F4F6",
        success: "#16A34A",
        destructive: "#DC2626",
      },
      backgroundImage: {
        "login-bg":
          "url('https://cdn.pixabay.com/photo/2021/10/14/13/50/book-6709160_1280.jpg)",
        "radial-yellow-sky":
          "radial-gradient(circle at center, lightyellow 0%, skyblue 100%)",
      },
    },
  },
  plugins: [],
};
