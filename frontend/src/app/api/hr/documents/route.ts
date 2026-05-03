import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const documents = await prisma.employeeDoc.findMany({
      orderBy: { createdAt: 'desc' },
      include: { employee: true }
    });
    return sendSuccess('Documents retrieved', { documents });
  } catch (error: any) {
    return sendError('Failed to fetch documents', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { employeeId, title, url } = body;
    
    const doc = await prisma.employeeDoc.create({
      data: {
        employeeId,
        title,
        url
      }
    });
    
    return sendSuccess('Document uploaded', { doc }, 201);
  } catch (error: any) {
    return sendError('Failed to upload document', error);
  }
}
