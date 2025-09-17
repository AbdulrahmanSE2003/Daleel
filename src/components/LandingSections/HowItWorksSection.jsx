import { UserPlus, PlusCircle, Folder } from "lucide-react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

// Check Icon
function CheckIcon() {
  return (
      <svg
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={3}
          className="stroke-[#495c48]"
          stroke="#000000"
          fill="none"
          viewBox="0 0 24 24"
          height={10}
          width={10}
          xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
  );
}

// Data for both languages
const stepsData = {
  en: {
    step1: {
      icon: <UserPlus className="w-12 h-12 text-white" />,
      title: "Create your account",
      description: "Sign up in seconds and get started immediately.",
      features: ["Fast Sign-Up", "Easy Onboarding", "Secure Login", "Data Encryption"],
      bgColor: "bg-emerald-500",
      image: "/Hands - Phone.png",
    },
    step2: {
      icon: <PlusCircle className="w-12 h-12 text-white" />,
      title: "Save your links",
      description: "Add links with one click from anywhere.",
      features: ["One-Click Save", "Universal Access", "Auto-Categorization", "Data Encryption"],
      bgColor: "bg-blue-500",
      image: "/Hands - Tiny Lock.png",
    },
    step3: {
      icon: <Folder className="w-12 h-12 text-white" />,
      title: "Organize & find easily",
      description: "Use folders, tags, or search to stay in control.",
      features: ["Custom Folders", "Tagging System", "Powerful Search", "Data Encryption"],
      bgColor: "bg-purple-500",
      image: "/undraw_options_mw73.svg",
    },
  },
  ar: {
    step1: {
      icon: <UserPlus className="w-12 h-12 text-white" />,
      title: "أنشئ حسابك",
      description: "سجل في ثوانٍ وابدأ فورًا.",
      features: ["تسجيل سريع", "واجهة سهلة", "تسجيل دخول آمن", "تشفير البيانات"],
      bgColor: "bg-emerald-500",
      image: "/Hands - Phone.png",
    },
    step2: {
      icon: <PlusCircle className="w-12 h-12 text-white" />,
      title: "احفظ روابطك",
      description: "أضف الروابط بنقرة واحدة من أي مكان.",
      features: ["حفظ بنقرة واحدة", "الوصول من أي مكان", "تصنيف تلقائي", "تشفير البيانات"],
      bgColor: "bg-blue-500",
      image: "/Hands - Tiny Lock.png",
    },
    step3: {
      icon: <Folder className="w-12 h-12 text-white" />,
      title: "نظم وابحث بسهولة",
      description: "استخدم المجلدات، الوسوم، أو البحث للبقاء مسيطرًا.",
      features: ["مجلدات مخصصة", "نظام الوسوم", "بحث قوي", "تشفير البيانات"],
      bgColor: "bg-purple-500",
      image: "/undraw_options_mw73.svg",
    },
  },
};

