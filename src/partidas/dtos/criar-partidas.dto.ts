import {
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsString,
} from "class-validator";
import { Jogador } from "../../jogadores/interfaces/jogador.interface";
import { Resultado } from "../../desafios/interfaces/desafio.interface";
export class CriarPartidaDto {
  @IsNotEmpty()
  readonly def: string;

  @IsArray()
  resultado: Array<Resultado>;
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  jogadores: Array<Jogador>;
}
