import {
  IsNotEmpty,
  IsDateString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsString,
} from "class-validator";
import { Jogador } from "../../jogadores/interfaces/jogador.interface";
import { DesafiosStatus } from "../interfaces/desafio-status.enum";
export class AtualizarDesafioDto {
  @IsNotEmpty()
  @IsDateString()
  dataHoraDesafio: Date;

  @IsString()
  status: DesafiosStatus;
}
