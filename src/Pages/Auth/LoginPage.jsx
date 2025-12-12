import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RxEnter } from "react-icons/rx";
import { useNavigate } from "react-router";
import { loginUser } from "../../api/auth";
import authImage from "../../assets/images/authImage.jpg";
import { loginSchema } from "../../validation/authSchema";

export default function LoginPage() {
  const navigation = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleNavigateToRegister = () => {
    navigation("/register");
  };

  const handleLogin = async () => {
    try {
      setError("");

      const formData = { email, password };

      await loginSchema.validate(formData, { abortEarly: false });

      const data = await loginUser({ email, password });

      console.log("REGISTER SUCCESS:", data);

      navigation("/dashboard");
    } catch (err) {
      console.log("REGISTER ERROR:", err.message);
      if (err.name === "ValidationError") {
        setError(err.errors[0]);
      } else {
        setError(err.message || "An unknown registration error occurred.");
      }
    }
  };

  return (
    <div className="h-full w-full flex">
      <div className="h-full flex flex-1 flex-col items-center justify-center px-24 bg-[#2F262F]">
        <div className="flex flex-col items-center mt-2">
          <button
            type="button"
            onClick={handleNavigateToRegister}
            className="group flex justify-center mb-4 py-4 px-4 rounded-2xl bg-white shadow-lg cursor-pointer"
          >
            <RxEnter
              className="text-black transition duration-300 group-hover:text-[#00A82E]"
              size={28}
            />
          </button>
          <h1 className="font-medium text-2xl text-[#ffffff]">Sign in with email</h1>
        </div>
        {/* input fields */}
        <div className="w-full flex items-center justify-center gap-1 mb-3 mt-4 py-2 px-4 rounded-xl bg-white ">
          <FaEnvelope color="#909699" />
          <input
            className="w-full text-[#2F262F] placeholder-[#909699] border-0 bg-transparent focus:outline-none"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full flex items-center justify-center gap-1 mb-3 py-2 px-4 rounded-xl bg-white ">
          <FaLock color="#909699" />
          <input
            className="w-full text-[#2F262F] placeholder-[#909699] border-0 bg-transparent focus:outline-none"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* error message */}
        {error && <p className="mb-3 text-center  text-red-400">{error}</p>}
        {/* sign up button */}
        <button
          type="submit"
          className="w-full flex justify-center mb-4 py-2 px-4 rounded-xl text-[#2F262F] bg-white cursor-pointer hover:opacity-75 transition duration-300"
          onClick={handleLogin}
        >
          Sign in
        </button>
        {/* divider */}
        <div className="w-full flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-[#909699]" />
          <p className="text-sm text-[#909699] whitespace-nowrap">Or sign in with</p>
          <div className="flex-1 h-px bg-[#909699]" />
        </div>
        {/* google button */}
        <button
          type="button"
          className="flex justify-center py-3 px-3 rounded-xl bg-white shadow-sm cursor-pointer hover:opacity-75 transition duration-300"
        >
          <FcGoogle size={20} />
        </button>
      </div>
      <div className="h-full flex-3">
        <img className="h-full w-full" src={authImage} alt="authImage" />
      </div>
    </div>
  );
}
