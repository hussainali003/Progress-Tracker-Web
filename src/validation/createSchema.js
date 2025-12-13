import * as yup from "yup";

export const createHabitSchema = yup.object().shape({
  habit: yup
    .string()
    .required("Habit name is required")
    .min(2, "Habit name must be at least 2 characters")
    .max(50, "Habit name must be at most 50 characters"),

  color: yup
    .string()
    .required("Color is required")
    .matches(/^[0-9A-Fa-f]{6}$/, "Color must be a valid hex code (e.g. FF5733)"),

  repeat: yup
    .array()
    .of(yup.string().required())
    .min(1, "Select at least one repeat day")
    .required("Repeat is required"),

  startDate: yup.date().required("Start date is required").typeError("Invalid start date"),

  endDate: yup
    .date()
    .nullable()
    .min(yup.ref("startDate"), "End date cannot be before start date")
    .typeError("Invalid end date"),
});
