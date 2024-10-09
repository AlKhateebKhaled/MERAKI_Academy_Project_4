import { NavLink, Outlet } from "react-router-dom";

export default function Help() {
  return (
    <div className="help-layout">
      <h2>Website Help</h2>
      <p>
        If you have questions or need assistance, you've come to the right
        place! Browse through our resources below to find what you need.
      </p>

      <nav className="help-nav">
        <NavLink className="help-nav-link" to="faq">
          View the FAQ
        </NavLink>
        <NavLink className="help-nav-link" to="contact">
          Contact Us
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
