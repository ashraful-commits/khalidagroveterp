import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const requests = await prisma.inventoryRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return sendSuccess('Inventory requests retrieved', { requests });
  } catch (error: any) {
    return sendError('Failed to fetch requests', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { itemId, quantity, requestedBy } = body;
    
    const request = await prisma.inventoryRequest.create({
      data: {
        itemId,
        quantity,
        requestedBy
      }
    });
    
    return sendSuccess('Inventory request created', { request }, 201);
  } catch (error: any) {
    return sendError('Failed to create request', error);
  }
}
