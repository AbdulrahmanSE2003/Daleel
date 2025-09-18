import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

import Loader from "../Loader";
import ErrorToast from "../ErrorToast";

const BASE_API = "https://dalil-backend-production.up.railway.app/api/";

function SignupHalf({ onSwitch }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ================= Google Sign-In =================
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
                setError(err.response?.data?.message || "Google signup/login failed.");
            });
    }

    useEffect(() => {
        /* global google */
        if (window.google) {
            google.accounts.id.initialize({
                client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
                callback: handleGoogleResponse,
            });
        }
    }, []);

    // ================ Manual Signup =================
    async function handleRegister(e) {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            setError(t("signup.errors.required"));
            return;
        }
        if (password.length < 8) {
            setError(t("signup.errors.passwordLength"));
            return;
        }
        if (password !== confirmPassword) {
            setError(t("signup.errors.passwordMismatch"));
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(BASE_API + "register", {
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            });

            const token = res.data.token || res.data.access_token;
            if (token) {
                localStorage.setItem("token", token);
                navigate("/links");
            }
        } catch (err) {
            setError(err.response?.data?.message || t("signup.errors.generic"));
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {error && <ErrorToast message={error} onClose={() => setError("")} />}
            <div className="bg-gray-50 w-full h-full ps-16 p-10 py-6 flex flex-col justify-start items-between gap-6">
                <form onSubmit={handleRegister} className="my-8 relative flex flex-col gap-6">
                    {/* Name */}
                    <div className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300 mb-6">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition duration-300" size={20} />
                        <label htmlFor="name" className="absolute -top-8 font-normal text-gray-900">{t("signup.labels.name")}</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t("signup.placeholders.name")}
                            className="p-2 pl-10 w-full focus:border-emerald-600 outline-0 focus:placeholder:opacity-0"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300 mb-6">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition duration-300" size={20} />
                        <label htmlFor="email" className="absolute -top-8 font-normal text-gray-900">{t("signup.labels.email")}</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t("signup.placeholders.email")}
                            className="p-2 pl-10 w-full focus:border-emerald-600 outline-0 focus:placeholder:opacity-0"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300 mb-6 select-none">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition duration-300" size={20} />
                        <label htmlFor="password" className="absolute -top-8 font-normal text-gray-900">{t("signup.labels.password")}</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t("signup.placeholders.password")}
                            className="p-2 px-10 w-full focus:border-emerald-600 outline-0 focus:placeholder:opacity-0"
                        />
                        {showPassword ? (
                            <EyeOff className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" size={20} onClick={() => setShowPassword(!showPassword)} />
                        ) : (
                            <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" size={20} onClick={() => setShowPassword(!showPassword)} />
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300 mb-4 select-none">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition duration-300" size={20} />
                        <label htmlFor="confirmPassword" className="absolute -top-8 font-normal text-gray-900">{t("signup.labels.confirmPassword")}</label>
                        <input
                            type={showConfirm ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder={t("signup.placeholders.confirmPassword")}
                            className="p-2 px-10 w-full focus:border-emerald-600 outline-0 focus:placeholder:opacity-0"
                        />
                        {showConfirm ? (
                            <EyeOff className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" size={20} onClick={() => setShowConfirm(!showConfirm)} />
                        ) : (
                            <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" size={20} onClick={() => setShowConfirm(!showConfirm)} />
                        )}
                    </div>

                    {/* Sign Up Button */}
                    <button className="bg-emerald-700 hover:bg-emerald-800 transition duration-300 w-full py-3 px-6 rounded-lg text-white font-semibold" disabled={loading}>
                        {loading ? <Loader /> : t("signup.buttons.signup")}
                    </button>

                    {/* Google Sign-In */}
                    <button
                        type="button"
                        onClick={() => google.accounts.id.prompt()}
                        className="flex items-center justify-center w-full border-2 border-gray-300 rounded-md py-3 px-6 mt-4 hover:bg-gray-100 transition-colors duration-300"
                    >
                        <FcGoogle className="mr-2 " /> {t("signup.buttons.signupGoogle") || "Sign up with Google"}
                    </button>

                    {/* Already have account */}
                    <p className="text-center text-gray-600 mt-4">
                        {t("signup.alreadyAccount")}{" "}
                        <Link
                            to="/login"
                            className="text-emerald-700 ml-1 hover:text-emerald-900 transition-colors duration-300"
                            onClick={onSwitch}
                        >
                            {t("signup.buttons.signin")}
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default SignupHalf;
