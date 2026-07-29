import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { SessionUser } from '@/types/global';

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session as { user: SessionUser } | null;
}

export async function requireAuth(): Promise<string> {
  const session = await getSession();
  const userId = session?.user?.id;
  if (!userId) throw new UnauthorizedError();
  return userId;
}

export async function requireAdmin(): Promise<string> {
  const session = await getSession();
  if (!session?.user?.id || session.user.role !== 'admin') throw new ForbiddenError();
  return session.user.id;
}

export class AppError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Admin access required') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  if ((error as any)?.code === 11000) {
    const field = Object.keys((error as any).keyPattern)[0];
    return NextResponse.json(
      { error: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` },
      { status: 409 }
    );
  }

  if ((error as any)?.name === 'ValidationError') {
    const messages = Object.values((error as any).errors).map((e: any) => e.message);
    return NextResponse.json({ error: messages.join(', ') }, { status: 400 });
  }

  console.error('[API Error]', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
