import { IsNotEmpty } from "class-validator";
import { Jogador } from "../../jogadores/interfaces/jogador.interface";
import { Resultado } from "../interfaces/desafio.interface";
export class AtribuirDesafiosPartidasDto {
  @IsNotEmpty()
  def: Jogador;
  @IsNotEmpty()
  resultado: Array<Resultado>;
}
