import mongoose, { Document, Schema } from 'mongoose';

export type OrderStatus =
  | 'pending_payment'
  | 'payment_confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface IOrderItem {
  artwork: mongoose.Types.ObjectId;
  title: string;
  artist: string;
  price: number;
  image: string;
  type: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  stripePaymentIntentId?: string;
  stripeSessionId?: string;
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  trackingNumber?: string;
  courierName?: string;
  estimatedDelivery?: Date;
  deliveredAt?: Date;
  notes?: string;
  billGenerated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  artwork: { type: Schema.Types.ObjectId, ref: 'Artwork', required: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    currency: { type: String, default: 'usd' },
    status: {
      type: String,
      enum: ['pending_payment', 'payment_confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
      default: 'pending_payment',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    stripePaymentIntentId: { type: String },
    stripeSessionId: { type: String },
    shippingAddress: {
      name: { type: String, required: true },
      line1: { type: String, required: true },
      line2: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: String,
    },
    trackingNumber: { type: String },
    courierName: { type: String },
    estimatedDelivery: { type: Date },
    deliveredAt: { type: Date },
    notes: { type: String },
    billGenerated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-generate order number: ART-2025-XXXXX
OrderSchema.pre('validate', async function () {
  if (!this.orderNumber) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ART-${year}-${String(count + 1).padStart(5, '0')}`;
  }
});

OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ stripeSessionId: 1 });
OrderSchema.index({ orderNumber: 1 });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);