import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ForgotPassword from "./components/LoginSections/ForgotPassword";
import ResetPassword from "./components/LoginSections/ResetPassword";
import Links from "./pages/Links";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages عامة */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* Pages محمية */}
        <Route
          path="/links"
          element={
            <ProtectedRoute>
              <Links />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
