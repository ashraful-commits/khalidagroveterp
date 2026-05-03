import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const increments = await prisma.salaryIncrement.findMany({
      orderBy: { date: 'desc' }
    });
    return sendSuccess('Increments retrieved', { increments });
  } catch (error: any) {
    return sendError('Failed to fetch increments', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { employeeId, amount, date } = body;
    
    const increment = await prisma.salaryIncrement.create({
      data: {
        employeeId,
        amount,
        date: new Date(date)
      }
    });
    
    return sendSuccess('Increment created', { increment }, 201);
  } catch (error: any) {
    return sendError('Failed to create increment', error);
  }
}
