import { type FormEvent, useState } from "react";

import { useNavigate } from "react-router";

import { ValidationError } from "yup";

import { loginUser } from "../../api/auth";

import { loginSchema } from "../../validation/authSchema";

import AuthForm from "./components/AuthForm";

export default function LoginPage() {
  const navigation = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleNavigateToRegister = () => {
    navigation("/register");
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError("");
      setIsLoading(true);

      const formData = { email, password };

      await loginSchema.validate(formData, { abortEarly: false });

      const loginResponse = await loginUser({ email, password });

      localStorage.setItem("token", loginResponse.token);

      navigation("/dashboard");
    } catch (err) {
      if (err instanceof ValidationError) {
        setError(err.errors[0]);
      } else if (err instanceof Error) {
        setError(err.message || "An unknown registration error occurred.");
      } else {
        setError("An unknown registration error occurred.");
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
