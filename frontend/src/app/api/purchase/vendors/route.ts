import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 20;
    const search = searchParams.get('search');
    
    const skip = (page - 1) * limit;
    const where = search ? { name: { contains: search, mode: 'insensitive' as any } } : {};

    const [vendors, total] = await Promise.all([
      prisma.vendor.findMany({ 
        where, 
        skip, 
        take: limit, 
        orderBy: { createdAt: 'desc' } 
      }),
      prisma.vendor.count({ where })
    ]);

    return sendSuccess('Vendors retrieved', { vendors, meta: { page, limit, total } });
  } catch (error: any) {
    return sendError('Failed to fetch vendors', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, address, openingBalance } = body;
    const code = `VND-${Date.now()}`;
    
    const vendor = await prisma.vendor.create({
      data: { 
        code, 
        name, 
        phone, 
        email, 
        address, 
        balance: openingBalance || 0 
      }
    });

    return sendSuccess('Vendor created', { vendor }, 201);
  } catch (error: any) {
    return sendError('Failed to create vendor', error);
  }
}
