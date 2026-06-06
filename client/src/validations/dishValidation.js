import { z } from "zod";

export const dishSchema = z.object({
    name: z.string().min(1, "Ad boş ola bilməz"),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Qiymət yalnız sayılardan ibarət olmalıdır"),
    img: z.string().url("URL formatında olmalıdır")
})