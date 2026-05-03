import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const boms = await prisma.bOM.findMany({
      include: {
        finishedProduct: { select: { name: true, sku: true } },
        items: { include: { product: { select: { name: true, sku: true } } } }
      }
    });
    return sendSuccess('BOMs retrieved', { boms });
  } catch (error: any) {
    return sendError('Failed to fetch BOMs', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { finishedProductId, name, items } = body;
    
    const bom = await prisma.bOM.create({
      data: {
        finishedProductId,
        name,
        items: {
          create: items.map((i: any) => ({
            productId: i.productId,
            quantity: i.quantity
          }))
        }
      },
      include: { finishedProduct: true, items: true }
    });

    return sendSuccess('BOM created', { bom }, 201);
  } catch (error: any) {
    return sendError('Failed to create BOM', error);
  }
}
