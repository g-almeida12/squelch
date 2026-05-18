import { z } from "zod";

export const IdSchema = z
  .string()
  .or(z.number())
  .pipe(z.coerce.number())
  .refine((num) => !isNaN(num) && num > 0, {
    message: "ID inválido fornecido.",
  });
