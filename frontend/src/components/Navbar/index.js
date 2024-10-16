import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaShoppingCart,
  FaHome,
} from "react-icons/fa";
import "./style.css";
import { AppContext } from "../../App";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, userName, setToken, cartItems } = useContext(AppContext);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "";
  }, [isDarkMode]);

  const logout = () => {
    localStorage.clear();
    setToken(null);
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      localStorage.setItem("darkMode", !prevMode);
      return !prevMode;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?team=${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className={`navbar ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="right-side">
        <NavLink to="/" className="icon-button">
          <FaHome />
        </NavLink>
        <div>
          {token ? (
            <div className="user-info">
              <span>{userName ? userName : "User"}</span>
              <button onClick={logout} className="icon-button">
                <FaSignOutAlt />
              </button>
              <NavLink to="/wishlist" className="icon-button">
                <FaHeart />
              </NavLink>
              <NavLink to="/cart" className="icon-button">
                <div className="cart-icon">
                  <FaShoppingCart />
                  {cartItems.length > 0 && (
                    <span className="cart-count">{cartItems.length}</span>
                  )}
                </div>
              </NavLink>
            </div>
          ) : (
            <NavLink to="/login" className="icon-button">
              <FaUser />
            </NavLink>
          )}
        </div>
      </div>

      <div className="logo">
        <h1>ForzaKits</h1>
      </div>

      <div className="right-side">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for a team..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>
        <button className="icon-button" onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
