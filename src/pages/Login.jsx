import { useState } from "react";
import LoginHalf from "../components/LoginSections/LoginHalf";
import SignupHalf from "../components/LoginSections/SignupHalf";

function Login() {
  const [half, setHalf] = useState("login");

  function switchHalfs() {
    half === "login" ? setHalf("singup") : setHalf("login");
  }

  return (
    <div
      className={`h-screen flex flex-col ${
        half === "login" ? "lg:flex-row" : "lg:flex-row-reverse"
      } justify-between items-center `}
    >
      {half === "login" ? (
        <LoginHalf onSwitch={switchHalfs} />
      ) : (
        <SignupHalf onSwitch={switchHalfs} />
      )}
      <div
        className={`login-r relative bg-emerald-900 w-full h-full flex flex-col justify-center p-16 gap-6 ${
          half === "login" ? "slideback" : "slide"
        }`}
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          <q>Keep everything you care about organized and accessible.</q>
        </h2>
        <p className="text-xl text-gray-200 mb-6">
          Daleel makes sure no important link ever gets lost again.
        </p>
        <p className="text-md text-gray-400 italic">
          Your links. Your control. Your Daleel.
        </p>
      </div>
    </div>
  );
}

export default Login;
