import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-gray-300 py-7">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-8">
          <Link to="/links" className="hover:text-white transition">
            My Links
          </Link>
          <Link to="/profile" className="hover:text-white transition">
            Dashboard
          </Link>
          <Link to="/" className="hover:text-white transition">
            Privacy Policy
          </Link>
        </div>
        <p className="text-sm mt-4 md:mt-0">
          © Dalil 2025 – All rights reserved.
        </p>
      </div>
    </footer>
  );
}
