import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  brand?: string;
  model?: string;
  variant?: string;
  description?: string;
  imageUrl?: string;
  specifications?: any;
  prices: {
    store: mongoose.Types.ObjectId;
    price: number;
    currency: string;
    url: string;
    inStock: boolean;
    delivery?: string;
    rating?: number;
    offers?: string;
    updatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String },
    model: { type: String },
    variant: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    specifications: { type: Schema.Types.Mixed },
    prices: [
      {
        store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
        price: { type: Number, required: true },
        currency: { type: String, default: 'INR' },
        url: { type: String, required: true },
        inStock: { type: Boolean, default: true },
        delivery: { type: String },
        rating: { type: Number },
        offers: { type: String },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);
