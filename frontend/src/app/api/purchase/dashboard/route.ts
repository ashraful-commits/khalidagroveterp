import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const [totalPOs, pendingPOs, vendors] = await Promise.all([
      prisma.purchaseOrder.count(),
      prisma.purchaseOrder.count({ where: { status: 'PENDING' } }),
      prisma.vendor.count(),
    ]);

    const recentPOs = await prisma.purchaseOrder.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { vendor: { select: { name: true } } }
    });

    // Mock total spend for now or calculate from POs
    const totalSpend = await prisma.purchaseOrder.aggregate({
      _sum: { totalAmount: true },
      where: { status: 'APPROVED' }
    });

    return sendSuccess('Purchase dashboard retrieved', {
      metrics: { 
        totalPOs, 
        pendingPOs, 
        totalVendors: vendors, 
        totalSpend: Number(totalSpend._sum.totalAmount || 0) 
      },
      recentPOs
    });
  } catch (error: any) {
    return sendError('Failed to fetch purchase dashboard', error);
  }
}
