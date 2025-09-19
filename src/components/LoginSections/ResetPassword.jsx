import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

const BASE_API = "https://dalil-backend-production.up.railway.app/api/";

function ResetPassword() {
  const { t } = useTranslation();

  // استخراج email و token من URL
  const [searchParams] = useSearchParams();
  const emailFromLink = searchParams.get("email");
  localStorage.removeItem("resetToken"); // امسح التوكن من LocalStorage بعد النجاح
  const tokenFromLink = searchParams.get("token");

  const savedToken = localStorage.getItem("resetToken");

  if (tokenFromLink !== savedToken) {
    // التوكن مش صح → ما تخليش المستخدم يعدل الباسورد
    return <p>Invalid or expired link</p>;
  }

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setShowError(true);
      setErrorMessage(t("reset.errorMismatch"));
      return;
    }

    try {
      await axios.post(`${BASE_API}reset-password`, {
        emailFromLink,
        tokenFromLink,
        password,
        password_confirmation : confirmPassword,
      });

      setSubmitted(true);
      setShowError(false);
      localStorage.removeItem("resetToken"); // امسح التوكن من LocalStorage بعد النجاح
    } catch (error) {
      console.error("Reset error:", error);
      setShowError(true);
      setErrorMessage(
          error.response?.data?.message || "Failed to reset password."
      );
    }
  }

  return (
      <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
        >
          {!submitted && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                  {t("reset.title")}
                </h2>
                <p className="text-gray-600 text-center">
                  {t("reset.subtitle")}
                </p>

                {/* New Password */}
                <div className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300">
                  <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition duration-300"
                      size={20}
                  />
                  <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t("reset.newPassword")}
                      className="p-2 px-10 w-full focus:outline-none focus:border-emerald-600 rounded-lg"
                      required
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
                <div className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300">
                  <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition duration-300"
                      size={20}
                  />
                  <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t("reset.confirmPassword")}
                      className="p-2 px-10 w-full focus:outline-none focus:border-emerald-600 rounded-lg"
                      required
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

                {/* Button */}
                <button className="bg-emerald-700 hover:bg-emerald-800 transition duration-300 w-full py-3 rounded-lg text-white font-semibold mt-4">
                  {t("reset.button")}
                </button>
              </>
          )}

          {/* Error Message */}
          {showError && (
              <div className="bg-red-50 bg-opacity-80 p-4 flex items-center gap-3 shadow-md rounded-2xl border border-red-200 mt-4 animate-fadeIn">
                <p className="text-red-700 font-medium">{errorMessage}</p>
              </div>
          )}

          {/* Success Message */}
          {submitted && (
              <>
                <div className="bg-green-50 bg-opacity-80 p-4 flex items-center gap-3 shadow-md rounded-2xl border border-green-200 mt-4 animate-fadeIn">
                  <span className="text-green-600 text-2xl">✅</span>
                  <p className="text-green-700 font-medium">
                    {t("reset.success")}
                  </p>
                </div>
                <Link to="/login">
                  <button className="bg-emerald-700 hover:bg-emerald-800 transition duration-300 w-full py-3 rounded-lg text-white font-semibold mt-4">
                    {t("reset.login")}
                  </button>
                </Link>
              </>
          )}
        </form>
      </div>
  );
}

export default ResetPassword;
