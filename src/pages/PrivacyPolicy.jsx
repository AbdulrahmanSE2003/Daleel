import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

function PrivacyPolicy() {
  const { t,i18n  } = useTranslation();

  return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-20 px-6">
          <div className="max-w-3xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-3xl font-semibold text-emerald-700 mb-6">
              {t("privacy.heading")}
            </h1>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t("privacy.intro")}{" "}
              <span className="font-medium text-emerald-600">{i18n.language ==="en" ?"Daleel": "دليل "}</span>
              {t("privacy.intro2")}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t("privacy.dataUsage")}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t("privacy.simplePolicy")}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t("privacy.contact")}{" "}
              <a
                  href="mailto:daleel.support@gmail.com"
                  className="text-emerald-600 underline"
              >
                daleel.support@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
        <Footer />
      </>
  );
}

export default PrivacyPolicy;
