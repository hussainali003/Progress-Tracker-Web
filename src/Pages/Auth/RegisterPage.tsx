import { type FormEvent, useState } from "react";

import { useNavigate } from "react-router";

import { ValidationError } from "yup";

import { loginUser, registerUser } from "../../api/auth";

import { registerSchema } from "../../validation/authSchema";

import AuthForm from "./components/AuthForm";

export default function RegisterPage() {
  const navigation = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleNavigateToLogin = () => {
    navigation("/login");
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError("");
      setIsLoading(true);

      const formData = { name, email, password };

      await registerSchema.validate(formData, { abortEarly: false });

      await registerUser({ name, email, password });

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
