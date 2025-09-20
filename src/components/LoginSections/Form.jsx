import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Eye, EyeOff, Lock, Mail} from "lucide-react";
import {FcGoogle} from "react-icons/fc";
import axios from "axios";

import Loader from "../Loader";
import ErrorToast from "../ErrorToast";

const BASE_API = "https://dalil-backend-production.up.railway.app/api/";

function Form({onSwitch}) {
    const {t} = useTranslation();
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
            const res = await axios.post(`${BASE_API}login/google`, {token});
            console.log("Backend Response:", res.data);
            const jwt = res.data.token || res.data.access_token || res.data.jwt;

            if (!jwt) {
                throw new Error("No token received from backend");
            }

            localStorage.setItem("token", jwt);
            navigate("/links");
        } catch (error) {
            const errorMessage = error.response?.data?.error || t("form.errors.google");
            console.error("Google Sign-In Error:", error.response?.data || error.message);
            setError(errorMessage);
        }
    }

    useEffect(() => {
        /* global Google */
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id:
                    "731351321833-a0rbcof0j7gh352jevfpok78iq1fvrl3.apps.googleusercontent.com",
                callback: handleGoogleResponse,
            });
        }
    }, []);

    const handleCustomGoogleClick = () => {
        if (window.google) {
            window.google.accounts.id.prompt(); // يفتح popup Google Sign-In
        }
    };

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
            const res = await axios.post(`${BASE_API}login`, {email, password});
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
            {error && <ErrorToast message={error} onClose={() => setError("")}/>}
            <form onSubmit={handleForm} className="my-8 relative flex flex-col justify-start gap-6 grow">
                {/* Email */}
                <div
                    className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300 mb-6">
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
                <div
                    className="relative w-full border-2 border-gray-300 rounded-lg focus-within:border-emerald-600 group transition duration-300 mb-4 select-none">
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
                    {loading ? <Loader/> : t("form.signIn")}
                </button>

                {/* Custom Google Sign-In Button */}
                <button
                    type="button"
                    onClick={handleCustomGoogleClick}
                    className="flex items-center justify-center gap-2 w-full py-3 px-6 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                    <FcGoogle className="text-xl"/>
                    {t("form.signInGoogle")}
                </button>

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
                {/* Terms and Privacy */}
                <div className="mt-4 text-center text-sm text-gray-500">
                    {t("form.termsText", {
                        defaultValue:
                            "By signing in, you agree to our Terms of Service and Privacy Policy",
                    })}
                    <Link to="/privacy" className="text-emerald-600 hover:underline">
                        {t("form.privacy")}
                    </Link>.
                </div>

            </form>
        </>
    );
}

export default Form;
