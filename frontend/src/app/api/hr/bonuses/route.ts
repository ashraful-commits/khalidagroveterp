import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const bonuses = await prisma.bonus.findMany({
      orderBy: { date: 'desc' }
    });
    return sendSuccess('Bonuses retrieved', { bonuses });
  } catch (error: any) {
    return sendError('Failed to fetch bonuses', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { employeeId, amount, date, reason } = body;
    
    const bonus = await prisma.bonus.create({
      data: {
        employeeId,
        amount,
        date: new Date(date),
        reason
      }
    });
    
    return sendSuccess('Bonus created', { bonus }, 201);
  } catch (error: any) {
    return sendError('Failed to create bonus', error);
  }
}
