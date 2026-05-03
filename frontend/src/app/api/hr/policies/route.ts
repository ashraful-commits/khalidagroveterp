import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const policies = await prisma.hRPolicy.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return sendSuccess('Policies retrieved', { policies });
  } catch (error: any) {
    return sendError('Failed to fetch policies', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, category, content } = body;
    
    const policy = await prisma.hRPolicy.create({
      data: {
        title,
        category,
        content
      }
    });
    
    return sendSuccess('Policy created', { policy }, 201);
  } catch (error: any) {
    return sendError('Failed to create policy', error);
  }
}
