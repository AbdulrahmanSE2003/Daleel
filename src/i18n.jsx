import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// إعداد i18n
i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: true,
        },
        backend: {
            loadPath: "/locales/{{lng}}.json",
        },
        detection: {
            // نخلي الـ localStorage الأولوية
            order: ["localStorage", "navigator"],
            caches: ["localStorage"],
        },
    });

// 🔥 هنا نربط اللغة بالـ <html dir>
i18n.on("languageChanged", (lng) => {
    if (typeof document !== "undefined") {
        const html = document.documentElement;

        // direction: RTL للغة العربية، LTR للباقي
        const isRTL = ["ar", "he", "fa"].includes(lng);
        html.setAttribute("dir", isRTL ? "rtl" : "ltr");
        html.setAttribute("lang", lng);
    }
});

export default i18n;
