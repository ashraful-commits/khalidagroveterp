import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const quotations = await prisma.salesQuotation.findMany({
      orderBy: { createdAt: 'desc' },
      include: { customer: true, items: { include: { product: true } } }
    });
    return sendSuccess('Sales quotations retrieved', { quotations });
  } catch (error: any) {
    return sendError('Failed to fetch quotations', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerId, code, date, totalAmount, items } = body;
    
    const quotation = await prisma.salesQuotation.create({
      data: {
        customerId,
        code,
        date: new Date(date),
        totalAmount,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });
    
    return sendSuccess('Sales quotation created', { quotation }, 201);
  } catch (error: any) {
    return sendError('Failed to create quotation', error);
  }
}
