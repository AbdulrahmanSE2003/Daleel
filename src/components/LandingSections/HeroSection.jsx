import { useEffect, useState } from "react";
import { ChevronsDown } from "lucide-react";

function HeroSection() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3500); // 2.5 ثانية
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="landing-page h-screen">
      {showSplash && (
        <div className="splash-screen">
          <div className="logo-wrapper">
            <span className="logo">
              <img
                src="../../public/6f746b46-3f6a-433c-9258-1167b211a14d_removalai_preview.png"
                alt=""
              />
            </span>
          </div>
          <h1 className="brand">Daleel</h1>
        </div>
      )}

      <div
        className={`landing ${
          showSplash ? "hidden" : ""
        } flex justify-center items-center w-full h-screen gap-10`}
      >
        <div className="absolute w-[40rem] h-[40rem] bg-main opacity-20 -z-10 -right-[15%] -top-[20%] rounded-full"></div>
        <div className="w-3/6 content-r flex flex-col justify-center items-start text-center gap-6 relative before:absolute before:content-[''] before:w-[3px] before:h-full before:top-0 before:left-0 before:bottom-0 before:translate-x-[-10px]  p-4 ps-10">
          {/* <h1 className="text-6xl font-semibold">Daleel 🔗</h1> */}
          <h5 className="text-2xl uppercase">
            Keep All your links in{" "}
            <span className="clr-main font-medium">1</span> place
          </h5>
          <p className="text-left font-light capitalize">
            Dalil is your personal space to save and organize the links that
            matter. Never lose an important link again.
          </p>
          <button className="bg-main transition duration-300 text-white rounded-xl shadow px-4 py-[6px]">
            Start for Free
          </button>
        </div>
        <div className="w-3/6 h-full content-l overflow-hidden flex justify-center items-center p-4 pt-10 z-10">
          <img
            src="../public/hero.webp"
            className="w-4/6  h-full object-cover rounded-xl shadow-xl"
            alt="person using phone with daleel app"
          />
        </div>

        <ChevronsDown
          size={35}
          color="#0c8f63"
          className="arrow absolute left-3/6 bottom-10 -translate-x-3/6 h-[35px] w-[35px]"
        />
      </div>
    </section>
  );
}

export default HeroSection;
