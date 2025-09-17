import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import "./i18n";

// Components
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ForgotPassword from "./components/LoginSections/ForgotPassword";
import ResetPassword from "./components/LoginSections/ResetPassword";
import Links from "./pages/Links";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import "./i18n";

import {LanguageProvider} from "./Contexts/LangContext.jsx";

function App() {

  return (
    <LanguageProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          {/* Pages عامة */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<ForgotPassword />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />

          {/* Pages محمية */}
          <Route
            path="/links"
            element={
              <ProtectedRoute>
                <Links />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
