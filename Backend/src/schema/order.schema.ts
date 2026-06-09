import { z } from "zod";

export const createOrderSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  address: z.string().min(5, "Địa chỉ quá ngắn"),
  items: z.array(
    z.object({
      id: z.number(),
      quantity: z.number().min(1),
      price: z.number(),
      name: z.string(),
    }),
  ),
  total: z.number().min(0),
  isPaid: z.boolean(),
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>;
