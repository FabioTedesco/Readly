import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MyBooks from "@/pages/MyBooks";
import RootLayout from "./RootLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />, // Navbar/Footer qui dentro
    children: [
      { path: "/", element: <Home /> },
      { path: "/mybooks", element: <MyBooks /> },
    ],
  },
]);
