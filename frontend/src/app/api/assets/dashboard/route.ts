import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const [total, underMaintenance] = await Promise.all([
      prisma.asset.count(),
      prisma.asset.count({ where: { status: 'MAINTENANCE' } }),
    ]);

    const assets = await prisma.asset.findMany({ take: 10, orderBy: { createdAt: 'desc' } });
    const totalValue = assets.reduce((s: number, a: any) => s + Number(a.purchaseValue), 0);

    return sendSuccess('Asset dashboard', { 
      metrics: { total, underMaintenance, totalValue, fullyDepreciated: 0 }, 
      assets 
    });
  } catch (error: any) {
    return sendError('Failed to fetch asset dashboard', error);
  }
}
