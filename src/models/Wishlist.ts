import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWishlist extends Document {
  userId: string; // From NextAuth User
  product: mongoose.Types.ObjectId;
  createdAt: Date;
}

const WishlistSchema = new Schema<IWishlist>({
  userId: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Ensure a user can't wishlist the same product twice
WishlistSchema.index({ userId: 1, product: 1 }, { unique: true });

export const Wishlist: Model<IWishlist> =
  mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);
