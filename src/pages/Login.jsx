import { useState } from "react";
import LoginHalf from "../components/LoginSections/LoginHalf";
import SignupHalf from "../components/LoginSections/SignupHalf";

function Login() {
  const [half, setHalf] = useState("login");

  function switchHalfs() {
    half === "login" ? setHalf("singup") : setHalf("login");
  }

  return (
    <section
      className={`h-screen bg-gray-50 flex flex-col ${
        half === "login" ? "md:flex-row" : "lg:flex-row-reverse"
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
          <q>Keep everything you care about organized and accessible.</q>
        </h2>
        <p className="text-md md:text-xl text-gray-200 mb-6">
          Daleel makes sure no important link ever gets lost again.
        </p>
        <p className="text-sm md:text-md text-gray-400 italic">
          Your links. Your control. Your Daleel.
        </p>
      </div>
    </section>
  );
}

export default Login;
