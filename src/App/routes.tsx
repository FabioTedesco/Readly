import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MyBooks from "@/pages/MyBooks";
import RootLayout from "./RootLayout";
import ProtectedRoute from "@/components/ProtectedRoutes";
import LoginPage from "@/pages/LoginPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />, // Navbar/Footer qui dentro
    children: [
      //rotta protetta

      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },

      //rotta protetta
      {
        path: "/mybooks",
        element: (
          <ProtectedRoute>
            <MyBooks />
          </ProtectedRoute>
        ),
      },

      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);
