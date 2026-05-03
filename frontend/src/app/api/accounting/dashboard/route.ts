import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const [totalAssets, totalLiabilities, accounts] = await Promise.all([
      prisma.account.count({ where: { type: 'ASSET' } }),
      prisma.account.count({ where: { type: 'LIABILITY' } }),
      prisma.account.findMany({ take: 8, orderBy: { code: 'asc' } })
    ]);

    const recentJournals = await prisma.journalEntry.findMany({
      take: 5,
      orderBy: { date: 'desc' },
      include: { lines: { include: { account: { select: { name: true } } } } }
    });

    return sendSuccess('Accounting dashboard retrieved', {
      metrics: {
        totalAssets: 1250000, // Mock for now
        totalLiabilities: 450000,
        netEquity: 800000,
        cashBalance: 150000
      },
      accounts,
      recentJournals
    });
  } catch (error: any) {
    return sendError('Failed to fetch accounting dashboard', error);
  }
}
