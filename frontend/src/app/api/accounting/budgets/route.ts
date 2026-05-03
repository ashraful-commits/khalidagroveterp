import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const budgets = await prisma.budget.findMany({
      orderBy: { year: 'desc' },
      include: { lines: true }
    });
    return sendSuccess('Budgets retrieved', { budgets });
  } catch (error: any) {
    return sendError('Failed to fetch budgets', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, year, lines } = body;
    
    const budget = await prisma.budget.create({
      data: {
        name,
        year,
        lines: {
          create: lines.map((l: any) => ({
            accountId: l.accountId,
            amount: l.amount
          }))
        }
      }
    });
    
    return sendSuccess('Budget created', { budget }, 201);
  } catch (error: any) {
    return sendError('Failed to create budget', error);
  }
}
