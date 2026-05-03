import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const where = search ? { name: { contains: search, mode: 'insensitive' as any } } : {};

    const customers = await prisma.customer.findMany({
      where,
      orderBy: { name: 'asc' }
    });

    return sendSuccess('Customers retrieved', { customers });
  } catch (error: any) {
    return sendError('Failed to fetch customers', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, area, creditLimit, openingBalance, mpoId } = body;
    const code = `CUST-${Date.now()}`;

    const customer = await prisma.customer.create({
      data: {
        code,
        name,
        phone,
        area,
        creditLimit: creditLimit || 0,
        balance: openingBalance || 0,
        mpoId
      }
    });

    return sendSuccess('Customer created', { customer }, 201);
  } catch (error: any) {
    return sendError('Failed to create customer', error);
  }
}
