import { useEffect, useState } from "react";
import { ChevronsDown } from "lucide-react";

function HeroSection() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000); // 3 ثواني
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="landing-page h-screen relative">
      {showSplash && (
        <div className="splash-screen flex flex-col justify-center items-center h-full bg-white">
          <div className="logo-wrapper">
            <span className="logo">
              <img
                src="/6f746b46-3f6a-433c-9258-1167b211a14d_removalai_preview.png"
                alt="Logo"
                className="w-28 h-28 md:w-36 md:h-36"
              />
            </span>
          </div>
          <h1 className="brand text-3xl md:text-4xl font-bold mt-4">Daleel</h1>
        </div>
      )}

      <div
        className={`landing ${
          showSplash ? "hidden" : ""
        } flex flex-col md:flex-row justify-center items-center w-full h-screen gap-10 px-6 md:px-16`}
      >
        {/* Circle Decoration */}
        <div className="absolute w-[20rem] md:w-[40rem] h-[20rem] md:h-[40rem] bg-main opacity-20 -z-10 -right-[20%] md:-right-[15%] -top-[10%] md:-top-[20%] rounded-full"></div>

        {/* Left Content */}
        <div className="w-full mt-16 md:mt-0  md:w-1/2 flex flex-col justify-center items-start text-left gap-6 relative p-4 ps-6">
          <h5 className="text-2xl uppercase">
            Keep All your links in{" "}
            <span className="clr-main font-medium">1</span> place
          </h5>
          <p className="font-light capitalize text-sm md:text-base">
            Daleel is your personal space to save and organize the links that
            matter. Never lose an important link again.
          </p>
          <button className="bg-main transition duration-300 text-white rounded-xl shadow px-4 py-[6px] hover:scale-105">
            Start for Free
          </button>
        </div>

        {/* Right Content */}
        <div className="w-full pt-12 md:w-1/2 h-64 md:h-full flex justify-center items-center z-10">
          <img
            src="/hero.webp"
            className="w-4/6 h-full object-cover rounded-xl shadow-xl"
            alt="person using phone with daleel app"
          />
        </div>

        {/* Down Arrow */}
        <ChevronsDown
          size={35}
          color="#0c8f63"
          className="arrow absolute left-1/2 bottom-6 md:bottom-10 -translate-x-1/2 h-[30px] w-[30px] md:h-[35px] md:w-[35px] animate-bounce"
        />
      </div>
    </section>
  );
}

export default HeroSection;
