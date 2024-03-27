import { Jogador } from "../../jogadores/interfaces/jogador.interface";
import { DesafiosStatus } from "./desafio-status.enum";
import { Document } from "mongoose";
export interface Desafio extends Document {
  status: DesafiosStatus;
  dataHoraDesafio: Date; 
  dataHoraSolicitacao: Date;
  dataHoraResposta: Date;
  solicitante: Jogador;
  categoria: string;
  jogadores: Array<Jogador>;
  partida: Partida;
}

export interface Partida extends Document {
  categoria: string;
  jogadores: Array<Jogador>;
  def: Jogador;
  resultado: Array<Resultado>;
}

export interface Resultado {
  /**
   * Set o resultado 
   * @exemple "6-1"
   */
  set: string;
}
