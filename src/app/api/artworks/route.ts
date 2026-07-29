import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Artwork from '@/models/Artwork';
import { handleError, requireAdmin, getSession } from '@/lib/api';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sort = searchParams.get('sort') || '-createdAt';

    const filter: Record<string, any> = {};

    const session = await getSession();
    const isAdmin = (session?.user as any)?.role === 'admin';

    if (!isAdmin) {
      filter.status = 'available';
    } else if (status) {
      filter.status = status;
    }

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (featured === 'true') filter.featured = true;
    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const [artworks, total] = await Promise.all([
      Artwork.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      Artwork.countDocuments(filter),
    ]);

    return NextResponse.json({
      artworks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    await dbConnect();

    const body = await req.json();
    const artwork = await Artwork.create(body);

    return NextResponse.json(artwork, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
