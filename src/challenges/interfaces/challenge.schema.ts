import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.ObjectId,
      ref: 'Player',
    },
    challengeDate: { type: Date },
    requestDate: { type: Date },
    category: { type: String },
    replyDate: { type: Date },
    status: { type: String },
    players: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Player',
      },
    ],
    match: {
      type: mongoose.Schema.ObjectId,
      ref: 'Match',
    },
  },
  { timestamps: true, collection: 'Challenge' },
);
