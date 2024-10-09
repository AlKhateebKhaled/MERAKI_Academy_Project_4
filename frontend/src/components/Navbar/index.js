import { NavLink } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Football Shirts</h1>
      <div className="nav-links">
        <NavLink to="/" >
          Home
        </NavLink>
        <NavLink to="/shop" >
          Shop
        </NavLink>
        <NavLink to="/about" >
          About Us
        </NavLink>
        <NavLink to="/help" >
          Help Center
        </NavLink>
        <NavLink to="/contact" >
          Contact Us
        </NavLink>
        <NavLink to="/cart" >
          Cart
        </NavLink>
        <NavLink to="/login" >
          Login/Register
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
