import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomRequest from '@/models/CustomRequest';
import { handleError, NotFoundError, requireAdmin } from '@/lib/api';
import { createNotification } from '@/lib/notification';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    await dbConnect();

    const { id } = await params;
    const body = await req.json();
    const { status, quotedPrice } = body;

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const updateData: Record<string, any> = { status };
    if (quotedPrice !== undefined) updateData.quotedPrice = quotedPrice;

    const request = await CustomRequest.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!request) throw new NotFoundError('Custom request');

    const notificationType = status === 'quoted' ? 'custom_request_quoted' : 'custom_request_status_update';
    const title = status === 'quoted' ? 'Price quote available' : 'Request status updated';
    const message =
      status === 'quoted'
        ? `Admin has quoted $${quotedPrice} for "${request.title}"`
        : `Your request "${request.title}" is now ${status.replace('_', ' ')}`;

    await createNotification({
      userId: request.user.toString(),
      type: notificationType,
      title,
      message,
      link: `/dashboard/requests/${id}`,
      metadata: { requestId: id, status },
    });

    return NextResponse.json(request);
  } catch (error) {
    return handleError(error);
  }
}
