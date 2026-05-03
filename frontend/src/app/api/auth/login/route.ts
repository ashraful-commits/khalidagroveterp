import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { encrypt } from '@/lib/auth';
import { sendSuccess, sendError } from '@/lib/apiResponse';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return sendError('Invalid credentials', null, 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError('Invalid credentials', null, 401);
    }

    // Create session
    const expires = new Date(Date.now() + 60 * 60 * 2 * 1000);
    const session = await encrypt({ 
      user: { id: user.id, name: user.name, email: user.email, role: user.role }, 
      expires 
    });

    // Set cookie
    (await cookies()).set('session', session, { 
      expires, 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    return sendSuccess('Login successful', { 
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      accessToken: session
    });
  } catch (error: any) {
    return sendError('Login failed', error);
  }
}
