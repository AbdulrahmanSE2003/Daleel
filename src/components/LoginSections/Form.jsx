import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import Loader from "../Loader";
import ErrorToast from "../ErrorToast";
import { useTranslation } from "react-i18next";

const BASE_API = "https://dalil-backend-production.up.railway.app/api/";

function Form({ onSwitch }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Google login callback
  function handleGoogleResponse(response) {
    const token = response.credential;

    axios
        .post(`${BASE_API}login/google`, { token })
        .then((res) => {
          const jwt = res.data.token || res.data.access_token;
          if (jwt) {
            localStorage.setItem("token", jwt);
            navigate("/links");
          }
        })
        .catch((err) => {
          setError(err.response?.data?.message || t("form.errors.google"));
        });
  }

  // ✅ Initialize Google SDK
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      google.accounts.id.renderButton(
          document.getElementById("google-login-btn"),
          { theme: "outline", size: "large" }
      );
    }
  }, []);

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
      const res = await axios.post(`${BASE_API}login`, {
        email,
        password,
      });

      const token = res.data.token || res.data.access_token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/links");
      }
    } catch (err) {
      setError(err.response?.data?.message || t("form.errors.loginFailed"));
    } finally {
      setLoading(false);
    }
  }

  return (
      <>
        {error && <ErrorToast message={error} onClose={() => setError("")} />}
        <form onSubmit={handleForm} className="my-8 relative">
          {/* Email */}
          <div className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300 mb-12">
            <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
            />
            <label
                htmlFor="email"
                className=" absolute -top-8 font-normal text-gray-900"
            >
              {t("form.email")}
            </label>
            <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("form.emailPlaceholder")}
                className="p-2 pl-10 w-full outline-0"
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
                className=" absolute -top-8 font-normal text-gray-900"
            >
              {t("form.password")}
            </label>
            <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("form.passwordPlaceholder")}
                className="p-2 px-10 w-full outline-0"
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

          <Link
              to="/forget"
              className="text-gray-900 hover:text-emerald-800 transition-colors duration-300 absolute right-0 mb-6"
          >
            {t("form.forgetPassword")}
          </Link>

          <button
              className="bg-emerald-700 hover:bg-emerald-800 transition duration-300 w-full py-3 px-6 rounded-lg text-white font-semibold mt-10 mb-5"
              disabled={loading}
          >
            {loading ? <Loader /> : t("form.signIn")}
          </button>

          {/* Google Button */}
          <div id="google-login-btn" className="mb-4"></div>

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
