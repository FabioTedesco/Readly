import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";

export default function App() {
  return <RouterProvider router={router} />;
}
