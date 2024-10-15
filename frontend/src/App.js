import "./App.css";
import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routers";
import { createContext } from "react";
export const AppContext = createContext();
function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const [msg, setMsg] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [shownProducts, setShownProducts] = useState(151);

  return (
    <AppContext.Provider
      value={{
        formData,
        setFormData,
        msg,
        setMsg,
        token,
        setToken,
        selectedFilter,
        setSelectedFilter,
        inWishlist,
        setInWishlist,
        userName,
        setUserName,
        isLoading,
        setIsLoading,
        product,
        setProduct,
        error,
        setError,
        alert,
        setAlert,
        shownProducts,
        setShownProducts,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
