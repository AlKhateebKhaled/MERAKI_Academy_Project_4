import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Main() {
  return (
    <div className="root-Layout">
      <header>
        <Navbar />
      </header>
        <main>
          <Outlet />
        </main>
    </div>
  );
}