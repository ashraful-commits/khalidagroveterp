import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const where: any = status ? { status } : {};

    const invoices = await prisma.salesInvoice.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { 
        customer: { select: { name: true, code: true } },
        items: { include: { product: { select: { name: true } } } }
      }
    });

    return sendSuccess('Invoices retrieved', { invoices });
  } catch (error: any) {
    return sendError('Failed to fetch invoices', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerId, items } = body;
    const code = `INV-${Date.now()}`;
    const totalAmount = items.reduce((sum: number, i: any) => sum + (i.quantity * i.price), 0);

    const invoice = await prisma.salesInvoice.create({
      data: {
        code,
        customerId,
        date: new Date(),
        status: 'DRAFT',
        totalAmount,
        items: {
          create: items.map((i: any) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
            discount: i.discount || 0
          }))
        }
      },
      include: { customer: true, items: true }
    });

    return sendSuccess('Invoice created', { invoice }, 201);
  } catch (error: any) {
    return sendError('Failed to create invoice', error);
  }
}
