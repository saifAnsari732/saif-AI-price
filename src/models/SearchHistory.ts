import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISearchHistory extends Document {
  userId?: string; // Optional, for logged-in users
  query: string;
  type: string; // "text", "image", "url"
  createdAt: Date;
}

const SearchHistorySchema = new Schema<ISearchHistory>({
  userId: { type: String },
  query: { type: String, required: true },
  type: { type: String, enum: ['text', 'image', 'url'], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const SearchHistory: Model<ISearchHistory> =
  mongoose.models.SearchHistory || mongoose.model('SearchHistory', SearchHistorySchema);
