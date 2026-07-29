import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Artwork from '@/models/Artwork';
import stripe from '@/lib/stripe';
import { handleError, requireAuth } from '@/lib/api';

export async function POST(req: NextRequest) {
  try {
    const userId = await requireAuth();
    await dbConnect();

    const body = await req.json();
    const { artworkIds, shippingAddress } = body;

    if (!artworkIds?.length) {
      return NextResponse.json({ error: 'No artworks selected' }, { status: 400 });
    }

    const artworks = await Artwork.find({ _id: { $in: artworkIds }, status: 'available' });

    if (artworks.length !== artworkIds.length) {
      return NextResponse.json({ error: 'Some artworks are unavailable' }, { status: 400 });
    }

    const items = artworks.map((a) => ({
      artwork: a._id,
      title: a.title,
      artist: a.artist,
      price: a.price,
      image: a.images[0] || '',
      type: a.type,
    }));

    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: artworks.map((a) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: a.title,
            description: `By ${a.artist}`,
            images: a.images,
          },
          unit_amount: Math.round(a.price * 100),
        },
        quantity: 1,
      })),
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders/${order._id}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/gallery?cancelled=true`,
    });

    await Order.findByIdAndUpdate(order._id, {
      stripeSessionId: session.id,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    return handleError(error);
  }
}
