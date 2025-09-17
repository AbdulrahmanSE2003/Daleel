import axios from "axios";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import ErrorToast from "../ErrorToast";
import { useTranslation } from "react-i18next";

const BASE_API = "https://dalil-backend-production.up.railway.app/api/";

function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      setError(t("auth.enterEmailError"));
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(`${BASE_API}forgot-password`, { email });
      setSubmitted(true);
    } catch (error) {
      setError(error.response?.data?.message || t("auth.genericError"));
    } finally {
      setLoading(false);
    }
  }

  return (
      <>
        {error && <ErrorToast message={error} onClose={() => setError("")} />}
        <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
          {!submitted && (
              <form
                  onSubmit={handleSubmit}
                  className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                  {t("auth.forgotPassword")}
                </h2>
                <p className="text-gray-600 text-center">
                  {t("auth.forgotPasswordDesc")}
                </p>

                {/* Email Field */}
                <div className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300">
                  <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition duration-300"
                      size={20}
                  />
                  <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("auth.enterEmail")}
                      className="p-2 pl-10 w-full focus:outline-none rounded-lg"
                      required
                  />
                </div>

                <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-800 transition duration-300 w-full py-3 rounded-lg text-white font-semibold"
                    disabled={loading}
                >
                  {loading ? <Loader /> : t("auth.resetPassword")}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  {t("auth.rememberPassword")}{" "}
                  <Link to="/login" className="text-emerald-700 font-medium hover:underline">
                    {t("auth.login")}
                  </Link>
                </p>
              </form>
          )}

          {/* Success Message */}
          {submitted && (
              <div className="bg-green-50 bg-opacity-80 p-10 py-16 flex flex-col items-center gap-4 shadow-md rounded-2xl border border-green-200 animate-fadeIn text-center max-w-md">
                <span className="text-green-600 text-3xl">✅</span>
                <p className="text-green-700 font-medium">
                  {t("auth.resetLinkSent")}
                </p>
                <Link to="/login">
                  <button className="bg-emerald-700 hover:bg-emerald-800 transition duration-300 w-full py-3 rounded-lg text-white font-semibold mt-4">
                    {t("auth.backToLogin")}
                  </button>
                </Link>
              </div>
          )}
        </div>
      </>
  );
}

export default ForgotPassword;
