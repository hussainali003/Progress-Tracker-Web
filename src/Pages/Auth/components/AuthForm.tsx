import type { Dispatch, FormEvent, SetStateAction } from "react";

import { FaEnvelope, FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { RxEnter } from "react-icons/rx";

import AuthInputField from "./AuthInputField";

type AuthFormProps = {
  name?: string;
  email: string;
  password: string;
  error: string;
  isLoading: boolean;
  title: string;
  subtitle?: string;
  submitText: string;
  showNameField?: boolean;
  setName?: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onNavigate: () => void;
};

export default function AuthForm({
  name,
  email,
  password,
  error,
  isLoading,
  title,
  subtitle,
  submitText,
  showNameField = false,
  setName,
  setEmail,
  setPassword,
  onSubmit,
  onNavigate,
}: AuthFormProps) {
  return (
    <div className="flex flex-1 items-center justify-center bg-[#171717]">
      <div className="flex flex-col w-[250px] shrink-0 sm:w-[30%] items-center justify-center">
        <button
          type="button"
          onClick={onNavigate}
          className="group flex justify-center mb-4 py-4 px-4 rounded-2xl bg-white shadow-lg cursor-pointer"
        >
          <RxEnter
            className="text-black transition duration-300 group-hover:text-[#00A82E]"
            size={28}
          />
        </button>

        <div className="flex flex-col items-center mt-2">
          <h1 className="font-medium text-2xl text-[#ffffff]">{title}</h1>
          {subtitle && <p className="text-[#909699] text-center">{subtitle}</p>}
        </div>

        <form className="w-full" onSubmit={onSubmit}>
          {showNameField && (
            <AuthInputField
              icon={FaUser}
              type="text"
              placeholder="Name"
              value={name ?? ""}
              onChange={(e) => setName?.(e.target.value)}
              isFirst
            />
          )}
          <AuthInputField
            icon={FaEnvelope}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isFirst={!showNameField}
          />
          <AuthInputField
            icon={FaLock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="mb-3 text-center text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center mb-4 py-2 px-4 rounded-xl text-[#2F262F] bg-white cursor-pointer hover:opacity-75 transition duration-300 disabled:opacity-75"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#2F262F] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              submitText
            )}
          </button>
        </form>

        <div className="w-full flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-[#909699]" />
          <p className="text-sm text-[#909699] whitespace-nowrap">Or sign up with</p>
          <div className="flex-1 h-px bg-[#909699]" />
        </div>

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
