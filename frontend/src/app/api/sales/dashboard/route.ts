import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const [totalInvoices, pendingCollections, customers] = await Promise.all([
      prisma.salesInvoice.count(),
      prisma.salesInvoice.count({ where: { status: 'DRAFT' } }), // Assuming DRAFT means pending
      prisma.customer.count(),
    ]);

    const recentInvoices = await prisma.salesInvoice.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { customer: { select: { name: true } } }
    });

    const stats = await prisma.salesInvoice.aggregate({
      _sum: { totalAmount: true, collectedAmount: true },
    });

    return sendSuccess('Sales dashboard retrieved', {
      metrics: {
        totalSales: Number(stats._sum.totalAmount || 0),
        collected: Number(stats._sum.collectedAmount || 0),
        pending: Number(stats._sum.totalAmount || 0) - Number(stats._sum.collectedAmount || 0),
        totalInvoices,
        pendingCollections,
        totalCustomers: customers
      },
      recentInvoices
    });
  } catch (error: any) {
    return sendError('Failed to fetch sales dashboard', error);
  }
}
