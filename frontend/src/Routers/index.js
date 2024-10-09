import { createBrowserRouter } from 'react-router-dom';
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Help from "../Layouts/Help";
import FAQ from "../Pages/FAQ";
import Contact from "../Pages/Contact";
import NotFound from "../Pages/NotFound";
import { Children } from "react";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      {
        path: "help",
        element: <Help />,
        children: [
          { path: "faq", element: <FAQ /> },
          { path: "contact", element: <Contact /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
