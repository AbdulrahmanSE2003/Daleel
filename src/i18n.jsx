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
            order: ["localStorage", "navigator"],
            caches: ["localStorage"],
        },
    });

// 🔥 ربط اللغة بالـ <html dir> + body class
i18n.on("languageChanged", (lng) => {
    if (typeof document !== "undefined") {
        const html = document.documentElement;
        const body = document.body;

        const isRTL = ["ar", "he", "fa"].includes(lng);

        // direction للـ html
        html.setAttribute("dir", isRTL ? "rtl" : "ltr");
        html.setAttribute("lang", lng);

        // class على الـ body
        if (isRTL) {
            body.classList.add("rtl");
        } else {
            body.classList.remove("rtl");
        }
    }
});

export default i18n;
