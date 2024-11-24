import * as mongoose from 'mongoose';
export const playersSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    name: String,
    ranking: String,
    rankingPosition: Number,
    urlPlayerPhoto: String,
  },
  { timestamps: true, collection: 'players' },
);
