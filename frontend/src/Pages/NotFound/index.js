import { NavLink } from "react-router-dom";
export default function NotFound() {
  return (
    <div>
      <h2>Page not found</h2>
      <p>
        nnnnnn nn n n nnnn n n n n n nnnnn n n n nnnn n n nnn n nn n n n n n n n
        n nnnnnn n n n nn n n n nnnnn{" "}
      </p>

      <p>
        {" "}
        Go to the <NavLink to="/">HomePage</NavLink>
      </p>
    </div>
  );
}
