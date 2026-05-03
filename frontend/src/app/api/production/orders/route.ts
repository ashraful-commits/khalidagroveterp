import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const orders = await prisma.productionOrder.findMany({
      orderBy: { createdAt: 'desc' },
      include: { 
        bom: { include: { finishedProduct: true } },
        steps: true
      }
    });
    return sendSuccess('Production orders retrieved', { orders });
  } catch (error: any) {
    return sendError('Failed to fetch orders', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bomId, plannedQty, startDate } = body;
    
    const order = await prisma.productionOrder.create({
      data: { 
        bomId, 
        plannedQty, 
        startDate: startDate ? new Date(startDate) : undefined,
        status: 'PLANNED'
      }
    });
    
    return sendSuccess('Production order created', { order }, 201);
  } catch (error: any) {
    return sendError('Failed to create order', error);
  }
}
