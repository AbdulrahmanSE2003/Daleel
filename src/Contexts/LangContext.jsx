import { createContext, useContext, useState } from "react";
import i18n from "i18next";

const LangContext = createContext();

export function LanguageProvider({ children }) {
    const [loading, setLoading] = useState(false);

    const changeLanguage = () => {
        setLoading(true);
        const newLang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(newLang);

        setTimeout(() => {
            window.scrollTo(0, 0)
            document.body.dir = newLang === "ar" ? "rtl" : "ltr";
            document.body.style.fontWeight = newLang === "ar" ? "500" : "400";
            document.body.style.fontFamily =
                newLang === "ar" ? '"Tajawal", sans-serif' : '"Inter", sans-serif';
            setLoading(false);
        }, 700); // تزودها شوية تبان
    };

    return (
        <LangContext.Provider value={{ changeLanguage, loading }}>
            {/* children */}
            {children}

            {/* Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col gap-4 items-center justify-center z-[9999]">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
                    Changing Language
                </div>
            )}
        </LangContext.Provider>
    );
}

export const useLanguage = () => useContext(LangContext);
