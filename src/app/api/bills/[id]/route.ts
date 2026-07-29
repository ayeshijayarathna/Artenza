import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Bill from '@/models/Bill';
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
    const bill = await Bill.findById(id).populate('order', 'orderNumber status').lean();

    if (!bill) throw new NotFoundError('Bill');

    if (user.role !== 'admin' && bill.user.toString() !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(bill);
  } catch (error) {
    return handleError(error);
  }
}
