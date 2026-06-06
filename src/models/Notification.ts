import mongoose, { Document, Schema } from 'mongoose';

export type NotificationType =
  | 'order_placed'
  | 'order_confirmed'
  | 'order_shipped'
  | 'order_delivered'
  | 'payment_success'
  | 'payment_failed'
  | 'bill_ready'
  | 'custom_request_received'
  | 'custom_request_replied'
  | 'custom_request_quoted'
  | 'custom_request_status_update'
  | 'new_artwork'
  | 'admin_message'
  | 'system';

export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  link?: string;            // e.g. /dashboard/orders/ART-2025-00001
  metadata?: {
    orderId?: string;
    billId?: string;
    requestId?: string;
    artworkId?: string;
    [key: string]: any;
  };
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        'order_placed', 'order_confirmed', 'order_shipped', 'order_delivered',
        'payment_success', 'payment_failed', 'bill_ready',
        'custom_request_received', 'custom_request_replied',
        'custom_request_quoted', 'custom_request_status_update',
        'new_artwork', 'admin_message', 'system',
      ],
    },
    title: { type: String, required: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 500 },
    read: { type: Boolean, default: false },
    link: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

NotificationSchema.index({ user: 1, read: 1, createdAt: -1 });

export default mongoose.models.Notification ||
  mongoose.model<INotification>('Notification', NotificationSchema);