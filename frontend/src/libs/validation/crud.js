import { z } from "zod";

export const VSCreateResep = z.object({
  name: z.string({ required_error: "Nama tidak boleh kosong" }).min(1, {
    message: "Nama tidak harus diisi",
  }),
  culture: z
    .string({ required_error: "Asal negara / Kebudayaan harus diisi" })
    .min(1, {
      message: "Asal negara / Kebudayaan harus diisi",
    }),

  ingredients: z.string({ required_error: "Bahan-bahan harus diisi" }).min(1, {
    message: "Bahan-bahan harus diisi",
  }),
  categories_id: z.any().refine((val) => val, {
    message: "Kategori harus diisi",
  }),
  alternatifIngredient: z
    .string({ required_error: "Bahan-bahan alternatif harus diisi" })
    .min(1, {
      message: "Bahan-bahan alternatif harus diisi",
    }),
  history: z.string({ required_error: "Sejarah singkat harus diisi" }).min(1, {
    message: "Sejarah singkat harus diisi",
  }),
  description: z
    .string({ required_error: "Deskripsi / Langkah-langkah harus diisi" })
    .min(1, {
      message: "Deskripsi / Langkah-langkah harus diisi",
    }),
});
