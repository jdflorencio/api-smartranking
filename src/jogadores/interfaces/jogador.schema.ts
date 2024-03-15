import { Schema } from 'mongoose';

export const JogadorSchema = new Schema(
  {
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    name: String,
    ranking: String,
    posicaoRanking: Number,
    urlPhotoJogador: String,
  },
  { timestamps: true, collection: 'jogadores' },
);
