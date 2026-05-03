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

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({ 
        where, 
        skip, 
        take: limit, 
        orderBy: { createdAt: 'desc' },
        include: { department: { select: { name: true } } }
      }),
      prisma.employee.count({ where })
    ]);

    return sendSuccess('Employees retrieved', { employees, meta: { page, limit, total } });
  } catch (error: any) {
    return sendError('Failed to fetch employees', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, departmentId, joinDate, basicSalary } = body;
    const empId = `EMP-${Date.now()}`;
    
    const employee = await prisma.employee.create({
      data: { 
        empId, 
        name, 
        departmentId, 
        joinDate: joinDate ? new Date(joinDate) : new Date(), 
        basicSalary: basicSalary || 0 
      }
    });

    return sendSuccess('Employee created', { employee }, 201);
  } catch (error: any) {
    return sendError('Failed to create employee', error);
  }
}
