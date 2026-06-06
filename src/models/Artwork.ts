import mongoose, { Document, Schema } from 'mongoose';

export interface IArtwork extends Document {
  title: string;
  description: string;
  artist: string;
  price: number;
  images: string[];          // Cloudinary URLs
  cloudinaryIds: string[];   // For deletion
  category: string;
  medium: string;
  dimensions: { width: number; height: number; unit: 'cm' | 'inch' };
  type: 'original' | 'print' | 'digital' | 'commission-only';
  status: 'available' | 'sold' | 'reserved' | 'hidden';
  tags: string[];
  featured: boolean;
  gallery3dPosition?: { x: number; y: number; z: number; room: string };
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const ArtworkSchema = new Schema<IArtwork>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    artist: {
      type: String,
      required: [true, 'Artist name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    images: [{ type: String, required: true }],
    cloudinaryIds: [{ type: String }],
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['painting', 'sculpture', 'photography', 'digital', 'drawing', 'mixed-media', 'other'],
    },
    medium: { type: String, trim: true }, // e.g. "Oil on canvas"
    dimensions: {
      width: Number,
      height: Number,
      unit: { type: String, enum: ['cm', 'inch'], default: 'cm' },
    },
    type: {
      type: String,
      enum: ['original', 'print', 'digital', 'commission-only'],
      default: 'original',
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'reserved', 'hidden'],
      default: 'available',
    },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
    gallery3dPosition: {
      x: Number,
      y: Number,
      z: Number,
      room: String,
    },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ArtworkSchema.index({ title: 'text', description: 'text', artist: 'text', tags: 'text' });
ArtworkSchema.index({ status: 1, category: 1 });
ArtworkSchema.index({ featured: 1 });

export default mongoose.models.Artwork || mongoose.model<IArtwork>('Artwork', ArtworkSchema);