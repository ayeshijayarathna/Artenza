import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomRequest from '@/models/CustomRequest';
import { handleError, NotFoundError, getSession } from '@/lib/api';
import { createNotification } from '@/lib/notification';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const session = await getSession();
    const user = session?.user as any;
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const request = await CustomRequest.findById(id);
    if (!request) throw new NotFoundError('Custom request');

    const isAdmin = user.role === 'admin';
    const isOwner = request.user.toString() === user.id;

    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const sender = isAdmin ? 'admin' : 'user';

    request.replies.push({
      sender,
      message,
      readByUser: sender === 'user',
      readByAdmin: sender === 'admin',
      createdAt: new Date(),
    });

    await request.save();

    if (isAdmin) {
      await createNotification({
        userId: request.user.toString(),
        type: 'custom_request_replied',
        title: 'New reply on your request',
        message: `Admin replied to "${request.title}"`,
        link: `/dashboard/requests/${id}`,
        metadata: { requestId: id },
      });
    }

    return NextResponse.json(request);
  } catch (error) {
    return handleError(error);
  }
}
