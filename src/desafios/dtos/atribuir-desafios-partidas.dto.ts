import { IsNotEmpty } from "class-validator";
import { Resultado } from "../interfaces/desafio.interface";
import { ApiProperty } from "@nestjs/swagger";
export class AtribuirDesafiosPartidasDto {
  /**
   * O identificador do jogador que defendeu a partida e ganhou.
   * @example "uuid"
   * @example "d7cfc09f-24e4-4c3d-a221-f9d08d11a029"
   */
  @IsNotEmpty()
  def: string;

  /**
   * O Resultado é o resultado da partida
   * Deve ser uma matriz de objetos do tipo Resultado.
   */
  @IsNotEmpty()
  @ApiProperty({ type: Array<Resultado> })
  resultado: Array<Resultado>;
}
