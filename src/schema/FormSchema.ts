import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
});

export type FormData = z.infer<typeof schema>;

export interface DataType extends FormData {
  id: string;
}
