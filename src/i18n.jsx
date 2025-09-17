// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend"; // Optional: load JSON files from public folder
import LanguageDetector from "i18next-browser-languagedetector"; // auto-detect browser language

i18n
    .use(Backend) // load translations using http (from public/locales)
    .use(LanguageDetector) // detect user language
    .use(initReactI18next) // pass the i18n instance to react-i18next
    .init({
        fallbackLng: "en", // default language
        debug: true,
        interpolation: {
            escapeValue: false, // React already safes from XSS
        },
        react: {
            useSuspense: true,
        },
        backend: {
            loadPath: "/locales/{{lng}}.json", // path to JSON translation files
        },
    });

export default i18n;
