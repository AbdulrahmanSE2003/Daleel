import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginHalf from "../components/LoginSections/LoginHalf";
import SignupHalf from "../components/LoginSections/SignupHalf";

function Login() {
  const { t } = useTranslation();
  const [half, setHalf] = useState("login");

  function switchHalfs() {
    half === "login" ? setHalf("signup") : setHalf("login");
  }

  return (
      <section
          className={`h-screen bg-gray-50 flex flex-col ${
              half === "login" ? "md:flex-row" : "md:flex-row-reverse"
          } justify-between items-center `}
      >
        {half === "login" ? (
            <LoginHalf onSwitch={switchHalfs} />
        ) : (
            <SignupHalf onSwitch={switchHalfs} />
        )}

        <div
            className={`login-r relative bg-emerald-900 w-full h-screen flex flex-col justify-center p-10 md:p-16 gap-2 md:gap-6 ${
                half === "login" ? "slideback" : "slide"
            }`}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            <q>{t("login.keepOrganized")}</q>
          </h2>
          <p className="text-md md:text-xl text-gray-200 mb-6">
            {t("login.noLinkLost")}
          </p>
          <p className="text-sm md:text-md text-gray-400 italic">
            {t("login.yourControl")}
          </p>
        </div>
      </section>
  );
}

export default Login;
