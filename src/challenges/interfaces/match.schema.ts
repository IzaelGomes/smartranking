import * as mongoose from 'mongoose';

export const MatchSchema = new mongoose.Schema(
  {
    category: { type: String },
    players: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Player',
      },
    ],
    def: {
      type: mongoose.Schema.ObjectId,
      ref: 'Player',
    },
    result: [
      {
        type: {
          set: String,
        },
      },
    ],
  },
  { timestamps: true, collection: 'Match' },
);
