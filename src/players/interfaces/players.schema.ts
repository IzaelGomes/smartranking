import * as mongoose from 'mongoose';
export const PlayersSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String },
    email: { type: String, unique: true },
    name: String,
    ranking: String,
    rankingPosition: Number,
    urlPlayerPhoto: String,
  },
  { timestamps: true, collection: 'players' },
);
