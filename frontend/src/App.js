import "./App.css";
import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routers";
import { createContext } from "react";
import LoadingSpinner from "./components/Spinner";
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
  const [isLoading, setIsLoading] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [shownProducts, setShownProducts] = useState(151);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const updateCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (i) => i.productId === item.productId
    );
    if (existingItemIndex !== -1) {
      const newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity += item.quantity;
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: item.quantity }]);
    }

    setCartCount(cartItems.length + 1);
  };

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
        cartItems,
        setCartItems,
        updateCart,
        cartCount,
        setCartCount,
        searchTerm,
        setSearchTerm,
      }}
    >
      {isLoading && <LoadingSpinner />}

      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
