import { Link as LinkIcon, Zap, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

export default function FeaturesSection() {
  const { t } = useTranslation();
  const lang = i18n.language === "en" ? "ar" : "en"

  const features = [
    {
      icon: <LinkIcon className="w-8 h-14 text-emerald-500" />,
      title: t("features.links_title"),
      description: t("features.links_desc"),
    },
    {
      icon: <Zap className="w-8 h-14 text-emerald-500" />,
      title: t("features.fast_title"),
      description: t("features.fast_desc"),
    },
    {
      icon: <Lock className="w-8 h-14 text-emerald-500" />,
      title: t("features.secure_title"),
      description: t("features.secure_desc"),
    },
  ];

  return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-16 sm:px-36 md:px-14 lg:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 ">
            {t("features.heading")}{" "}
            <span className="text-emerald-500">{lang === "en" ? "دليل" : "Daleel"}</span>{lang === "en" ? "؟" : "?"}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <div key={index} className="relative group ">
                  <div className="absolute inset-0 rounded-2xl bg-[length:300%_300%] transition-all duration-500 group-hover:scale-105"></div>

                  {/* Card Content */}
                  <div className="relative h-60 bg-white border border-gray-300 rounded-2xl p-6 text-center duration-500 group-hover:scale-105 group-hover:shadow-xl transition shadow-emerald-200">
                    <div className="flex justify-center mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}
