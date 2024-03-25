import { Document } from "mongoose";
import { Jogador } from "../../jogadores/interfaces/jogador.interface"
import { Resultado } from "../../desafios/interfaces/desafio.interface"

export interface Partida extends Document {
  def: Jogador;
  resultado: Array<Resultado>;
  jogadores: Array<Jogador>;
}
