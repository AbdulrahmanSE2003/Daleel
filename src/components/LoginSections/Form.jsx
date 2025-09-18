import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

import Loader from "../Loader";
import ErrorToast from "../ErrorToast";

const BASE_API = "https://dalil-backend-production.up.railway.app/api/";

function Form({ onSwitch }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= Google Sign-In =================
  async function handleGoogleResponse(response) {
    console.log("Google ID Token:", response.credential);
    const token = response.credential;

    try {
      const res = await axios.post(`${BASE_API}login/google`, { token });
      const jwt = res.data.token || res.data.access_token;

      if (jwt) {
        localStorage.setItem("token", jwt);
        navigate("/links");
      }
    } catch {
      setError(t("form.errors.google"));
    }
  }

  useEffect(() => {
    /* global google */
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
            "731351321833-a0rbcof0j7gh352jevfpok78iq1fvrl3.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      // ✅ Render Google button inside our div
      window.google.accounts.id.renderButton(
          document.getElementById("google-login-btn"),
          { theme: "outline", size: "large" }
      );
    }
  }, []);

  // ================= Manual Login =================
  async function handleForm(e) {
    e.preventDefault();

    if (!email || !password) {
      setError(t("form.errors.required"));
      return;
    }
    if (password.length < 8) {
      setError(t("form.errors.passwordLength"));
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_API}login`, { email, password });
      const token = res.data.token || res.data.access_token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/links");
      }
    } catch {
      setError(t("form.errors.loginFailed"));
    } finally {
      setLoading(false);
    }
  }

  return (
      <>
        {error && <ErrorToast message={error} onClose={() => setError("")} />}
        <form onSubmit={handleForm} className="my-8 relative flex flex-col gap-6">
          {/* Email */}
          <div className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300 mb-6">
            <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
            />
            <label
                htmlFor="email"
                className="absolute -top-8 font-normal text-gray-900"
            >
              {t("form.email")}
            </label>
            <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("form.emailPlaceholder")}
                className="p-2 pl-10 w-full outline-0 focus:border-emerald-600 focus:placeholder:opacity-0"
            />
          </div>

          {/* Password */}
          <div className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300 mb-4 select-none">
            <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
            />
            <label
                htmlFor="password"
                className="absolute -top-8 font-normal text-gray-900"
            >
              {t("form.password")}
            </label>
            <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("form.passwordPlaceholder")}
                className="p-2 px-10 w-full outline-0 focus:border-emerald-600 focus:placeholder:opacity-0"
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

          {/* Sign In Button */}
          <button
              className="bg-emerald-700 hover:bg-emerald-800 transition duration-300 w-full py-3 px-6 rounded-lg text-white font-semibold"
              disabled={loading}
          >
            {loading ? <Loader /> : t("form.signIn")}
          </button>

          {/* Google Sign-In */}
          <div
              id="google-login-btn"
          >
            {/* Placeholder for Google button */}
            <FcGoogle className="mr-2 text-xl" />
            {t("form.signInGoogle")}
          </div>

          {/* Forget Password */}
          <Link
              to="/forget"
              className="text-gray-900 hover:text-emerald-800 transition-colors duration-300 mt-2"
          >
            {t("form.forgetPassword")}
          </Link>

          {/* Switch to SignUp */}
          <p className="text-center text-gray-600">
            {t("form.noAccount")}{" "}
            <Link
                className="text-emerald-700 ml-1 hover:text-emerald-900 transition-colors duration-300"
                onClick={onSwitch}
            >
              {t("form.signUp")}
            </Link>
          </p>
        </form>
      </>
  );
}

export default Form;
