import * as z from 'zod';

export const salesOrderSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  date: z.string().min(1, 'Date is required'),
  items: z.array(z.object({
    productId: z.string().min(1, 'Product is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    price: z.number().min(0, 'Price cannot be negative'),
  })).min(1, 'At least one item is required'),
  notes: z.string().optional(),
});

export type SalesOrderInput = z.infer<typeof salesOrderSchema>;
