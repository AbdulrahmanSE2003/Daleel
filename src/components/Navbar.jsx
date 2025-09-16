import { useState } from "react";
import {NavLink, useNavigate} from "react-router-dom";
import { LogIn, CircleUser, Menu, X,LogOut } from "lucide-react";
import Tooltip from "@mui/material/Tooltip";

function Navbar() {
  const logged = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogOut(){
      localStorage.removeItem("token")
      navigate("/");
  }
  return (

    <nav className="flex fixed top-0 left-0 w-full h-16 bg-gray-50 z-50 px-4 md:px-8 justify-between items-center shadow">
      {/* Logo */}
      <NavLink to="/" className="text-2xl font-light flex items-center">
        <div className="w-20 p-3">
          <img
            src="6f746b46-3f6a-433c-9258-1167b211a14d_removalai_preview.png"
            alt="Logo"
          />
        </div>
        <p className="font-normal">Daleel</p>
      </NavLink>

      {/* Menu button (mobile) */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Links */}
      <ul
        className={`flex flex-col md:flex-row md:items-center gap-6 md:gap-10
          absolute md:static top-16 left-0 w-full md:w-auto bg-gray-50 md:bg-transparent p-6 pl-12 md:p-0 shadow-xl md:shadow-none 
          transition-all duration-300 ease-in-out 
          ${open ? "block" : "hidden md:flex"}`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `opacity-85 hover:opacity-100 hover:text-emerald-700 transition duration-300 ${
              isActive ? "text-emerald-700 font-semibold" : ""
            }`
          }
          onClick={() => setOpen(false)}
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
          onClick={() => setOpen(false)}
        >
          Links
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `opacity-85 hover:opacity-100 hover:text-emerald-700 transition duration-300 ${
              isActive ? "text-emerald-700 font-semibold" : ""
            }`
          }
        >
          Contact Us
        </NavLink>

        {!logged ? (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `opacity-85 hover:opacity-100 hover:text-emerald-700 transition duration-300 ${
                isActive ? "text-emerald-700 font-semibold" : ""
              }`
            }
            onClick={() => setOpen(false)}
          >
              <Tooltip title="Log-in">
                  <LogIn className="inline-block" size={20} />
              </Tooltip>
          </NavLink>
        ) : <button
            onClick={handleLogOut}
            className="opacity-85 hover:opacity-100 hover:text-emerald-700 relative group transition duration-300"
        >
            <Tooltip title="Log-out">
                <LogOut className="inline-block" size={20} />
            </Tooltip>
        </button>
        }
      </ul>
    </nav>
  );
}

export default Navbar;
