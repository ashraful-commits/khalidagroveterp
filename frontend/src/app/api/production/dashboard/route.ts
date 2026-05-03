import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const inProgress: any[] = ['PLANNED', 'IN_PROGRESS', 'MIXING', 'PACKING'];
    const [activeOrders, completedOrders, totalBOMs] = await Promise.all([
      prisma.productionOrder.count({ where: { status: { in: inProgress } } }),
      prisma.productionOrder.count({ where: { status: 'COMPLETED' } }),
      prisma.bOM.count()
    ]);

    const orders = await prisma.productionOrder.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      include: { 
        bom: { 
          include: { 
            finishedProduct: { select: { name: true } } 
          } 
        } 
      }
    });

    return sendSuccess('Production dashboard', {
      metrics: { activeOrders, completedOrders, totalBOMs, yieldRate: 95 },
      orders
    });
  } catch (error: any) {
    return sendError('Failed to fetch production dashboard', error);
  }
}
