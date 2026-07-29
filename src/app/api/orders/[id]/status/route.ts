import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { handleError, NotFoundError, requireAdmin } from '@/lib/api';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    await dbConnect();

    const { id } = await params;
    const body = await req.json();
    const { status, trackingNumber, courierName } = body;

    const updateData: Record<string, any> = { status };
    if (trackingNumber) updateData.trackingNumber = trackingNumber;
    if (courierName) updateData.courierName = courierName;
    if (status === 'delivered') updateData.deliveredAt = new Date();

    const order = await Order.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).lean();
    if (!order) throw new NotFoundError('Order');

    return NextResponse.json(order);
  } catch (error) {
    return handleError(error);
  }
}
