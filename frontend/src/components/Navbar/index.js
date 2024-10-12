import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaSun,
  FaMoon,
  FaBars,
  FaHome,
} from "react-icons/fa";
import "./style.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isLogInListOpen, setIsLogInListOpen] = useState(false);
  const [isCurrencyListOpen, setIsCurrencyListOpen] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsCategoriesOpen(false);
    setIsLogInListOpen(false);
    setIsCurrencyListOpen(false);
  };
  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
    setIsLogInListOpen(false);
    setIsCurrencyListOpen(false);
  };
  const toggleisLogInListOpen = () => {
    setIsLogInListOpen(!isLogInListOpen);
    setIsCategoriesOpen(false);
    setIsCurrencyListOpen(false);
  };
  const toggleCurrencyListOpen = () => {
    setIsCurrencyListOpen(!isCurrencyListOpen);
    setIsCategoriesOpen(false);
    setIsLogInListOpen(false);
  };

  return (
    <nav className={`navbar ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        <FaBars />
      </div>

      <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <NavLink
          exact
          to="/"
          activeClassName="active"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </NavLink>

        <div className="dropdown">
          <div className="dropdown-toggle" onClick={toggleCategories}>
            Categories
          </div>
          {isCategoriesOpen && (
            <div className="dropdown-list">
              <NavLink
                to="/categories/serie"
                activeClassName="active"
                onClick={() => setIsMenuOpen(false)}
              >
                Serie A
              </NavLink>
              <NavLink
                to="/categories/liga"
                activeClassName="active"
                onClick={() => setIsMenuOpen(false)}
              >
                La Liga
              </NavLink>
              <NavLink
                to="/categories/premier"
                activeClassName="active"
                onClick={() => setIsMenuOpen(false)}
              >
                Premier League
              </NavLink>
              <NavLink
                to="/categories/bundesliga"
                activeClassName="active"
                onClick={() => setIsMenuOpen(false)}
              >
                Bundesliga
              </NavLink>
            </div>
          )}
        </div>
        <div className="dropdown">
          <div className="dropdown-toggle" onClick={toggleisLogInListOpen}>
            Login / Register
          </div>
          {isLogInListOpen && (
            <div className="dropdown-list">
              <NavLink
                to="/login"
                activeClassName="active"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                activeClassName="active"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
        <NavLink
          to="/wishlist"
          activeClassName="active"
          onClick={() => setIsMenuOpen(false)}
        >
          WishList
        </NavLink>
        <div className="dropdown">
          <div className="dropdown-toggle" onClick={toggleCurrencyListOpen}>
            Currency
          </div>
          {isCurrencyListOpen && (
            <div className="dropdown-list">
              <NavLink
                to="/currency/jd"
                activeClassName="active"
                onClick={() => setIsMenuOpen(false)}
              >
                Jordanian Dinar
              </NavLink>
              <NavLink
                to="/currency/usd"
                activeClassName="active"
                onClick={() => setIsMenuOpen(false)}
              >
                Dollar
              </NavLink>
            </div>
          )}
        </div>
      </div>

      <div className="logo">
        <h>ForzaKits</h>
      </div>

      <div className="right-side">
        <NavLink to="/" className="icon-button">
          <FaHome />
        </NavLink>
        <button className="search-button">
          <FaSearch />
        </button>

        <NavLink to="/login" className="icon-button">
          <FaUser />
        </NavLink>
        <NavLink to="/wishlist" className="icon-button">
          <FaHeart />
        </NavLink>
        <button className="icon-button" onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
