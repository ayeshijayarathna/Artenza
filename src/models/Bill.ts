import mongoose, { Document, Schema } from 'mongoose';

export interface IBill extends Document {
  billNumber: string;
  order: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  items: {
    title: string;
    artist: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  currency: string;
  paidAt: Date;
  pdfUrl?: string;          // Cloudinary PDF URL (if stored)
  pdfCloudinaryId?: string;
  downloadCount: number;
  billingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  stripePaymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BillSchema = new Schema<IBill>(
  {
    billNumber: {
      type: String,
      unique: true,
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        title: { type: String, required: true },
        artist: { type: String, required: true },
        quantity: { type: Number, default: 1 },
        unitPrice: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    currency: { type: String, default: 'usd' },
    paidAt: { type: Date, required: true },
    pdfUrl: { type: String },
    pdfCloudinaryId: { type: String },
    downloadCount: { type: Number, default: 0 },
    billingAddress: {
      name: { type: String, required: true },
      line1: { type: String, required: true },
      line2: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    stripePaymentIntentId: { type: String },
  },
  { timestamps: true }
);

// Auto-generate bill number: BILL-2025-XXXXX
BillSchema.pre('validate', async function () {
  if (!this.billNumber) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('Bill').countDocuments();
    this.billNumber = `BILL-${year}-${String(count + 1).padStart(5, '0')}`;
  }
});

BillSchema.index({ user: 1, createdAt: -1 });
BillSchema.index({ order: 1 });

export default mongoose.models.Bill || mongoose.model<IBill>('Bill', BillSchema);