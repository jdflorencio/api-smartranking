import { Document } from 'mongoose';

export interface Jogador extends Document {
  readonly _id: string;
  readonly phoneNumber: string;
  readonly email: string;
  name: string;
  ranking: string;
  posicaoRanking: number;
  urlPhotoJogador: string;
}
