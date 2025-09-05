import axios from "axios";
import { useState } from "react";
import { Mail } from "lucide-react";
import Loader from "../Loader";
import ErrorToast from "../ErrorToast";

const BASE_API = "https://dalil-backend-production.up.railway.app/api/";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${BASE_API}forgot-password`, { email });
      setSubmitted(true);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }

    console.log("Reset link sent to:", email);
  }

  return (
    <>
      {error && <ErrorToast message={error} onClose={() => setError("")} />}
      <div className="h-screen flex items-center justify-center bg-gray-200 px-4">
        {!submitted && (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Forgot Password
            </h2>
            <p className="text-gray-600 mb-6">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>

            <div className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300 mb-6">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition duration-300"
                size={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="p-2 pl-10 w-full focus:outline-none focus:border-emerald-600"
                required
              />
            </div>

            <button
              className="bg-emerald-700 hover:bg-emerald-800 transition duration-300 w-full py-3 rounded-lg text-white font-semibold"
              disabled={loading}
            >
              {loading ? <Loader /> : "Reset Password"}
            </button>
          </form>
        )}

        {submitted && (
          <div className="bg-green-50 bg-opacity-80 p-10 py-16 flex items-center gap-3 shadow-md rounded-2xl border border-green-200 animate-fadeIn">
            <span className="text-green-600 text-2xl">✅</span>
            <p className="text-green-700 font-medium">
              Done! Check your inbox for the reset link.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default ForgotPassword;
