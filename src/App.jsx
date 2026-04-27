import { Route, BrowserRouter as Router, Routes } from "react-router";

import "react-day-picker/dist/style.css";

import ProtectedRoute from "./navigation/ProtectedRoute";
import AuthPage from "./pages/Auth/AuthPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import DashboardPage from "./pages/Dashboard";
import HabitDetail from "./pages/HabitDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* splash screen — decides where to go */}
        <Route path="/" element={<AuthPage />} />

        {/* public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/habit/:habitId"
          element={
            <ProtectedRoute>
              <HabitDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
