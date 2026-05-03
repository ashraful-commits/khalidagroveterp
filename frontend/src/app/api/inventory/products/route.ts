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
    const where: any = search ? { name: { contains: search, mode: 'insensitive' as any } } : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({ 
        where, 
        skip, 
        take: limit, 
        orderBy: { name: 'asc' },
        include: { category: { select: { name: true } } }
      }),
      prisma.product.count({ where })
    ]);

    return sendSuccess('Products retrieved', { products, meta: { page, limit, total } });
  } catch (error: any) {
    return sendError('Failed to fetch products', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, sku, barcode, categoryId, price, reorderLevel } = body;
    
    const product = await prisma.product.create({
      data: { 
        name, 
        sku: sku || `SKU-${Date.now()}`, 
        barcode, 
        categoryId, 
        price: price || 0, 
        reorderLevel: reorderLevel || 0 
      }
    });

    return sendSuccess('Product created', { product }, 201);
  } catch (error: any) {
    return sendError('Failed to create product', error);
  }
}
