import dbConnect from '@/lib/mongodb';
import Notification, { NotificationType } from '@/models/Notification';

interface NotifyParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  metadata?: Record<string, any>;
}

export async function createNotification(params: NotifyParams) {
  await dbConnect();

  const notification = await Notification.create({
    user: params.userId,
    type: params.type,
    title: params.title,
    message: params.message,
    link: params.link,
    metadata: params.metadata,
  });

  try {
    const io = global.io;
    if (io) {
      io.to(`user:${params.userId}`).emit('notification', notification);
    }
  } catch {
    // Socket.io not available — notification saved in DB, will be fetched on next poll
  }

  return notification;
}
