import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CTASection() {
  const { t } = useTranslation();

  return (
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-[#0c8f63]/10 text-center overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute w-[20rem] md:w-[30rem] h-[20rem] md:h-[30rem] bg-[#0c8f63]/10 rounded-full -z-10 -left-[10%] top-[10%] animate-float-slow"></div>
        <div className="absolute w-[15rem] md:w-[25rem] h-[15rem] md:h-[25rem] bg-[#0c8f63]/15 rounded-full -z-10 -right-[10%] bottom-[10%] animate-float-slow reverse"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-slide-in">
            {t("cta.heading")}
            <span className="block text-[#0c8f63] mt-2">{t("cta.subheading")}</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto animate-slide-in delay-100">
            {t("cta.description")}
          </p>

          <Link to="/links">
            <button className="relative bg-[#0c8f63] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-[#0a7a54] hover:shadow-[0_0_15px_rgba(12,143,99,0.5)] transition-all duration-300 transform hover:-translate-y-1 group">
              <span className="relative z-10">{t("cta.button")}</span>
              <div className="absolute inset-0 bg-[#0c8f63]/30 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
            </button>
          </Link>
        </div>
      </section>
  );
}

export default CTASection;
