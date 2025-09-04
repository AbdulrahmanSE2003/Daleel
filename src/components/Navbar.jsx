import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
function Navbar() {
  return (
    <nav className="flex fixed top-0 left-0 w-full h-16 bg-transparent z-50 px-8 py-4 justify-between items-center pr-18">
      <Link to="/" className="text-2xl font-light">
        Daleel
      </Link>
      <div>
        <ul className="flex gap-10 justify-evenly items-center">
          <Link
            className="opacity-75 hover:opacity-100 transition-opacity duration-300"
            to="/"
          >
            <li>Home</li>
          </Link>

          <Link
            className="opacity-75 hover:opacity-100 transition-opacity duration-300"
            to="/App"
          >
            <li>My Links</li>
          </Link>
          <Link
            className="opacity-75 hover:opacity-100 transition-opacity duration-300"
            to="/dashboard"
          >
            <li>Dashboard</li>
          </Link>
          <Link
            className="opacity-75 hover:opacity-100 transition-opacity duration-300"
            to="/login"
          >
            <LogIn className="opacity-75 hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
