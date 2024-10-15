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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [userName, setUserName] = useState(null);

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
        isSubmitting,
        setIsSubmitting,
        inWishlist,
        setInWishlist,
        userName,
        setUserName,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
