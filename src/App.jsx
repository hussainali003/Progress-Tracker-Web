import { BrowserRouter as Router, Routes, Route } from "react-router";

import DashboardPage from "./Pages/Dashboard";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";

export default function App() {
  return (
    <Router>
      <div className="flex w-full h-full">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}
