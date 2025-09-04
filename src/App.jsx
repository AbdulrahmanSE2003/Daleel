import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ForgotPassword from "./components/LoginSections/ForgotPassword";
import ResetPassword from "./components/LoginSections/ResetPassword";
import Links from "./pages/Links";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/links" element={<Links />} />
        <Route path="/profile" element={<div>profile</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
