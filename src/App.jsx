import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Landing from "./pages/Landing";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<div>App</div>} />
        <Route path="/dashboard" element={<div>dashboard</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<div>Forget Password</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
