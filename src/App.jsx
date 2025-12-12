import { Route, BrowserRouter as Router, Routes } from "react-router";

import AuthPage from "./Pages/Auth/AuthPage";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import DashboardPage from "./Pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <Router>
      <div className="flex w-full h-full">
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
        </Routes>
      </div>
    </Router>
  );
}
