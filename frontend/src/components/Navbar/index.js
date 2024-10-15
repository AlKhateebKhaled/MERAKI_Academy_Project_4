import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaSun,
  FaMoon,
  FaBars,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import "./style.css";
import { AppContext } from "../../App";

const Dropdown = ({ title, options, isOpen, toggle }) => (
  <div className="dropdown">
    <div
      className="dropdown-toggle"
      onClick={toggle}
      aria-haspopup="true"
      aria-expanded={isOpen}
    >
      {title}
    </div>
    {isOpen && (
      <div className="dropdown-list">
        {options.map((option) => (
          <NavLink
            key={option.label}
            to={option.path}
            activeClassName="active"
            onClick={() => {
              toggle(); 
            }}
          >
            {option.label}
          </NavLink>
        ))}
      </div>
    )}
  </div>
);

const Navbar = () => {
  const { token, userName, setToken } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({});

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const logout = () => {
    setToken(null);
  };

  const categoriesData = {
    Leagues: [
      { label: "Serie A", path: "/categories/serie-a" },
      { label: "La Liga", path: "/categories/la-liga" },
      { label: "Premier League", path: "/categories/premier-league" },
      { label: "Bundesliga", path: "/categories/bundesliga" },
    ],
    Brands: [
      { label: "Nike", path: "/brands/nike" },
      { label: "Adidas", path: "/brands/adidas" },
      { label: "Puma", path: "/brands/puma" },
      { label: "Kappa", path: "/brands/kappa" },
      { label: "New Balance", path: "/brands/new-balance" },
    ],
    Seasons: [
      { label: "22-23", path: "/seasons/22-23" },
      { label: "23-24", path: "/seasons/23-24" },
      { label: "24-25", path: "/seasons/24-25" },
    ],
    Types: [
      { label: "Home", path: "/types/home" },
      { label: "Away", path: "/types/away" },
      { label: "Third", path: "/types/third" },
      { label: "GK", path: "/types/gk" },
    ],
  };

  return (
    <nav className={`navbar ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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

        <Dropdown
          title="Login / Register"
          options={[
            { label: "Login", path: "/login" },
            { label: "Register", path: "/register" },
          ]}
          isOpen={isDropdownOpen.loginRegister}
          toggle={() => toggleDropdown("loginRegister")}
        />

        <NavLink
          to="/wishlist"
          activeClassName="active"
          onClick={() => setIsMenuOpen(false)}
        >
          WishList
        </NavLink>

        <Dropdown
          title="Currency"
          options={[
            { label: "Jordanian Dinar", path: "/currency/jd" },
            { label: "Dollar", path: "/currency/usd" },
          ]}
          isOpen={isDropdownOpen.currency}
          toggle={() => toggleDropdown("currency")}
        />

        <Dropdown
          title="Categories"
          options={[
            <Dropdown
              key="leagues"
              title="Leagues"
              options={categoriesData.Leagues}
              isOpen={isDropdownOpen.leagues}
              toggle={() => toggleDropdown("leagues")}
            />,
            <Dropdown
              key="brands"
              title="Brands"
              options={categoriesData.Brands}
              isOpen={isDropdownOpen.brands}
              toggle={() => toggleDropdown("brands")}
            />,
            <Dropdown
              key="seasons"
              title="Seasons"
              options={categoriesData.Seasons}
              isOpen={isDropdownOpen.seasons}
              toggle={() => toggleDropdown("seasons")}
            />,
            <Dropdown
              key="types"
              title="Types"
              options={categoriesData.Types}
              isOpen={isDropdownOpen.types}
              toggle={() => toggleDropdown("types")}
            />,
          ]}
          isOpen={isDropdownOpen.categories}
          toggle={() => toggleDropdown("categories")}
        />
      </div>

      <div className="logo">
        <h1>ForzaKits</h1>
      </div>

      <div className="right-side">
        {token ? (
          <div className="user-info">
            <span>{userName ? userName : "User"}</span>
            <button onClick={logout} className="icon-button">
              <FaSignOutAlt />
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="icon-button">
            <FaUser />
          </NavLink>
        )}

        <NavLink to="/wishlist" className="icon-button">
          <FaHeart />
        </NavLink>

        <NavLink to="/" className="icon-button">
          <FaHome />
        </NavLink>

        <button className="search-button">
          <FaSearch />
        </button>

        <button className="icon-button" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
