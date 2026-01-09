import { useState } from "react";

import { FaEnvelope, FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { RxEnter } from "react-icons/rx";

import { useNavigate } from "react-router";

import { loginUser, registerUser } from "../../api/auth";

import authImage from "../../assets/images/authImage.jpg";

import { registerSchema } from "../../validation/authSchema";

export default function RegisterPage() {
  const navigation = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNavigateToLogin = () => {
    navigation("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // prevents full page refresh
    try {
      setError("");
      setIsLoading(true);

      const formData = { name, email, password };

      await registerSchema.validate(formData, { abortEarly: false });

      await registerUser({ name, email, password });

      // 2. Auto-login user after successful registration
      const loginResponse = await loginUser({ email, password });

      // 3. Save token to localStorage
      localStorage.setItem("token", loginResponse.token);

      navigation("/dashboard");
    } catch (err) {
      if (err.name === "ValidationError") {
        setError(err.errors[0]);
      } else {
        setError(err.message || "An unknown registration error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1">
      <div className="h-full flex flex-1 flex-col items-center justify-center px-24 bg-[#2F262F]">
        <button
          type="button"
          onClick={handleNavigateToLogin}
          className="group flex justify-center mb-4 py-4 px-4 rounded-2xl bg-white shadow-lg cursor-pointer"
        >
          <RxEnter
            className="text-black transition duration-300 group-hover:text-[#00A82E]"
            size={28}
          />
        </button>
        <div className="flex flex-col items-center mt-2">
          <h1 className="font-medium text-2xl text-[#ffffff]">Sign up for free</h1>
          <p className="text-[#909699] text-center">Track every progress in one place</p>
        </div>
        {/* error message */}
        {/* input fields */}
        <form className="w-full" onSubmit={handleRegister}>
          <div className="w-full flex items-center justify-center gap-1 mb-3 mt-4 py-2 px-4 rounded-xl bg-white ">
            <FaUser color="#909699" />
            <input
              className="w-full text-[#2F262F] placeholder-[#909699] border-0 bg-transparent focus:outline-none"
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full flex items-center justify-center gap-1 mb-3 py-2 px-4 rounded-xl bg-white ">
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
            disabled={isLoading}
            className="w-full flex justify-center items-center mb-4 py-2 px-4 rounded-xl text-[#2F262F] bg-white cursor-pointer hover:opacity-75 transition duration-300 disabled:opacity-75"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#2F262F] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign up"
            )}
          </button>
        </form>
        {/* divider */}
        <div className="w-full flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-[#909699]" />
          <p className="text-sm text-[#909699] whitespace-nowrap">Or sign up with</p>
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
