import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const quotations = await prisma.purchaseQuotation.findMany({
      orderBy: { createdAt: 'desc' },
      include: { vendor: true, items: { include: { product: true } } }
    });
    return sendSuccess('Purchase quotations retrieved', { quotations });
  } catch (error: any) {
    return sendError('Failed to fetch quotations', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { vendorId, code, date, validUntil, totalAmount, items } = body;
    
    const quotation = await prisma.purchaseQuotation.create({
      data: {
        vendorId,
        code,
        date: new Date(date),
        validUntil: validUntil ? new Date(validUntil) : null,
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
    
    return sendSuccess('Purchase quotation created', { quotation }, 201);
  } catch (error: any) {
    return sendError('Failed to create quotation', error);
  }
}
