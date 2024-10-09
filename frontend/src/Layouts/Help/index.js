import { NavLink, Outlet } from "react-router-dom";

export default function HelpLayout() {
  return (
    <div className="help-layout">
      <h2>Website Help</h2>
      <p>
        {" "}
        nnnn nnnn nnn nn nnnnnnnn nn nnnn nnn n nnnnnn nnnn n nn n nnnnn nn n
        nnnnnnnn n nn n n nnnn n nnnn nn n
      </p>

      <nav>
        <NavLink to="faq">view the FAQ </NavLink>
        <NavLink to="contact"> contact us </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
