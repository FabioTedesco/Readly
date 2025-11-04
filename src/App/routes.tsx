import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MyBooks from "@/pages/MyBooks";
import RootLayout from "./RootLayout";
import ProtectedRoute from "@/components/ProtectedRoutes";
import LoginPage from "@/pages/LoginPage";
import ResetPassword from "@/pages/ResetPassword";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
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
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);
