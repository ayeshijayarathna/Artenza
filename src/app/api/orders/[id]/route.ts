import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
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
    const order = await Order.findById(id).populate('user', 'name email').lean();

    if (!order) throw new NotFoundError('Order');

    if (user.role !== 'admin' && order.user.toString() !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(order);
  } catch (error) {
    return handleError(error);
  }
}
