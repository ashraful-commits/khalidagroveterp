import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';
import { decrypt } from '@/lib/auth';

/**
 * Mobile Bridge API for Field Force App
 * Handles: Live order collection, GPS tracking logs, and Payment collection from the field.
 */

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mpoId = searchParams.get('mpoId');

    if (!mpoId) return sendError('MPO ID required', null, 400);

    const data = await prisma.$transaction([
      prisma.customer.findMany({ where: { mpoId } }),
      prisma.salesInvoice.findMany({ 
        where: { customer: { mpoId }, status: 'DRAFT' },
        include: { customer: true }
      }),
      prisma.salesTarget.findFirst({ 
        where: { userId: mpoId, month: new Date().getMonth() + 1, year: new Date().getFullYear() } 
      })
    ]);

    return sendSuccess('Mobile data synced', {
      customers: data[0],
      pendingOrders: data[1],
      monthlyTarget: data[2]
    });
  } catch (error: any) {
    return sendError('Sync failed', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (type === 'ORDER') {
      const order = await prisma.salesInvoice.create({
        data: {
          code: `MOB-${Date.now()}`,
          customerId: data.customerId,
          date: new Date(),
          status: 'DRAFT',
          totalAmount: data.totalAmount,
          items: {
            create: data.items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price
            }))
          }
        }
      });
      return sendSuccess('Order received for approval', { order });
    }

    if (type === 'COLLECTION') {
      const collection = await prisma.collection.create({
        data: {
          customerId: data.customerId,
          date: new Date(),
          amount: data.amount,
          method: data.method
        }
      });
      return sendSuccess('Collection recorded', { collection });
    }

    return sendError('Invalid request type', null, 400);
  } catch (error: any) {
    return sendError('Operation failed', error);
  }
}
