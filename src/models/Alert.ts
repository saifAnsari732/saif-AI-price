import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAlert extends Document {
  userId: string; // From NextAuth User
  product: mongoose.Types.ObjectId;
  targetPrice: number;
  isActive: boolean;
  createdAt: Date;
}

const AlertSchema = new Schema<IAlert>({
  userId: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  targetPrice: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const Alert: Model<IAlert> =
  mongoose.models.Alert || mongoose.model('Alert', AlertSchema);