export default function HowItWorksGrid() {
  const { i18n } = useTranslation();

  // Normalize language to 'ar' or 'en'
  const normalize =(lng) => (lng && lng.startsWith && lng.startsWith("ar") ? "ar" : "en");

  // local state so component re-renders when language changes
  const [lang, setLang] = useState(() => normalize(i18n.language || "en"));

  // subscribe once to language changes in i18next
  useEffect(() => {
    const handleLangChanged = (lng) => {
      setLang(normalize(lng));
    };

    // ensure initial value is correct (in case i18n set after mount)
    handleLangChanged(i18n.language);

    i18n.on("languageChanged", handleLangChanged);
    return () => {
      i18n.off("languageChanged", handleLangChanged);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n]); // i18n object stable, safe to depend on it

  // derived steps for current language
  const steps = stepsData[lang] || stepsData.en;



  return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-10 md:px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            {lang === "en" ? "How " : "طريقة عمل "}
            <span className="text-emerald-500">{lang === "en" ? "Daleel " : "دليل"}</span> {lang === "en" ? "Works ?" : " ؟"}
          </h2>

          <div className="grid md:grid-cols-3 gap-7">

            {/* Step 1 */}
            <div className={`product-card rounded-2xl shadow-lg p-8 overflow-hidden relative cursor-pointer py-8 px-6 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-all duration-300 group ${steps.step1.bgColor}`}>
              <div className="flex flex-col items-center text-center leading-none z-40">
                <div className="mb-6">{steps.step1.icon}</div>
                <p className="para uppercase mb-4 font-bold text-xl tracking-wider text-white z-30">{steps.step1.title}</p>
                <p className="text-white">{steps.step1.description}</p>
              </div>
              <div className="flex items-center justify-between aspect-square relative z-20 group-hover:translate-x-1/2 transition-all duration-300">
                <img src={steps.step1.image} alt={steps.step1.title} className="w-32 h-32 opacity-80" />
                <div className="absolute -translate-x-[150%] p-2 flex flex-col items-center justify-center gap-2 transition-all duration-300 group-hover:-translate-x-full">
                  <ul className="flex flex-col items-start gap-2">
                    <li className="inline-flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <CheckIcon />
                      <p className="text-xs font-semibold text-gray-200">{steps.step1.features[0]}</p>
                    </li>
                    <li className="inline-flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <CheckIcon />
                      <p className="text-xs font-semibold text-gray-200">{steps.step1.features[1]}</p>
                    </li>
                    <li className="inline-flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <CheckIcon />
                      <p className="text-xs font-semibold text-gray-200">{steps.step1.features[2]}</p>
                    </li>
                    <li className="inline-flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <CheckIcon />
                      <p className="text-xs font-semibold text-gray-200">{steps.step1.features[3]}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`product-card rounded-2xl shadow-lg p-8 overflow-hidden relative cursor-pointer py-8 px-6 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-all duration-300 group ${steps.step2.bgColor}`}>
              <div className="flex flex-col items-center text-center leading-none z-40">
                <div className="mb-6">{steps.step2.icon}</div>
                <p className="para uppercase mb-4 font-bold text-xl tracking-wider text-white z-30">{steps.step2.title}</p>
                <p className="text-white">{steps.step2.description}</p>
              </div>
              <div className="flex items-center justify-between aspect-square relative z-20 group-hover:translate-x-1/2 transition-all duration-300">
                <img src={steps.step2.image} alt={steps.step2.title} className="w-32 h-32 opacity-80" />
                <div className="absolute -translate-x-[150%] p-2 flex flex-col items-center justify-center gap-2 transition-all duration-300 group-hover:-translate-x-full">
                  <ul className="flex flex-col items-start gap-2">
                    <li className="inline-flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <CheckIcon />
                      <p className="text-xs font-semibold text-gray-200">{steps.step2.features[0]}</p>
                    </li>
                    <li className="inline-flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <CheckIcon />
                      <p className="text-xs font-semibold text-gray-200">{steps.step2.features[1]}</p>
                    </li>
                    <li className="inline-flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <CheckIcon />
                      <p className="text-xs font-semibold text-gray-200">{steps.step2.features[2]}</p>
                    </li>
                    <li className="inline-flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <CheckIcon />
                      <p className="text-xs font-semibold text-gray-200">{steps.step2.features[3]}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`product-card rounded-2xl shadow-lg p-8 overflow-hidden relative cursor-pointer py-8 px-6 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-all duration-300 group ${steps.step3.bgColor}`}>
              <div className="flex flex-col items-center text-center leading-none z-40">
                <div className="mb-6">{steps.step3.icon}</div>
                <p className="para uppercase mb-4 font-bold text-xl tracking-wider text-white z-30">{steps.step3.title}</p>
                <p className="text-white">{steps.step3.description}</p>
              </div>
              <div className="flex items-center justify-between aspect-square relative z-20 group-hover:translate-x-1/2 transition-all duration-300">
                <img src={steps.step3.image} alt={steps.step3.title} className="w-32 h-32 opacity-80" />
                <div className="absolute -translate-x-[150%] p-2 flex flex-col items-center justify-center gap-2 transition-all duration-300 group-hover:-translate-x-full">
                  <ul className="flex flex-col items-start gap-2">
                    <li className="inline-flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <CheckIcon />
                      <p className="text-xs font-semibold text-gray-200">{steps.step3.features[0]}</p>
                    </li>
                    <li className="inline-flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <CheckIcon />
                      <p className="text-xs font-semibold text-gray-200">{steps.step3.features[1]}</p>
                    </li>
                    <li className="inline-flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <CheckIcon />
                      <p className="text-xs font-semibold text-gray-200">{steps.step3.features[2]}</p>
                    </li>
                    <li className="inline-flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <CheckIcon />
                      <p className="text-xs font-semibold text-gray-200">{steps.step3.features[3]}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
  );
}
