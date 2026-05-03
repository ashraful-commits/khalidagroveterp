import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const where: any = status ? { status } : {};

    const requisitions = await prisma.purchaseRequisition.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { items: { include: { product: { select: { name: true } } } } }
    });

    return sendSuccess('Requisitions retrieved', { requisitions });
  } catch (error: any) {
    return sendError('Failed to fetch requisitions', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, requestedBy } = body;
    const code = `PR-${Date.now()}`;

    const requisition = await prisma.purchaseRequisition.create({
      data: {
        code,
        date: new Date(),
        requestedBy: requestedBy || 'System',
        status: 'PENDING',
        items: {
          create: items.map((i: any) => ({
            productId: i.productId,
            quantity: i.quantity
          }))
        }
      },
      include: { items: true }
    });

    return sendSuccess('Requisition created', { requisition }, 201);
  } catch (error: any) {
    return sendError('Failed to create requisition', error);
  }
}
