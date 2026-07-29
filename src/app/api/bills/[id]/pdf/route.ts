import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Bill from '@/models/Bill';
import { generateInvoice } from '@/lib/pdf';
import { handleError, NotFoundError, getSession } from '@/lib/api';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const session = await getSession();
    const user = session?.user as any;
    if (!user) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { id } = await params;
    const bill = await Bill.findById(id).populate('order', 'orderNumber').lean();
    if (!bill) throw new NotFoundError('Bill');

    if (user.role !== 'admin' && bill.user.toString() !== user.id) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await Bill.findByIdAndUpdate(id, { $inc: { downloadCount: 1 } });

    const doc = generateInvoice({
      billNumber: bill.billNumber,
      orderNumber: (bill.order as any)?.orderNumber || 'N/A',
      paidAt: bill.paidAt,
      items: bill.items.map((item: { title: string; artist: string; quantity: number; unitPrice: number; total: number }) => ({
        title: item.title,
        artist: item.artist,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total,
      })),
      subtotal: bill.subtotal,
      shippingFee: bill.shippingFee,
      tax: bill.tax,
      total: bill.total,
      billingAddress: bill.billingAddress,
    });

    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));

    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);
    });

    return new Response(pdfBuffer as unknown as Blob, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${bill.billNumber}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
