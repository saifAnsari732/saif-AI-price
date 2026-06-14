import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStore extends Document {
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
}

const StoreSchema = new Schema<IStore>({
  name: { type: String, required: true, unique: true },
  logoUrl: { type: String },
  websiteUrl: { type: String },
});

export const Store: Model<IStore> =
  mongoose.models.Store || mongoose.model('Store', StoreSchema);
