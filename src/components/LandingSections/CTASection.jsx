import { Link } from "react-router-dom";
function CTASection() {
  return (
    <section className="py-20 bg-gray-50 text-white text-center">
      <h2 className="text-4xl text-black font-medium mb-6">
        Ready to take control of your links?
      </h2>
      <p className="text-lg text-black mb-8">
        Start now and keep them safe forever.
      </p>
      <Link to="/links">
        <button className="bg-main-hover font-medium px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
          Try Dalil for Free
        </button>
      </Link>
    </section>
  );
}
export default CTASection;
