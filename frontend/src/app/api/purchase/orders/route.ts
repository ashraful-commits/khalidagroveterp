import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const where: any = status ? { status } : {};

    const orders = await prisma.purchaseOrder.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { 
        vendor: { select: { name: true } },
        items: { include: { product: { select: { name: true } } } }
      }
    });

    return sendSuccess('Purchase orders retrieved', { orders });
  } catch (error: any) {
    return sendError('Failed to fetch orders', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { vendorId, items } = body;
    const code = `PO-${Date.now()}`;
    const totalAmount = items.reduce((sum: number, i: any) => sum + (i.quantity * i.price), 0);

    const order = await prisma.purchaseOrder.create({
      data: {
        code,
        vendorId,
        date: new Date(),
        status: 'PENDING',
        totalAmount,
        items: {
          create: items.map((i: any) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price
          }))
        }
      },
      include: { vendor: true, items: true }
    });

    return sendSuccess('Purchase order created', { order }, 201);
  } catch (error: any) {
    return sendError('Failed to create order', error);
  }
}
