import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const accounts = await prisma.account.findMany({
      orderBy: { code: 'asc' },
      include: { children: true }
    });
    return sendSuccess('Chart of Accounts retrieved', { accounts });
  } catch (error: any) {
    return sendError('Failed to fetch accounts', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, name, type, parentId } = body;
    
    const account = await prisma.account.create({
      data: { code, name, type, parentId }
    });
    
    return sendSuccess('Account created', { account }, 201);
  } catch (error: any) {
    return sendError('Failed to create account', error);
  }
}
