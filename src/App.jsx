import { Route, BrowserRouter as Router, Routes } from "react-router";

import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import DashboardPage from "./Pages/Dashboard";

import "react-day-picker/style.css";

export default function App() {
  return (
    <Router>
      <div className="flex w-full h-full">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}
