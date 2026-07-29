import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Notification from '@/models/Notification';
import { handleError, NotFoundError, getSession } from '@/lib/api';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const session = await getSession();
    const user = session?.user as any;
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { id } = await params;
    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: user.id },
      { read: true },
      { new: true }
    ).lean();

    if (!notification) throw new NotFoundError('Notification');

    return NextResponse.json(notification);
  } catch (error) {
    return handleError(error);
  }
}
