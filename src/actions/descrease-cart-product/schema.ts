import { z } from "zod";

export const decreaseCartProductSchema = z.object({
  cartItemId: z.uuid(),
});

export type DecreaseCartProductSchema = z.infer<
  typeof decreaseCartProductSchema
>;
