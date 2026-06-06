import mongoose, { Document, Schema } from 'mongoose';

export type RequestStatus =
  | 'pending'
  | 'reviewed'
  | 'quoted'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'rejected'
  | 'cancelled';

export interface IReply {
  _id?: mongoose.Types.ObjectId;
  sender: 'user' | 'admin';
  message: string;
  attachments?: string[];
  readByUser?: boolean;
  readByAdmin?: boolean;
  createdAt: Date;
}

export interface ICustomRequest extends Document {
  requestNumber: string;
  user: mongoose.Types.ObjectId;
  title: string;
  description: string;
  referenceImages: string[];
  cloudinaryIds: string[];
  preferredMedium?: string;
  preferredSize?: string;
  budget?: number;
  deadline?: Date;
  status: RequestStatus;
  quotedPrice?: number;
  replies: IReply[];
  adminNotes?: string;
  linkedOrderId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ReplySchema = new Schema<IReply>({
  sender: { type: String, enum: ['user', 'admin'], required: true },
  message: { type: String, required: true, maxlength: 2000 },
  attachments: [{ type: String }],
  readByUser: { type: Boolean, default: false },
  readByAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const CustomRequestSchema = new Schema<ICustomRequest>(
  {
    requestNumber: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Request title is required'],
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: 3000,
    },
    referenceImages: [{ type: String }],
    cloudinaryIds: [{ type: String }],
    preferredMedium: { type: String },
    preferredSize: { type: String },
    budget: { type: Number, min: 0 },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'quoted', 'accepted', 'in_progress', 'completed', 'rejected', 'cancelled'],
      default: 'pending',
    },
    quotedPrice: { type: Number, min: 0 },
    replies: [ReplySchema],
    adminNotes: { type: String },
    linkedOrderId: { type: Schema.Types.ObjectId, ref: 'Order' },
  },
  { timestamps: true }
);

CustomRequestSchema.pre('validate', async function () {
  if (!this.requestNumber) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('CustomRequest').countDocuments();
    this.requestNumber = `REQ-${year}-${String(count + 1).padStart(5, '0')}`;
  }
});

CustomRequestSchema.index({ user: 1, createdAt: -1 });
CustomRequestSchema.index({ status: 1 });

export default mongoose.models.CustomRequest ||
  mongoose.model<ICustomRequest>('CustomRequest', CustomRequestSchema);