import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomRequest from '@/models/CustomRequest';
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
    const request = await CustomRequest.findById(id).populate('user', 'name email').lean();

    if (!request) throw new NotFoundError('Custom request');

    if (user.role !== 'admin' && request.user.toString() !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(request);
  } catch (error) {
    return handleError(error);
  }
}
