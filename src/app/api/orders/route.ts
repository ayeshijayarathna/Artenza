import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { handleError, requireAuth, requireAdmin, getSession } from '@/lib/api';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getSession();
    const user = session?.user as any;
    const isAdmin = user?.role === 'admin';

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');

    const filter: Record<string, any> = {};

    if (!isAdmin) {
      filter.user = user.id;
    }

    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('user', 'name email').lean(),
      Order.countDocuments(filter),
    ]);

    return NextResponse.json({
      orders,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await requireAuth();
    await dbConnect();

    const body = await req.json();
    const { items, shippingAddress } = body;

    if (!items?.length) {
      return NextResponse.json({ error: 'Order must contain at least one item' }, { status: 400 });
    }

    if (!shippingAddress) {
      return NextResponse.json({ error: 'Shipping address is required' }, { status: 400 });
    }

    const subtotal = items.reduce((sum: number, item: any) => sum + item.price, 0);
    const shippingFee = subtotal >= 100 ? 0 : 10;
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const total = subtotal + shippingFee + tax;

    const order = await Order.create({
      user: userId,
      items,
      subtotal,
      shippingFee,
      tax,
      total,
      shippingAddress,
      status: 'pending_payment',
      paymentStatus: 'pending',
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
