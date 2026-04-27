import { useState } from "react";

import { useNavigate } from "react-router";

import { loginUser, registerUser } from "../../api/auth";

import { registerSchema } from "../../validation/authSchema";

import AuthForm from "./components/AuthForm";

export default function RegisterPage() {
  const navigation = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNavigateToLogin = () => {
    navigation("/login");
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
    <AuthForm
      title="Sign up for free"
      subtitle="Track every progress in one place"
      submitText="Sign up"
      onNavigate={handleNavigateToLogin}
      onSubmit={handleRegister}
      isLoading={isLoading}
      error={error}
      showNameField
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
    />
  );
}
