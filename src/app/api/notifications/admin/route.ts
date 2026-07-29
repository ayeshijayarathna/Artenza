import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { handleError, requireAdmin } from '@/lib/api';
import { createNotification } from '@/lib/notification';

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    await dbConnect();

    const body = await req.json();
    const { title, message, userId, broadcast } = body;

    if (!title || !message) {
      return NextResponse.json({ error: 'Title and message are required' }, { status: 400 });
    }

    if (broadcast) {
      const users = await User.find({}).select('_id').lean();
      const results = await Promise.allSettled(
        users.map((u) =>
          createNotification({
            userId: u._id.toString(),
            type: 'admin_message',
            title,
            message,
          })
        )
      );

      const io = global.io;
      if (io) {
        io.to('admin').emit('broadcast', { title, message });
        users.forEach((u) => {
          io.to(`user:${u._id}`).emit('notification', { title, message, type: 'admin_message' });
        });
      }

      return NextResponse.json({
        message: `Notification broadcast to ${results.length} users`,
        total: results.length,
      });
    }

    if (!userId) {
      return NextResponse.json({ error: 'userId is required for direct notification' }, { status: 400 });
    }

    const notification = await createNotification({
      userId,
      type: 'admin_message',
      title,
      message,
    });

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
