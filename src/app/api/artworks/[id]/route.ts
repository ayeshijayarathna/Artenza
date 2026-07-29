import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Artwork from '@/models/Artwork';
import { handleError, NotFoundError, requireAdmin } from '@/lib/api';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;

    const artwork = await Artwork.findById(id).lean();
    if (!artwork) throw new NotFoundError('Artwork');

    return NextResponse.json(artwork);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    await dbConnect();

    const { id } = await params;
    const body = await req.json();

    const artwork = await Artwork.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!artwork) throw new NotFoundError('Artwork');

    return NextResponse.json(artwork);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    await dbConnect();

    const { id } = await params;
    const artwork = await Artwork.findByIdAndDelete(id).lean();
    if (!artwork) throw new NotFoundError('Artwork');

    return NextResponse.json({ message: 'Artwork deleted successfully' });
  } catch (error) {
    return handleError(error);
  }
}
