import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function AuthPage() {
  const navigate = useNavigate();

  // useEffect run after the first render
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Simulate slight delay (optional)
    const id = setTimeout(() => {
      if (token) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }, 300);

    return () => clearTimeout(id);
  }, [navigate]);

  return (
    <div className="flex flex-1 items-center justify-center bg-[#171717]">
      <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
