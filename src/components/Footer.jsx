import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t, i18n } = useTranslation();

    return (
        <footer className="bg-emerald-900 text-gray-300 py-7">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Links */}
                <div className="flex gap-8">
                    <Link to="/links" className="hover:text-white transition">
                        {i18n.language === "ar" ? t("footer.links_ar") : t("footer.links")}
                    </Link>
                    <Link to="/privacy" className="hover:text-white transition">
                        {i18n.language === "ar" ? t("footer.privacy_ar") : t("footer.privacy")}
                    </Link>
                </div>

                {/* CopyRight + Credits */}
                <div className="flex flex-col md:flex-row items-center gap-2 text-sm mt-4 md:mt-0">
                    <p>
                        {i18n.language === "ar"
                            ? t("footer.copyright_ar")
                            : t("footer.copyright")}
                    </p>
                    <span className="hidden md:inline">|</span>
                    <p className="text-gray-400 flex gap-1">
                        {i18n.language === "ar"
                            ? t("footer.developed_by_ar")
                            : t("footer.developed_by")}
                        <a
                            href="https://github.com/abdo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            Abdo
                        </a>
                        &
                        <a
                            href="https://github.com/someone"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            Someone
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
