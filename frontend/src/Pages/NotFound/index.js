import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./style.css"; 

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">We can't seem to find the page</h2>
        <p className="not-found-text">
          The page you're looking for doesn't exist or has been moved. Don’t
          worry, we've got plenty of other things for you to check out!
        </p>

        <NavLink to="/" className="not-found-home-button">
          <FaHome className="home-icon" /> Back to Home
        </NavLink>
      </div>
    </div>
  );
}
