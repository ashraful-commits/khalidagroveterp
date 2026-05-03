import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const [totalEmployees, onLeave] = await Promise.all([
      prisma.employee.count({ where: { status: 'ACTIVE' } }),
      prisma.leave.count({ where: { status: 'APPROVED', endDate: { gte: new Date() } } }),
    ]);

    const recentEmployees = await prisma.employee.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { 
        id: true, 
        empId: true, 
        name: true, 
        status: true, 
        joinDate: true, 
        basicSalary: true, 
        departmentId: true 
      }
    });

    return sendSuccess('HR dashboard retrieved', {
      metrics: { 
        totalEmployees, 
        onLeave, 
        presentToday: totalEmployees - onLeave, 
        pendingPayroll: 0 
      },
      recentEmployees
    });
  } catch (error: any) {
    return sendError('Failed to fetch HR dashboard', error);
  }
}
