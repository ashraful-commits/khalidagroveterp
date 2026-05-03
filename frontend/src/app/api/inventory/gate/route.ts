import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const logs = await prisma.gateLog.findMany({
      orderBy: { time: 'desc' }
    });
    return sendSuccess('Gate logs retrieved', { logs });
  } catch (error: any) {
    return sendError('Failed to fetch logs', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, vehicleNo, driverName, purpose } = body;
    
    const log = await prisma.gateLog.create({
      data: {
        type,
        vehicleNo,
        driverName,
        purpose
      }
    });
    
    return sendSuccess('Gate log created', { log }, 201);
  } catch (error: any) {
    return sendError('Failed to create log', error);
  }
}
