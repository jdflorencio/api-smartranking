import { Jogador } from "../../jogadores/interfaces/jogador.interface";
import { Resultado } from "../interfaces/desafio.interface";
export class AtribuirDesafiosPartidasDto {
  def: Jogador;
  resultado: Array<Resultado>;
}
