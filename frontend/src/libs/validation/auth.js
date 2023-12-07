import { z } from "zod";

export const VSRegister = z.object({
  name: z.string({ required_error: "Nama tidak boleh kosong" }).min(1, {
    message: "Nama tidak harus diisi",
  }),
  email: z
    .string({ required_error: "Email harus diisi" })
    .email({ message: "Email harus valid" })
    .min(1, { message: "Email harus diisi" }),
  password: z.string({ required_error: "Password harus diisi" }).min(6, {
    message: "Password minimal 6 karakter",
  }),
});

export const VSLogin = z.object({
  email: z
    .string({ required_error: "Email harus diisi" })
    .email({ message: "Email harus valid" })
    .min(1, { message: "Email harus diisi" }),
  password: z.string({ required_error: "Password harus diisi" }).min(1, {
    message: "Password harus diisi",
  }),
});
