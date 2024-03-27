import { IsNotEmpty } from "class-validator";
import { Resultado } from "../interfaces/desafio.interface";
export class AtribuirDesafiosPartidasDto {
  @IsNotEmpty()
  def: string;
  @IsNotEmpty()
  resultado: Array<Resultado>;
}
