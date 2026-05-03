import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const where: any = status ? { status } : {};

    const leaves = await prisma.leave.findMany({
      where,
      orderBy: { startDate: 'desc' },
      include: { employee: { select: { name: true, empId: true } } }
    });

    return sendSuccess('Leaves retrieved', { leaves });
  } catch (error: any) {
    return sendError('Failed to fetch leaves', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { employeeId, type, startDate, endDate } = body;

    const leave = await prisma.leave.create({
      data: {
        employeeId,
        type,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: 'PENDING'
      }
    });

    return sendSuccess('Leave requested', { leave }, 201);
  } catch (error: any) {
    return sendError('Failed to create leave', error);
  }
}
