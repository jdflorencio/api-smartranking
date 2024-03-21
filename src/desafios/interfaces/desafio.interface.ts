import { Jogador } from '../../jogadores/interfaces/jogador.interface';

export interface Desafio extends Document {
  dataHoraDesafio: Date;
  status: DesafiosStatus;
  dataHoraSolicitacao: Date;
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
  set: string;
}

export enum DesafiosStatus {
  REALIZADO = 'REALIZADO',
  PENDENTE = 'PENDENTE',
  ACEITO = 'ACEITO',
  NEGADO = 'NEGADO',
  CANCELADO = 'CANCELADO',
}
