import { NavLink } from "react-router-dom";
import { LogIn } from "lucide-react";
function Navbar() {
  return (
    <nav className="flex fixed top-0 left-0 w-full h-16 bg-transparent z-50 px-8 py-4 justify-between items-center pr-18">
      <NavLink to="/" className="text-2xl font-light flex items-center">
        <div className="w-24 p-6 -mr-5">
          <img
            src="../../public/6f746b46-3f6a-433c-9258-1167b211a14d_removalai_preview.png"
            alt=""
          />
        </div>
        <p className="font-normal">Daleel</p>
      </NavLink>
      <div>
        <ul className="flex gap-10 justify-evenly items-center">
          <NavLink
            className="opacity-75 hover:opacity-100 transition-opacity duration-300"
            to="/"
          >
            <li>Home</li>
          </NavLink>

          <NavLink
            className="opacity-75 hover:opacity-100 transition-opacity duration-300"
            to="/App"
          >
            <li>My NavLinks</li>
          </NavLink>
          <NavLink
            className="opacity-75 hover:opacity-100 transition-opacity duration-300"
            to="/dashboard"
          >
            <li>Dashboard</li>
          </NavLink>
          <NavLink
            className="opacity-75 hover:opacity-100 transition-opacity duration-300"
            to="/login"
          >
            <LogIn className="opacity-75 hover:opacity-100 transition-opacity duration-300" />
          </NavLink>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
