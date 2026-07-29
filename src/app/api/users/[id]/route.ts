import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { handleError, NotFoundError, getSession } from '@/lib/api';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const session = await getSession();
    const user = session?.user as any;
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { id } = await params;

    if (user.role !== 'admin' && user.id !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const profile = await User.findById(id).select('-password').lean();
    if (!profile) throw new NotFoundError('User');

    return NextResponse.json(profile);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const session = await getSession();
    const user = session?.user as any;
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { id } = await params;

    if (user.role !== 'admin' && user.id !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const allowedFields: Record<string, any> = {};

    const updatableFields = ['name', 'phone', 'image', 'address'];
    for (const field of updatableFields) {
      if (body[field] !== undefined) allowedFields[field] = body[field];
    }

    const profile = await User.findByIdAndUpdate(id, allowedFields, {
      new: true,
      runValidators: true,
    })
      .select('-password')
      .lean();

    if (!profile) throw new NotFoundError('User');

    return NextResponse.json(profile);
  } catch (error) {
    return handleError(error);
  }
}
