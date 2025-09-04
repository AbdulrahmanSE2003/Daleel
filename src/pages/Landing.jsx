import Navbar from "../components/Navbar";
import FeaturesSection from "../components/LandingSections/FeaturesSection";
import HowItWorksSection from "../components/LandingSections/HowItWorksSection";
import HeroSection from "../components/LandingSections/HeroSection";
import CTASection from "../components/LandingSections/CTASection";
import Footer from "../components/Footer";
function Landing() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </>
  );
}

export default Landing;
