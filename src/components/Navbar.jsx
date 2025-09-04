import { NavLink } from "react-router-dom";
import { LogIn } from "lucide-react";

function Navbar() {
  return (
    <nav className="flex fixed top-0 left-0 w-full h-16 bg-gray-100 z-50 px-8 py-4 justify-between items-center">
      <NavLink to="/" className="text-2xl font-light flex items-center">
        <div className="w-24 p-6 -mr-5">
          <img
            src="../../public/6f746b46-3f6a-433c-9258-1167b211a14d_removalai_preview.png"
            alt=""
          />
        </div>
        <p className="font-normal">Daleel</p>
      </NavLink>

      <ul className="flex gap-10 justify-evenly items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `opacity-85 hover:opacity-100 hover:text-emerald-700 transition duration-300 ${
              isActive ? "text-emerald-700 font-semibold" : ""
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/links"
          className={({ isActive }) =>
            `opacity-85 hover:opacity-100 hover:text-emerald-700 transition duration-300 ${
              isActive ? "text-emerald-700 font-semibold" : ""
            }`
          }
        >
          My Links
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `opacity-85 hover:opacity-100 hover:text-emerald-700 transition duration-300 ${
              isActive ? "text-emerald-700 font-semibold" : ""
            }`
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            `opacity-85 hover:opacity-100 hover:text-emerald-700 transition duration-300 ${
              isActive ? "text-emerald-700 font-semibold" : ""
            }`
          }
        >
          <LogIn className="inline-block" size={20} />
        </NavLink>
      </ul>
    </nav>
  );
}

export default Navbar;
