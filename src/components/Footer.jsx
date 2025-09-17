import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();

  return (
      <footer className="bg-emerald-900 text-gray-300 py-7">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-8">
            <Link to="/links" className="hover:text-white transition">
              {i18n.language === "ar" ? t("footer.links_ar") : t("footer.links")}
            </Link>
            <Link to="/privacy" className="hover:text-white transition">
              {i18n.language === "ar" ? t("footer.privacy_ar") : t("footer.privacy")}
            </Link>
          </div>
          <p className="text-sm mt-4 md:mt-0">
            {i18n.language === "ar" ? t("footer.copyright_ar") : t("footer.copyright")}
          </p>
        </div>
      </footer>
  );
}
