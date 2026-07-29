import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomRequest from '@/models/CustomRequest';
import { handleError, requireAuth, getSession } from '@/lib/api';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getSession();
    const user = session?.user as any;
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');

    const filter: Record<string, any> = {};
    if (user.role !== 'admin') filter.user = user.id;
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const [requests, total] = await Promise.all([
      CustomRequest.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('user', 'name email').lean(),
      CustomRequest.countDocuments(filter),
    ]);

    return NextResponse.json({
      requests,
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
    const { title, description, preferredMedium, preferredSize, budget, deadline, referenceImages, cloudinaryIds } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const request = await CustomRequest.create({
      user: userId,
      title,
      description,
      preferredMedium,
      preferredSize,
      budget,
      deadline: deadline ? new Date(deadline) : undefined,
      referenceImages,
      cloudinaryIds,
    });

    const io = global.io;
    if (io) {
      io.to('admin').emit('new-request', request);
    }

    return NextResponse.json(request, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
