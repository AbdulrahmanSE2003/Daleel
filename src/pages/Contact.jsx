import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";


export default function Contact() {
  const [showModal, setShowModal] = useState(false);
  const {t} = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        "service_5630k6g",
        "template_rumkyog",
        data,
        "nhyoEmWLNjoNInN78"
      );
      toast.success("Done Message sending");

      setTimeout(() => {
        setShowModal(true);
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    }
  };

  return (
      <>
        <Navbar />
        {showModal && (
            <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
              <div className="bg-white p-6 py-8 rounded-2xl w-92 max-w-[90%] shadow-lg animate-[fadeIn_0.3s_ease-out] flex flex-col gap-6 items-center text-center">
                <p className="text-md font-normal leading-relaxed">
                  {t("contact.successMessage")}
                </p>
                <Link to="/" className="w-full">
                  <button className="w-full px-6 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 shadow-md hover:shadow-emerald-200 transition-all duration-300">
                    {t("contact.homeBtn")}
                  </button>
                </Link>
              </div>
            </div>
        )}

        <div className="min-h-screen mt-12 bg-gray-100 flex flex-col items-center py-9 pb-0 px-6">
          <div className="max-w-3xl bg-white rounded-2xl shadow p-8 md:p-12 w-full">
            <h1 className="text-3xl font-semibold text-emerald-700 mb-6">
              {t("contact.heading")}
            </h1>
            <p className="text-gray-700 mb-8">
              {t("contact.reach")}{" "}
              <a
                  href="mailto:daleel.support@gmail.com"
                  className="text-emerald-600 underline"
              >
                daleel.support@gmail.com
              </a>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <input
                  type="text"
                  placeholder={t("contact.namePlaceholder")}
                  {...register("name", { required: t("contact.nameError") })}
                  className="rounded-lg p-3 focus:outline-none border-2 border-gray-400 transform-border duration-300 focus:border-emerald-500"
              />
              {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}

              <input
                  type="email"
                  placeholder={t("contact.emailPlaceholder")}
                  {...register("email", {
                    required: t("contact.emailError"),
                    pattern: { value: /^\S+@\S+$/i, message: t("contact.emailInvalid") },
                  })}
                  className="rounded-lg p-3 focus:outline-none border-2 border-gray-400 transform-border duration-300 focus:border-emerald-500"
              />
              {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}

              <textarea
                  placeholder={t("contact.messagePlaceholder")}
                  rows="4"
                  {...register("message", { required: t("contact.messageError") })}
                  className="rounded-lg p-3 focus:outline-none border-2 border-gray-400 transform-border duration-300 focus:border-emerald-500 resize-none"
              ></textarea>
              {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
              )}

              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t("contact.sending") : t("contact.sendBtn")}
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </>
  );
}
