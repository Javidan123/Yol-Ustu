import { z } from "zod";

const dishValidation = z.object({
    name: z.string().min(1, "Name is required").max(30, "Name too long"),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
    img: z.string().url("Invalid image URL").optional()
})

export default dishValidation