import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Simulate slight delay (optional)
    setTimeout(() => {
      if (token) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }, 300);
  }, [navigate]);

  return (
    <div className="h-full w-full flex items-center justify-center bg-[#171717]">
      <div className="w-5 h-5 border-2 border-[#2F262F] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
