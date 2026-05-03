import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const warehouses = await prisma.warehouse.findMany({
      orderBy: { name: 'asc' },
      include: { 
        _count: { select: { stockLedgers: true } }
      }
    });
    return sendSuccess('Warehouses retrieved', { warehouses });
  } catch (error: any) {
    return sendError('Failed to fetch warehouses', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, location } = body;
    
    const warehouse = await prisma.warehouse.create({
      data: { name, location }
    });
    
    return sendSuccess('Warehouse created', { warehouse }, 201);
  } catch (error: any) {
    return sendError('Failed to create warehouse', error);
  }
}
