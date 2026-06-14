import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPriceHistory extends Document {
  product: mongoose.Types.ObjectId;
  store: mongoose.Types.ObjectId;
  price: number;
  date: Date;
}

const PriceHistorySchema = new Schema<IPriceHistory>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const PriceHistory: Model<IPriceHistory> =
  mongoose.models.PriceHistory || mongoose.model('PriceHistory', PriceHistorySchema);
