import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Help from "../Layouts/Help";
import FAQ from "../Pages/FAQ";
import Contact from "../Pages/Contact";
import NotFound from "../Pages/NotFound";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import CategoriesList from "../components/CategoryList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      {
        path: "help",
        element: <Help />,
        children: [
          { path: "faq", element: <FAQ /> },
          { path: "contact", element: <Contact /> },
        ],
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "categories", element: <CategoriesList /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
