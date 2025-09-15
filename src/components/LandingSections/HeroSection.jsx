import { useEffect, useState } from "react";
import { ChevronsDown } from "lucide-react";
import { Link } from "react-router-dom";

function HeroSection() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800); // 1.8s for faster, impactful splash
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0c8f63]/5 via-white to-[#0c8f63]/10 overflow-hidden">
      {showSplash && (
        <div className="splash-screen fixed inset-0 flex flex-col justify-center items-center bg-gradient-to-b from-white to-[#0c8f63]/30 backdrop-blur-sm transition-opacity duration-600 ease-in-out">
          <div className="logo-wrapper animate-zoom-in">
            <span className="logo relative">
              <img
                src="/6f746b46-3f6a-433c-9258-1167b211a14d_removalai_preview.png"
                alt="Daleel Logo"
                className="w-40 h-40 md:w-52 md:h-52 object-contain drop-shadow-xl"
              />
              <div className="absolute inset-0 bg-[#0c8f63]/20 rounded-full blur-xl animate-pulse"></div>
            </span>
          </div>
          <h1 className="brand text-4xl md:text-5xl font-extrabold mt-5 text-emerald-800 tracking-tight">
            Daleel
          </h1>
        </div>
      )}

      <div
        className={`relative flex flex-col md:flex-row justify-center items-center min-h-screen gap-6 md:gap-12 px-4 sm:px-8 md:px-16 lg:px-24 transition-all duration-1000 ease-in-out ${
          showSplash ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Decorative Elements */}
        <div className="absolute w-[25rem] md:w-[40rem] h-[25rem] md:h-[40rem] bg-[#0c8f63]/15 rounded-full -z-10 -right-[12%] md:-right-[8%] -top-[15%] md:-top-[18%] animate-float-slow"></div>
        <div className="absolute w-[15rem] md:w-[25rem] h-[15rem] md:h-[25rem] bg-[#0c8f63]/10 rounded-full -z-10 -left-[10%] md:-left-[5%] bottom-[10%] animate-float-slow reverse"></div>

        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left gap-5 md:gap-8 z-10 mt-12 md:mt-0">
          <h5 className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase tracking-wider text-gray-900 animate-slide-in-left">
            Keep All your links in{" "}
            <span className="text-[#0c8f63] font-bold drop-shadow-md">One</span>{" "}
            Place
          </h5>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-md animate-slide-in-left delay-100">
            Daleel is your personal space to save and organize the links that
            matter. Never lose an important link again.
          </p>
          <Link to="links">
            <button className="relative bg-[#0c8f63] text-white font-semibold rounded-full px-6 py-3 shadow-lg hover:bg-[#0a7a54] hover:scale-105 transform transition-all duration-300 ease-in-out group">
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-[#0c8f63]/50 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
            </button>
          </Link>
        </div>

        {/* Right Content */}
        <div className="w-full hidden md:block md:w-1/2 flex justify-center items-center  z-10 relative">
          <div className="relative w-4/5 sm:w-3/4 md:w-3/5 group">
            <img
              src="/6f746b46-3f6a-433c-9258-1167b211a14d_removalai_preview.png"
              className="w-full h-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-2 animate-slide-in-right md:object-cover  md:rounded-2xl "
              alt="Daleel brand"
            />
          </div>
        </div>

        {/* Down Arrow */}
        <ChevronsDown
          size={40}
          color="#0c8f63"
          className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-smooth"
        />
      </div>
    </section>
  );
}

export default HeroSection;
