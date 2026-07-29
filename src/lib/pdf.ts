import PDFDocument from 'pdfkit';

interface InvoiceItem {
  title: string;
  artist: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceData {
  billNumber: string;
  orderNumber: string;
  paidAt: Date;
  items: InvoiceItem[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  billingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export function generateInvoice(data: InvoiceData): PDFKit.PDFDocument {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });

  // Header
  doc.fontSize(28).font('Helvetica-Bold').text('ARTENZA', { align: 'center' });
  doc.fontSize(10).font('Helvetica').fillColor('#666')
    .text('Art Gallery & Custom Commissions', { align: 'center' })
    .moveDown(2);

  // Invoice title
  doc.fontSize(18).font('Helvetica-Bold').fillColor('#000').text('INVOICE', { align: 'center' });
  doc.moveDown(0.5);

  // Divider
  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#ddd').stroke();
  doc.moveDown();

  // Bill info
  const infoY = doc.y;
  doc.fontSize(10).font('Helvetica');
  doc.text(`Bill No:  ${data.billNumber}`, { align: 'left' });
  doc.text(`Order No: ${data.orderNumber}`, { align: 'left' });
  doc.text(`Date:     ${data.paidAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, { align: 'left' });

  // Billing address
  const addr = data.billingAddress;
  const addrLines = [
    'Bill To:',
    addr.name,
    addr.line1,
    addr.line2,
    `${addr.city}, ${addr.state} ${addr.postalCode}`,
    addr.country,
  ].filter(Boolean);

  doc.text(addrLines.join('\n'), { align: 'right' });
  doc.moveDown();

  // Divider
  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#ddd').stroke();
  doc.moveDown();

  // Table header
  const colX = { item: 50, artist: 220, qty: 340, price: 410, total: 490 };

  doc.fontSize(10).font('Helvetica-Bold').fillColor('#333');
  doc.text('Item', colX.item, doc.y, { width: 160 });
  doc.text('Artist', colX.artist, undefined, { width: 110 });
  doc.text('Qty', colX.qty, undefined, { width: 50, align: 'center' });
  doc.text('Price', colX.price, undefined, { width: 70, align: 'right' });
  doc.text('Total', colX.total, undefined, { width: 50, align: 'right' });
  doc.moveDown(0.5);

  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#eee').stroke();
  doc.moveDown(0.5);

  // Table rows
  doc.fontSize(9).font('Helvetica').fillColor('#000');
  data.items.forEach((item) => {
    const y = doc.y;
    doc.text(item.title, colX.item, y, { width: 160 });
    doc.text(item.artist, colX.artist, y, { width: 110 });
    doc.text(item.quantity.toString(), colX.qty, y, { width: 50, align: 'center' });
    doc.text(`$${item.unitPrice.toFixed(2)}`, colX.price, y, { width: 70, align: 'right' });
    doc.text(`$${item.total.toFixed(2)}`, colX.total, y, { width: 50, align: 'right' });
    doc.moveDown();
  });

  doc.moveDown();

  // Totals
  const totalX = 370;
  const totalValX = 490;
  doc.fontSize(10).font('Helvetica');
  doc.text('Subtotal:', totalX, doc.y, { width: 110, align: 'right' });
  doc.text(`$${data.subtotal.toFixed(2)}`, totalValX, doc.y - doc.currentLineHeight(), { width: 50, align: 'right' });

  doc.text('Shipping:', totalX, doc.y, { width: 110, align: 'right' });
  doc.text(`$${data.shippingFee.toFixed(2)}`, totalValX, doc.y - doc.currentLineHeight(), { width: 50, align: 'right' });

  doc.text('Tax:', totalX, doc.y, { width: 110, align: 'right' });
  doc.text(`$${data.tax.toFixed(2)}`, totalValX, doc.y - doc.currentLineHeight(), { width: 50, align: 'right' });

  doc.moveTo(totalX - 10, doc.y).lineTo(545, doc.y).strokeColor('#ddd').stroke();
  doc.moveDown(0.3);

  doc.font('Helvetica-Bold').fontSize(12);
  doc.text('Total:', totalX, doc.y, { width: 110, align: 'right' });
  doc.text(`$${data.total.toFixed(2)}`, totalValX, doc.y - doc.currentLineHeight(), { width: 50, align: 'right' });

  doc.moveDown(3);

  // Footer
  doc.fontSize(8).font('Helvetica').fillColor('#999');
  doc.text('Thank you for your purchase!', { align: 'center' });
  doc.text('Artenza - Art Gallery & Custom Commissions', { align: 'center' });
  doc.text('This is a computer-generated invoice.', { align: 'center' });

  doc.end();
  return doc;
}
