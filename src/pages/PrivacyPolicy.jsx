import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-20 px-6">
        <div className="max-w-3xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-3xl font-semibold text-emerald-700 mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            At <span className="font-medium text-emerald-600">Daleel</span>, we
            respect your privacy. We don’t collect personal data beyond what’s
            necessary for using the platform. Your information is safe with us.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We don’t sell, share, or misuse your data. Any information you
            provide (like your email for login) is only used to help you access
            and enjoy our services.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Since our platform is still simple, we don’t have complicated terms
            or legal jargon. If we ever update this policy, we’ll make sure to
            let you know clearly.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions, feel free to contact us at{" "}
            <a
              href="mailto:daleel.getapp@gmail.com"
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
