import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSuccess, sendError } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return sendSuccess('Projects retrieved', { projects });
  } catch (error: any) {
    return sendError('Failed to fetch projects', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, budget, startDate, endDate } = body;
    
    const project = await prisma.project.create({
      data: {
        name,
        budget,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
      }
    });
    
    return sendSuccess('Project created', { project }, 201);
  } catch (error: any) {
    return sendError('Failed to create project', error);
  }
}
