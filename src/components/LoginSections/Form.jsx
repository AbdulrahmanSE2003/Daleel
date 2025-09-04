import { useState } from "react";
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // مكتبة أيقونات Google

function Form({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  function handleForm(e) {
    e.preventDefault();
  }
  return (
    <form onSubmit={(e) => handleForm(e)} className="my-8 relative">
      <div className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300 mb-12">
        {/* Icon */}
        <Mail
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition duration-300"
          size={20}
        />

        {/* Input */}
        <label
          htmlFor="email"
          className=" absolute -top-8 font-normal text-gray-900"
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
      <div className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300 mb-4 select-none">
        {/* Icon */}
        <Lock
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition duration-300"
          size={20}
        />

        {/* Input */}
        <label
          htmlFor="password"
          className=" absolute -top-8 font-normal text-gray-900"
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
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400  cursor-pointer"
            size={20}
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <Eye
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400  cursor-pointer"
            size={20}
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
      <Link
        to="/forget"
        className="text-gray-900 hover:text-emerald-800 transition-colors duration-300 absolute right-0 mb-6"
      >
        Forget Password?
      </Link>
      <button className="bg-emerald-700 hover:bg-emerald-800 transition duration-300 w-full py-3 px-6 rounded-lg text-white font-semibold mt-10 mb-5">
        Sign In
      </button>
      <button
        type="button"
        className="flex items-center justify-center w-full border-2 border-gray-300 rounded-md py-3 px-6 mb-4 hover:bg-gray-100 transition-colors duration-300"
      >
        <FcGoogle className="mr-2 text-xl" />
        Sign in with Google
      </button>
      <p className="text-center text-gray-600">
        Don't have an Account?{" "}
        <Link
          className="text-emerald-700 ml-1 hover:text-emerald-900 transition-colors duration-300"
          onClick={onSwitch}
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}

export default Form;
