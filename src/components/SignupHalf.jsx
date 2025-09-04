import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function SignUupHalf({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleForm(e) {
    e.preventDefault();
  }

  return (
    <div className="bg-gray-50 w-full h-full ps-16 p-10  flex flex-col justify-start  items-between gap-6">
      <form onSubmit={handleForm} className="my-8 relative flex flex-col gap-6">
        {/* Email */}
        <div className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300 mb-6">
          <Mail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition duration-300"
            size={20}
          />
          <label
            htmlFor="email"
            className="absolute -top-8 font-normal text-gray-900"
          >
            E-Mail
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            className="p-2 pl-10 w-full focus:border-emerald-600 outline-0 focus:placeholder:opacity-0"
          />
        </div>

        {/* Password */}
        <div className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300 mb-6 select-none">
          <Lock
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition duration-300"
            size={20}
          />
          <label
            htmlFor="password"
            className="absolute -top-8 font-normal text-gray-900"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password..."
            className="p-2 pl-10 w-full focus:border-emerald-600 outline-0 focus:placeholder:opacity-0"
          />
          {showPassword ? (
            <EyeOff
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              size={20}
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <Eye
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              size={20}
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300 mb-4 select-none">
          <Lock
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition duration-300"
            size={20}
          />
          <label
            htmlFor="confirmPassword"
            className="absolute -top-8 font-normal text-gray-900"
          >
            Confirm Password
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your Password..."
            className="p-2 pl-10 w-full focus:border-emerald-600 outline-0 focus:placeholder:opacity-0"
          />
          {showConfirm ? (
            <EyeOff
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              size={20}
              onClick={() => setShowConfirm(!showConfirm)}
            />
          ) : (
            <Eye
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              size={20}
              onClick={() => setShowConfirm(!showConfirm)}
            />
          )}
        </div>

        {/* Sign Up Button */}
        <button className="bg-emerald-700 hover:bg-emerald-800 transition duration-300 w-full py-3 px-6 rounded-lg text-white font-semibold mt-6 mb-4">
          Sign Up
        </button>

        {/* Sign Up with Google */}
        <button
          type="button"
          className="flex items-center justify-center w-full border-2 border-gray-300 rounded-md py-3 px-6 mb-4 hover:bg-gray-100 transition-colors duration-300"
        >
          <FcGoogle className="mr-2 text-xl" />
          Sign up with Google
        </button>

        {/* Already have account */}
        <p className="text-center text-gray-600">
          Already have an Account?{" "}
          <Link
            to="/login"
            className="text-emerald-700 ml-1 hover:text-emerald-900 transition-colors duration-300"
            onClick={onSwitch}
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUupHalf;
