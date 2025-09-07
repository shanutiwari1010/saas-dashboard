import { z } from "zod";

// Zod validation schema
export const orderFormSchema = z.object({
  userName: z
    .string()
    .min(1, "User name is required")
    .min(2, "User name must be at least 2 characters")
    .max(50, "User name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "User name can only contain letters and spaces"),
  project: z
    .string()
    .min(1, "Project name is required")
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name must be less than 100 characters"),
  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),
  status: z.enum([
    "Pending",
    "In Progress",
    "Complete",
    "Approved",
    "Rejected",
  ]),
  avatar: z.string().optional(),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;
