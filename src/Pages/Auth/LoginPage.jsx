import { useState } from "react";

import { useNavigate } from "react-router";

import { loginUser } from "../../api/auth";

import { loginSchema } from "../../validation/authSchema";

import AuthForm from "./components/AuthForm";

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
    <AuthForm
      title="Sign in with email"
      submitText="Sign in"
      onNavigate={handleNavigateToRegister}
      onSubmit={handleLogin}
      isLoading={isLoading}
      error={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
    />
  );
}
