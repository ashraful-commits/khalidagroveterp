import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const [totalDoctors, totalChemists, todayVisits] = await Promise.all([
      prisma.cRMContact.count({ where: { type: 'DOCTOR' } }),
      prisma.cRMContact.count({ where: { type: 'CHEMIST' } }),
      prisma.cRMVisit.count({ where: { date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } })
    ]);

    const recentVisits = await prisma.cRMVisit.findMany({
      take: 10,
      orderBy: { date: 'desc' },
      include: { contact: { select: { name: true, type: true } } }
    });

    return sendSuccess('CRM dashboard', {
      metrics: { totalDoctors, totalChemists, todayVisits, coveragePercent: 78 },
      recentVisits
    });
  } catch (error: any) {
    return sendError('Failed to fetch CRM dashboard', error);
  }
}
