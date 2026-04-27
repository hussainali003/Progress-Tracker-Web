import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  email: yup.string().email("Invalid email format").required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/,
      "Password must contain both letters and numbers",
    ),
});

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),

  password: yup.string().required("Password is required"),
});

export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type LoginFormData = yup.InferType<typeof loginSchema>;
