import { useState, type ChangeEvent, type HTMLInputTypeAttribute } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import type { IconType } from "react-icons";

type AuthInputFieldProps = {
  icon: IconType;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isFirst?: boolean;
};

export default function AuthInputField({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  isFirst,
}: AuthInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div
      className={`w-full flex items-center justify-center gap-1 mb-3 ${
        isFirst ? "mt-4" : ""
      } py-2 px-4 rounded-xl bg-[#424242]`}
    >
      <Icon color="#909699" />
      <input
        className="w-full text-white placeholder-[#909699] border-0 bg-transparent focus:outline-none"
        placeholder={placeholder}
        type={inputType}
        value={value}
        onChange={onChange}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="text-[#909699] hover:text-white transition duration-200 cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
}
