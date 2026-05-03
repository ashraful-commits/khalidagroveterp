import { NextResponse } from 'next/server';

export const sendSuccess = (message: string, data: any = null, status: number = 200) => {
  return NextResponse.json({
    success: true,
    message,
    data,
  }, { status });
};

export const sendError = (message: string, error: any = null, status: number = 500) => {
  console.error(`[API ERROR] ${message}:`, error);
  return NextResponse.json({
    success: false,
    message,
    error: typeof error === 'string' ? error : error?.message || 'Something went wrong',
  }, { status });
};
