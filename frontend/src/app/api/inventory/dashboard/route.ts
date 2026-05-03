import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const [totalProducts, totalWarehouses] = await Promise.all([
      prisma.product.count(),
      prisma.warehouse.count(),
    ]);

    const allProducts = await prisma.product.findMany({
      take: 10,
      select: { id: true, name: true, sku: true, reorderLevel: true }
    });

    const recentMovements = await prisma.stockLedger.findMany({
      take: 10,
      orderBy: { date: 'desc' },
      include: { 
        product: { select: { name: true } }, 
        warehouse: { select: { name: true } } 
      }
    });

    return sendSuccess('Inventory dashboard retrieved', {
      metrics: { totalProducts, lowStock: 0, totalWarehouses, totalValue: 0 },
      recentMovements, 
      lowStockProducts: allProducts
    });
  } catch (error: any) {
    return sendError('Failed to fetch inventory dashboard', error);
  }
}
