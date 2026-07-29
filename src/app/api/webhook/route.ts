import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Bill from '@/models/Bill';
import stripe from '@/lib/stripe';
import { createNotification } from '@/lib/notification';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') || '';

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await dbConnect();

        const order = await Order.findByIdAndUpdate(
          orderId,
          {
            status: 'payment_confirmed',
            paymentStatus: 'paid',
            stripePaymentIntentId: session.payment_intent,
          },
          { new: true }
        );

        if (order) {
          const totalInDollars = session.amount_total ? session.amount_total / 100 : order.total;

          const bill = await Bill.create({
            order: order._id,
            user: order.user,
            items: order.items.map((item: { title: string; artist: string; price: number }) => ({
              title: item.title,
              artist: item.artist,
              quantity: 1,
              unitPrice: item.price,
              total: item.price,
            })),
            subtotal: order.subtotal,
            shippingFee: order.shippingFee,
            tax: order.tax,
            total: totalInDollars,
            currency: order.currency,
            paidAt: new Date(),
            billingAddress: order.shippingAddress,
            stripePaymentIntentId: session.payment_intent,
          });

          await Order.findByIdAndUpdate(orderId, { billGenerated: true });

          await createNotification({
            userId: order.user.toString(),
            type: 'payment_success',
            title: 'Payment successful',
            message: `Your payment of $${totalInDollars.toFixed(2)} for order ${order.orderNumber} was successful.`,
            link: `/dashboard/orders/${orderId}`,
            metadata: { orderId, billId: bill._id.toString() },
          });

          await createNotification({
            userId: order.user.toString(),
            type: 'bill_ready',
            title: 'Invoice ready',
            message: `Invoice ${bill.billNumber} is ready for download.`,
            link: `/dashboard/bills/${bill._id}`,
            metadata: { orderId, billId: bill._id.toString() },
          });
        }
      }
    }

    if (event.type === 'checkout.session.expired') {
      const session = event.data.object as any;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await dbConnect();
        await Order.findByIdAndUpdate(orderId, { status: 'cancelled', paymentStatus: 'failed' });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Webhook Error]', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}


