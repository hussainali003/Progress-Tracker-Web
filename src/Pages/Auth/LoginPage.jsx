import { useState } from "react";

import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RxEnter } from "react-icons/rx";

import { useNavigate } from "react-router";

import { loginUser } from "../../api/auth";

import { loginSchema } from "../../validation/authSchema";

export default function LoginPage() {
  const navigation = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNavigateToRegister = () => {
    navigation("/register");
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // prevents full page refresh
    try {
      setError("");
      setIsLoading(true);

      const formData = { email, password };

      await loginSchema.validate(formData, { abortEarly: false });

      const loginResponse = await loginUser({ email, password });

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
    <div className="flex flex-1 items-center justify-center bg-[#171717]">
      <div className="flex flex-col w-[250px] shrink-0 sm:w-[30%] items-center justify-center">
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
        <form className="w-full" onSubmit={handleLogin}>
          <div className="w-full flex items-center justify-center gap-1 mb-3 mt-4 py-2 px-4 rounded-xl bg-[#424242] ">
            <FaEnvelope color="#909699" />
            <input
              className="w-full text-white placeholder-[#909699] border-0 bg-transparent focus:outline-none"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full flex items-center justify-center gap-1 mb-3 py-2 px-4 rounded-xl bg-[#424242] ">
            <FaLock color="#909699" />
            <input
              className="w-full text-white placeholder-[#909699] border-0 bg-transparent focus:outline-none"
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
              "Sign in"
            )}
          </button>
        </form>
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
    </div>
  );
}
