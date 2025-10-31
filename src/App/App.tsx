import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
